"use client"

import * as React from "react"
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Event {
    id: string
    title: string
    date: Date
    type: "meeting" | "task" | "deadline"
}

const demoEvents: Event[] = [
    { id: "1", title: "Project Kickoff", date: new Date(), type: "meeting" },
    { id: "2", title: "Design Review", date: new Date(), type: "task" },
    { id: "3", title: "Client Call", date: new Date(new Date().setDate(new Date().getDate() + 2)), type: "meeting" },
    { id: "4", title: "Final Submission", date: new Date(new Date().setDate(new Date().getDate() + 5)), type: "deadline" },
]

export function CalendarGrid() {
    const [currentMonth, setCurrentMonth] = React.useState(new Date())

    const days = React.useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth))
        const end = endOfWeek(endOfMonth(currentMonth))
        return eachDayOfInterval({ start, end })
    }, [currentMonth])

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
    const goToToday = () => setCurrentMonth(new Date())

    return (
        <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold tracking-tight min-w-[150px]">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="size-8" onClick={prevMonth}>
                            <ChevronLeftIcon className="size-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={goToToday}>
                            Today
                        </Button>
                        <Button variant="outline" size="icon" className="size-8" onClick={nextMonth}>
                            <ChevronRightIcon className="size-4" />
                        </Button>
                    </div>
                </div>
                <Button size="sm" className="h-8 gap-2">
                    <PlusIcon className="size-3.5" />
                    Add Event
                </Button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/10">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr min-h-0">
                {days.map((day, i) => {
                    const dayEvents = demoEvents.filter((event) => isSameDay(event.date, day))
                    const isCurrentMonth = isSameMonth(day, currentMonth)

                    return (
                        <div
                            key={day.toISOString()}
                            className={cn(
                                "relative flex flex-col p-2 border-r border-b border-border last:border-r-0 transition-colors hover:bg-muted/30",
                                !isCurrentMonth && "bg-muted/10 text-muted-foreground/50",
                                i >= 35 && "border-b-0"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className={cn(
                                    "flex items-center justify-center size-6 text-xs font-medium rounded-full",
                                    isToday(day) && "bg-primary text-primary-foreground",
                                    !isToday(day) && isCurrentMonth && "text-foreground/80"
                                )}>
                                    {format(day, "d")}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 overflow-hidden">
                                {dayEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={cn(
                                            "group relative flex items-center gap-1.5 px-1.5 py-1 rounded text-[10px] font-medium leading-none truncate cursor-pointer transition-all",
                                            event.type === "meeting" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                                            event.type === "task" && "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
                                            event.type === "deadline" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
                                            "hover:scale-[1.02] hover:shadow-sm"
                                        )}
                                    >
                                        <div className={cn(
                                            "size-1 rounded-full",
                                            event.type === "meeting" && "bg-blue-500",
                                            event.type === "task" && "bg-orange-500",
                                            event.type === "deadline" && "bg-rose-500"
                                        )} />
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
