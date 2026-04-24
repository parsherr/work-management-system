"use client"

import React, { useState, useMemo } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TaskItem, Task } from "@/components/tasks/task-item"
import { AddTaskForm } from "@/components/tasks/add-task-form"
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog"
import { Badge } from "@/components/ui/badge"
import { HashIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design system update",
    description: "Update the primary color palette and add dark mode support to all core components.",
    completed: false,
    tags: ["design", "ui"],
    dueDate: "2026-04-25",
    createdAt: "2026-04-24",
  },
  {
    id: "2",
    title: "Client meeting",
    description: "Discuss the new roadmap and gather feedback on the initial mockups.",
    completed: true,
    tags: ["meeting", "client"],
    dueDate: "2026-04-24",
    createdAt: "2026-04-23",
  },
  {
    id: "3",
    title: "Backend API Integration",
    description: "Connect the new task management endpoints to the frontend services.",
    completed: false,
    tags: ["engineering"],
    dueDate: "2026-04-26",
    createdAt: "2026-04-24",
  },
]

export default function TasksPage() {
  const id = React.useId()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    tasks.forEach(task => task.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = selectedTag ? task.tags.includes(selectedTag) : true
      return matchesSearch && matchesTag
    })
  }, [tasks, searchQuery, selectedTag])

  const handleAddTask = (newTask: { title: string, description: string, dueDate: string, tags: string[] }) => {
    const task: Task = {
      id: Math.random().toString(36).substring(2, 9),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([task, ...tasks])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsEditDialogOpen(true)
  }

  const handleSaveTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
    setEditingTask(null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const filteredTaskIds = useMemo(() => filteredTasks.map((t) => t.id), [filteredTasks])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col overflow-auto bg-background/50">
          <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8 md:py-10 space-y-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Tasks</h1>
              <p className="text-muted-foreground text-sm">Efficiently manage and organize your daily work.</p>
            </div>

            <AddTaskForm onAdd={handleAddTask} />

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-border/40 pb-6">
                <div className="relative w-full sm:w-72 group">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search tasks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background/40 border-border/40 focus-visible:ring-primary/20 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto no-scrollbar">
                    <SlidersHorizontalIcon className="size-4 text-muted-foreground mr-1 shrink-0" />
                    <Badge 
                        variant={selectedTag === null ? "secondary" : "outline"}
                        className={cn(
                            "cursor-pointer whitespace-nowrap h-7 px-3",
                            selectedTag === null ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary/5 border-border/50"
                        )}
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </Badge>
                    {allTags.map(tag => (
                        <Badge 
                            key={tag}
                            variant={selectedTag === tag ? "secondary" : "outline"}
                            className={cn(
                                "cursor-pointer whitespace-nowrap h-7 px-3 transition-all",
                                selectedTag === tag ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" : "hover:bg-primary/5 border-border/50"
                            )}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                            <HashIcon className="size-2.5 mr-1 opacity-60" />
                            {tag}
                        </Badge>
                    ))}
                </div>
              </div>

              <div className="grid gap-0">
                <DndContext
                  id={id}
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={filteredTaskIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map(task => (
                        <TaskItem 
                          key={task.id} 
                          task={task} 
                          onToggle={handleToggleTask} 
                          onDelete={handleDeleteTask}
                          onEdit={handleEditTask}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 bg-muted/10 border-2 border-dashed border-border/30 rounded-3xl animate-in fade-in zoom-in duration-500">
                        <div className="size-12 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                          <SearchIcon className="size-6 text-muted-foreground/40" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground/60 italic">No tasks found matching your criteria</p>
                      </div>
                    )}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
        </main>
        
        <EditTaskDialog 
            task={editingTask}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSave={handleSaveTask}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
