"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { uploadFile } from "@/lib/actions/upload"
import { toast } from "sonner"
import { UploadIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropZoneProps {
    children: React.ReactNode
    currentPath: string
}

export function FileDropZone({ children, currentPath }: FileDropZoneProps) {
    const router = useRouter()
    const [isDragging, setIsDragging] = React.useState(false)

    const handleUpload = async (files: FileList | File[]) => {
        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("path", currentPath)
            return uploadFile(formData)
        })

        const results = await Promise.all(uploadPromises)
        const successCount = results.filter((r) => r.success).length

        if (successCount > 0) {
            toast.success(`${successCount} file(s) uploaded`)
            router.refresh()
        }

        if (successCount < results.length) {
            toast.error(`${results.length - successCount} upload(s) failed`)
        }
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const onDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleUpload(e.dataTransfer.files)
        }
    }

    const onPaste = async (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items
        const files: File[] = []

        for (let i = 0; i < items.length; i++) {
            if (items[i].kind === 'file') {
                const file = items[i].getAsFile()
                if (file) files.push(file)
            }
        }

        if (files.length > 0) {
            await handleUpload(files)
        }
    }

    return (
        <div
            className="relative flex-1 flex flex-col"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onPaste={onPaste}
        >
            {children}

            {/* Overlay UI */}
            {isDragging && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary/10 backdrop-blur-[2px] border-2 border-dashed border-primary m-4 rounded-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-background size-16 rounded-full flex items-center justify-center shadow-xl border border-primary/20 mb-4 scale-110">
                        <UploadIcon className="size-8 text-primary animate-bounce" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-primary">Drop files to upload</h3>
                    <p className="text-sm text-primary/70 font-medium">to {currentPath || "root"}</p>
                </div>
            )}
        </div>
    )
}
