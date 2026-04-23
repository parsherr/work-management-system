import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FilterIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CalendarPage() {
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
                <main className="flex flex-1 flex-col overflow-hidden bg-background">
                    <div className="flex flex-1 gap-6 p-6 overflow-hidden">
                        {/* Left Sidebar for Filters */}
                        <div className="hidden lg:flex w-64 flex-col gap-6 shrink-0 overflow-y-auto pr-2 scrollbar-thin">
                            <div className="space-y-4">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    <Input placeholder="Search events..." className="pl-9 h-9 text-xs" />
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">My Calendars</h3>
                                    <div className="space-y-2">
                                        {["Team Events", "Personal Tasks", "Deadlines"].map((cal, i) => (
                                            <div key={cal} className="flex items-center gap-2 group cursor-pointer">
                                                <div className={cn(
                                                    "size-3 rounded-sm border",
                                                    i === 0 && "bg-blue-500/20 border-blue-500",
                                                    i === 1 && "bg-orange-500/20 border-orange-500",
                                                    i === 2 && "bg-rose-500/20 border-rose-500"
                                                )} />
                                                <span className="text-sm font-medium transition-colors group-hover:text-primary">{cal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <Card className="bg-primary/5 border-primary/10 shadow-none">
                                        <CardContent className="p-4 space-y-3">
                                            <p className="text-xs text-primary font-medium leading-relaxed">
                                                Tip: Drag events to reschedule them instantly across the calendar.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* Main Calendar View */}
                        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                            <CalendarGrid />
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
