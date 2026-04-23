import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { KanbanBoard } from "@/components/dashboard/board/kanban-board"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { PlusIcon, Settings2Icon, Share2Icon } from "lucide-react"

export default function BoardPage() {
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
                    {/* Sub Header / Toolbox */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                        <div className="space-y-0.5">
                            <h2 className="text-xl font-bold tracking-tight">Pipeline board view</h2>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                Manage your team&apos;s workflow and track progress.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                                <Share2Icon className="size-3.5" />
                                Share
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                                <Settings2Icon className="size-3.5" />
                                Customize
                            </Button>
                            <div className="w-px h-4 bg-border mx-1" />
                            <Button size="sm" className="h-8 gap-2">
                                <PlusIcon className="size-3.5" />
                                Add Column
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-hidden">
                        <KanbanBoard />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
