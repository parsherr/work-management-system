"use client"

import React, { useMemo } from "react"
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard, Task } from "./kanban-card"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon, PlusIcon } from "lucide-react"

export type ColumnId = "todo" | "in-progress" | "completed"

export type Column = {
    id: ColumnId
    title: string
}

interface KanbanColumnProps {
    column: Column
    tasks: Task[]
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

    const { setNodeRef } = useSortable({
        id: column.id,
        data: useMemo(() => ({
            type: "Column",
            column,
        }), [column]),
    })

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col w-full min-w-[300px] h-full max-h-full rounded-2xl bg-muted/30 border border-border/50 p-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 group/header">
                <div className="flex items-center gap-2.5">
                    <div className="size-2 rounded-full bg-primary/40 group-hover/header:bg-primary transition-colors" />
                    <h3 className="font-semibold text-sm tracking-tight">{column.title}</h3>
                    <span className="flex items-center justify-center size-5 rounded-full bg-muted text-[10px] font-bold text-muted-foreground tabular-nums">
                        {tasks.length}
                    </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover/header:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-7">
                        <PlusIcon className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7">
                        <MoreHorizontalIcon className="size-3.5" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto min-h-[200px] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-1">
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} />
                    ))}
                    {tasks.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl py-12 opacity-50">
                            <p className="text-xs text-muted-foreground italic">No tasks here</p>
                        </div>
                    )}
                </SortableContext>
            </div>

            <Button variant="ghost" className="w-full mt-3 justify-start gap-2 h-9 text-muted-foreground hover:text-foreground text-xs font-medium">
                <PlusIcon className="size-3.5" />
                Add Card
            </Button>
        </div>
    )
}
