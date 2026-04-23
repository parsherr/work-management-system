"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRightIcon, HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileBreadcrumbsProps {
    currentPath: string
}

export function FileBreadcrumbs({ currentPath }: FileBreadcrumbsProps) {
    const segments = currentPath.split("/").filter(Boolean)

    return (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link
                href="/files"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors p-1 -m-1 rounded"
            >
                <HomeIcon className="size-4" />
                <span className="font-medium">Files</span>
            </Link>

            {segments.map((segment, index) => {
                const path = segments.slice(0, index + 1).join("/")
                return (
                    <React.Fragment key={path}>
                        <ChevronRightIcon className="size-3.5 opacity-50 shrink-0" />
                        <Link
                            href={`/files/${path}`}
                            className={cn(
                                "hover:text-foreground transition-colors p-1 -m-1 rounded capitalize",
                                index === segments.length - 1 && "text-foreground font-semibold"
                            )}
                        >
                            {segment}
                        </Link>
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
