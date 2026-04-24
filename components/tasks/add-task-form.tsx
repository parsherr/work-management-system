"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PlusIcon, CalendarIcon, TagIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AddTaskFormProps {
  onAdd: (task: {
    title: string
    description: string
    dueDate: string
    tags: string[]
  }) => void
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title,
      description,
      dueDate: dueDate || format(new Date(), "yyyy-MM-dd"),
      tags
    })

    // Reset form
    setTitle("")
    setDescription("")
    setDueDate(format(new Date(), "yyyy-MM-dd"))
    setTags([])
    setIsExpanded(false)
  }

  const addTag = () => {
    const trimmedTag = tagInput.trim().replace(/^#/, "")
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
    }
    setTagInput("")
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  return (
    <Card className={cn(
      "mb-8 border-border/50 transition-all duration-300 shadow-sm",
      isExpanded ? "ring-2 ring-primary/20" : "hover:border-primary/30"
    )}>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="divide-y divide-border/30">
          <div className="p-4">
            <Input
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="border-none shadow-none text-lg font-medium focus-visible:ring-0 px-0 h-auto placeholder:text-muted-foreground/50"
            />
          </div>

          {isExpanded && (
            <>
              <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <Textarea
                  placeholder="Add a description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-none shadow-none resize-none focus-visible:ring-0 px-0 min-h-[80px] text-sm placeholder:text-muted-foreground/50"
                />

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <CalendarIcon className="size-3.5 text-muted-foreground" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="bg-transparent border-none text-xs focus:outline-none text-foreground font-medium"
                    />
                  </div>

                  <div className="flex-1 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <TagIcon className="size-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Add tag (press enter)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      className="bg-transparent border-none text-xs focus:outline-none flex-1 placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-[10px] h-6 pl-2 pr-1 bg-primary/10 text-primary border-primary/20 flex items-center gap-1 group"
                      >
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 bg-muted/20 flex justify-end gap-2 rounded-b-xl">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!title.trim()}
                  className="text-xs px-6"
                >
                  <PlusIcon className="size-3.5 mr-2" />
                  Add Task
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
