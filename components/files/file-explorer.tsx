"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    FileIcon,
    FolderIcon,
    MoreVerticalIcon,
    PencilIcon,
    Trash2Icon,
    DownloadIcon,
    FileTextIcon,
    ImageIcon,
    FileBoxIcon,
    ExternalLinkIcon
} from "lucide-react"
import { format } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"
import { FileItem, deleteItem, moveItem } from "@/lib/actions/files"
import { cn } from "@/lib/utils"
import { FileGrid } from "./file-grid"
import { FilePreviewPanel } from "./file-preview-panel"
import { SelectionLasso } from "./selection-lasso"
import { toast } from "sonner"

interface FileExplorerProps {
    items: FileItem[]
    currentPath: string
    viewMode: "grid" | "list"
    showPreview: boolean
    onTogglePreview: () => void
}

export function FileExplorer({ items, currentPath, viewMode, showPreview, onTogglePreview }: FileExplorerProps) {
    const router = useRouter()
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [selectedPaths, setSelectedPaths] = React.useState<Set<string>>(new Set())
    const [activeItem, setActiveItem] = React.useState<FileItem | null>(null)

    const handleItemDoubleClick = (item: FileItem) => {
        if (item.isDirectory) {
            router.push(`/files/${item.path}`)
        } else {
            window.open(`/api/files/raw?path=${item.path}`, '_blank')
        }
    }

    const handleDelete = async (path: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            const res = await deleteItem(path)
            if (res.success) {
                toast.success("Item deleted")
                router.refresh()
            }
        }
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB", "TB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    }

    const getFileIcon = (item: FileItem, size = "size-4") => {
        if (item.isDirectory) return <FolderIcon className={cn(size, "text-blue-500 fill-blue-500/20")} />
        const ext = item.name.split(".").pop()?.toLowerCase()
        switch (ext) {
            case "txt":
            case "md":
                return <FileTextIcon className={cn(size, "text-muted-foreground")} />
            case "png":
            case "jpg":
            case "jpeg":
            case "svg":
                return <ImageIcon className={cn(size, "text-orange-500")} />
            case "zip":
            case "rar":
                return <FileBoxIcon className={cn(size, "text-purple-500")} />
            default:
                return <FileIcon className={cn(size, "text-muted-foreground")} />
        }
    }

    const handleLassoChange = (rect: { top: number; left: number; width: number; height: number } | null) => {
        if (!rect) return

        const newSelected = new Set<string>()
        const container = containerRef.current
        if (!container) return

        const itemElements = container.querySelectorAll('[data-file-path]')
        itemElements.forEach((el) => {
            const elRect = el.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()

            const relativeElRect = {
                top: elRect.top - containerRect.top + container.scrollTop,
                left: elRect.left - containerRect.left + container.scrollLeft,
                width: elRect.width,
                height: elRect.height,
            }

            const intersects = (
                rect.left < relativeElRect.left + relativeElRect.width &&
                rect.left + rect.width > relativeElRect.left &&
                rect.top < relativeElRect.top + relativeElRect.height &&
                rect.top + rect.height > relativeElRect.top
            )

            if (intersects) {
                const path = (el as HTMLElement).dataset.filePath
                if (path) newSelected.add(path)
            }
        })

        setSelectedPaths(newSelected)
        if (newSelected.size > 0) {
            const firstPath = Array.from(newSelected)[0]
            const firstItem = items.find(i => i.path === firstPath)
            if (firstItem) setActiveItem(firstItem)
        }
    }

    const handleSelect = (item: FileItem, isMulti = false) => {
        if (isMulti) {
            const newSelected = new Set(selectedPaths)
            if (newSelected.has(item.path)) newSelected.delete(item.path)
            else newSelected.add(item.path)
            setSelectedPaths(newSelected)
        } else {
            setSelectedPaths(new Set([item.path]))
        }
        setActiveItem(item)
    }

    // --- Drag and Drop Logic (Native) ---
    const handleDragStart = (e: React.DragEvent, item: FileItem) => {
        e.dataTransfer.setData("application/workos-file", item.path)
        e.dataTransfer.effectAllowed = "move"

        // Create drag ghost
        const ghost = document.createElement('div')
        ghost.className = "bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl border border-white/20"
        ghost.innerText = selectedPaths.size > 1 ? `Moving ${selectedPaths.size} items` : `Moving ${item.name}`
        document.body.appendChild(ghost)
        e.dataTransfer.setDragImage(ghost, 0, 0)
        setTimeout(() => document.body.removeChild(ghost), 0)
    }

    const handleDragOver = (e: React.DragEvent, item: FileItem) => {
        if (item.isDirectory) {
            e.preventDefault()
        }
    }

    const handleDrop = async (e: React.DragEvent, targetItem: FileItem) => {
        e.preventDefault()
        if (!targetItem.isDirectory) return

        const sourcePath = e.dataTransfer.getData("application/workos-file")
        if (!sourcePath || sourcePath === targetItem.path) return

        const itemsToMove = selectedPaths.has(sourcePath)
            ? Array.from(selectedPaths)
            : [sourcePath]

        const movePromises = itemsToMove.map(path => moveItem(path, targetItem.path))
        const results = await Promise.all(movePromises)

        const successCount = results.filter(r => r.success).length
        if (successCount > 0) {
            toast.success(`${successCount} item(s) moved to ${targetItem.name}`)
            router.refresh()
        }
    }

    return (
        <div
            ref={containerRef}
            className="flex flex-1 min-h-0 overflow-hidden relative select-none"
            onClick={() => {
                setSelectedPaths(new Set())
                setActiveItem(null)
            }}
        >
            <SelectionLasso
                containerRef={containerRef}
                onSelectionChange={handleLassoChange}
            />

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scrollbar-thin">
                {viewMode === "list" ? (
                    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow className="hover:bg-transparent border-b border-border">
                                    <TableHead className="w-[400px] text-[10px] font-bold uppercase tracking-wider px-6">Name</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-wider">Size</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-wider">Modified</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-64 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center gap-2">
                                                <FolderIcon className="size-12 opacity-10" />
                                                <p>No files found in this directory.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {items.map((item) => {
                                    const isSelected = selectedPaths.has(item.path)
                                    return (
                                        <ContextMenu key={item.path}>
                                            <ContextMenuTrigger asChild>
                                                <TableRow
                                                    data-file-path={item.path}
                                                    draggable={true}
                                                    onDragStart={(e) => handleDragStart(e, item)}
                                                    onDragOver={(e) => handleDragOver(e, item)}
                                                    onDrop={(e) => handleDrop(e, item)}
                                                    className={cn(
                                                        "group cursor-pointer transition-colors border-b border-border/50 last:border-0",
                                                        isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                                                    )}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleSelect(item, e.shiftKey || e.metaKey || e.ctrlKey)
                                                    }}
                                                    onDoubleClick={(e) => {
                                                        e.stopPropagation()
                                                        handleItemDoubleClick(item)
                                                    }}
                                                >
                                                    <TableCell className="font-medium py-3 px-6">
                                                        <div className="flex items-center gap-3">
                                                            {getFileIcon(item)}
                                                            <span className="truncate text-sm">{item.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-xs font-sans">
                                                        {item.isDirectory ? "--" : formatSize(item.size)}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-xs font-sans">
                                                        {format(new Date(item.updatedAt), "MMM d, yyyy")}
                                                    </TableCell>
                                                    <TableCell onClick={(e) => e.stopPropagation()} className="py-0 px-6">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100">
                                                                    <MoreVerticalIcon className="size-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-40">
                                                                <DropdownMenuItem
                                                                    className="gap-2"
                                                                    onClick={() => handleItemDoubleClick(item)}
                                                                >
                                                                    <ExternalLinkIcon className="size-3.5" />
                                                                    Open
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="gap-2">
                                                                    <PencilIcon className="size-3.5" />
                                                                    Rename
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="gap-2 text-destructive focus:text-destructive"
                                                                    onClick={() => handleDelete(item.path)}
                                                                >
                                                                    <Trash2Icon className="size-3.5" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            </ContextMenuTrigger>
                                            <ContextMenuContent className="w-48">
                                                <ContextMenuItem className="gap-2" onClick={() => handleItemDoubleClick(item)}>
                                                    <ExternalLinkIcon className="size-4" /> Open
                                                </ContextMenuItem>
                                                <ContextMenuItem className="gap-2">
                                                    <PencilIcon className="size-4" /> Rename
                                                </ContextMenuItem>
                                                <ContextMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => handleDelete(item.path)}>
                                                    <Trash2Icon className="size-4" /> Delete
                                                </ContextMenuItem>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <FileGrid
                        items={items}
                        selectedPaths={selectedPaths}
                        onSelect={handleSelect}
                        onNavigate={(p) => router.push(`/files/${p}`)}
                        currentPath={currentPath}
                    />
                )}
            </div>

            {showPreview && activeItem && (
                <FilePreviewPanel
                    item={activeItem}
                    onClose={() => setActiveItem(null)}
                />
            )}
        </div>
    )
}
