"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    FolderIcon,
    ImageIcon,
    FileTextIcon,
    ClockIcon,
    StarIcon,
    LayoutGridIcon,
    ListIcon,
    PanelRightIcon,
    SearchIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileSidebarProps {
    currentPath: string
}

function FileSidebar({ currentPath }: FileSidebarProps) {
    const pathname = usePathname()

    const links = [
        { label: "All Files", path: "/files", icon: FolderIcon },
        { label: "Documents", path: "/files/Documents", icon: FileTextIcon },
        { label: "Images", path: "/files/Images", icon: ImageIcon },
        { label: "Recent", path: "#", icon: ClockIcon },
        { label: "Starred", path: "#", icon: StarIcon },
    ]

    return (
        <div className="w-56 border-r border-border flex flex-col bg-muted/5 shrink-0">
            <div className="p-4 space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-2">
                    Favorites
                </div>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.path
                        return (
                            <Link
                                key={link.label}
                                href={link.path}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className={cn(
                                    "size-4 shrink-0",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )} />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

interface FileLayoutProps {
    children: React.ReactNode
    currentPath: string
    onViewModeChange?: (mode: "grid" | "list") => void
    viewMode?: "grid" | "list"
    onTogglePreview?: () => void
    showPreview?: boolean
}

export function FileLayout({
    children,
    currentPath,
    onViewModeChange,
    viewMode = "list",
    onTogglePreview,
    showPreview
}: FileLayoutProps) {
    return (
        <div className="flex h-full bg-background overflow-hidden">
            <FileSidebar currentPath={currentPath} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Toolbar */}
                <header className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0 bg-background/50 backdrop-blur-md">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-64">
                            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                            <Input
                                placeholder="Search files..."
                                className="pl-8 h-8 text-xs bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="flex items-center bg-muted/40 p-1 rounded-lg mr-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("size-7 ", viewMode === "list" && "bg-background shadow-sm")}
                                onClick={() => onViewModeChange?.("list")}
                            >
                                <ListIcon className="size-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("size-7", viewMode === "grid" && "bg-background shadow-sm")}
                                onClick={() => onViewModeChange?.("grid")}
                            >
                                <LayoutGridIcon className="size-3.5" />
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className={cn("size-8", showPreview && "bg-primary/5 border-primary/20 text-primary")}
                            onClick={onTogglePreview}
                        >
                            <PanelRightIcon className="size-4" />
                        </Button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 flex flex-col min-h-0">
                    {children}
                </div>
            </div>
        </div>
    )
}
