"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"
import { MessageSquareIcon, PaperclipIcon, PencilIcon, Trash2Icon } from "lucide-react"

export type Task = {
    id: string
    content: string
    columnId: string
    priority: "low" | "medium" | "high"
    tags: string[]
    assignee?: {
        name: string
        avatar: string
    }
}

interface KanbanCardProps {
    task: Task
    isOverlay?: boolean
}

export function KanbanCard({ task, isOverlay }: KanbanCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: isOverlay,
    })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    const priorityColors = {
        low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        medium: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        high: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="relative h-[120px] min-h-[120px] rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 opacity-50"
            />
        )
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Card
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className={cn(
                        "group relative cursor-grab active:cursor-grabbing border-border transition-all hover:border-primary/30 hover:shadow-md",
                        isOverlay && "cursor-grabbing border-primary shadow-xl rotate-1 scale-105 z-50"
                    )}
                >
                    <CardContent className="p-4 space-y-3 font-sans">
                        <div className="flex items-start justify-between gap-2">
                            <Badge
                                variant="outline"
                                className={cn("text-[10px] uppercase tracking-wider font-bold h-5 px-1.5", priorityColors[task.priority])}
                            >
                                {task.priority}
                            </Badge>
                        </div>

                        <p className="text-sm font-medium leading-tight text-foreground/90">
                            {task.content}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-[10px] h-4 px-1.5 bg-muted/50 text-muted-foreground font-normal">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MessageSquareIcon className="size-3" />
                                    <span className="text-[10px]">2</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <PaperclipIcon className="size-3" />
                                    <span className="text-[10px]">1</span>
                                </div>
                            </div>
                            {task.assignee && (
                                <Avatar className="size-6 border-2 border-background">
                                    <AvatarImage src={task.assignee.avatar} />
                                    <AvatarFallback className="text-[8px]">{task.assignee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-40">
                <ContextMenuItem className="gap-2">
                    <PencilIcon className="size-3.5" />
                    Edit Task
                </ContextMenuItem>
                <ContextMenuItem variant="destructive" className="gap-2">
                    <Trash2Icon className="size-3.5" />
                    Delete Task
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
