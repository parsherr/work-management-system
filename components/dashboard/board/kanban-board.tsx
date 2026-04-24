"use client"

import React, { useState, useMemo } from "react"
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation,
    closestCorners,
} from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import { KanbanColumn, ColumnId, Column } from "./kanban-column"
import { KanbanCard, Task } from "./kanban-card"

const defaultColumns: Column[] = [
    { id: "todo", title: "To-Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
]

const initialTasks: Task[] = [
    {
        id: "task-1",
        columnId: "todo",
        content: "Ali'yi ara - Proje detaylarını konuş",
        priority: "high",
        tags: ["Müşteri", "Arama"],
    },
    {
        id: "task-2",
        columnId: "todo",
        content: "Yeni dashboard tasarımlarını incele",
        priority: "medium",
        tags: ["Tasarım", "Analiz"],
    },
    {
        id: "task-3",
        columnId: "in-progress",
        content: "Backend API entegrasyonu",
        priority: "high",
        tags: ["Geliştirme", "API"],
    },
    {
        id: "task-4",
        columnId: "completed",
        content: "Logo revizyonu tamamlandı",
        priority: "low",
        tags: ["Tasarım"],
    },
    {
        id: "task-5",
        columnId: "todo",
        content: "Dokümantasyon güncelleme",
        priority: "low",
        tags: ["Yazım"],
    },
    {
        id: "task-6",
        columnId: "in-progress",
        content: "Dnd-kit kütüphanesi entegrasyonu",
        priority: "medium",
        tags: ["Geliştirme"],
    },
]

export function KanbanBoard() {
    const id = React.useId()
    const [columns] = useState<Column[]>(defaultColumns)
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const tasksByColumn = useMemo(() => {
        const groups: Record<string, Task[]> = {}
        columns.forEach((col) => {
            groups[col.id] = tasks.filter((t) => t.columnId === col.id)
        })
        return groups
    }, [tasks, columns])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task)
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveATask = active.data.current?.type === "Task"
        const isOverATask = over.data.current?.type === "Task"

        if (!isActiveATask) return

        // Dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const overIndex = tasks.findIndex((t) => t.id === overId)

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    const newTasks = [...tasks]
                    newTasks[activeIndex] = {
                        ...newTasks[activeIndex],
                        columnId: tasks[overIndex].columnId,
                    }
                    return arrayMove(newTasks, activeIndex, overIndex)
                }

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === "Column"

        // Dropping a Task over a Column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                
                if (tasks[activeIndex].columnId === overId) {
                    return tasks
                }

                const newTasks = [...tasks]
                newTasks[activeIndex] = {
                    ...newTasks[activeIndex],
                    columnId: overId as ColumnId,
                }
                return arrayMove(newTasks, activeIndex, activeIndex)
            })
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveATask = active.data.current?.type === "Task"
        const isOverAColumn = over.data.current?.type === "Column"

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                
                if (tasks[activeIndex].columnId === overId) {
                    return tasks
                }

                const newTasks = [...tasks]
                newTasks[activeIndex] = {
                    ...newTasks[activeIndex],
                    columnId: overId as ColumnId,
                }
                return arrayMove(newTasks, activeIndex, activeIndex)
            })
        }
    }

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.5",
                },
            },
        }),
    }

    return (
        <DndContext
            id={id}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex gap-6 h-full overflow-x-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <SortableContext items={columnsId}>
                    {columns.map((col) => (
                        <KanbanColumn
                            key={col.id}
                            column={col}
                            tasks={tasksByColumn[col.id] || []}
                        />
                    ))}
                </SortableContext>
            </div>

            {typeof document !== "undefined" && createPortal(
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeTask ? <KanbanCard task={activeTask} isOverlay /> : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
}
