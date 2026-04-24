"use client"

import React, { useState } from "react"
import { TeamMember } from "@/app/team/page"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
    PencilIcon, 
    Trash2Icon,
    ChevronDownIcon,
    MailIcon,
    AtSignIcon,
    CalendarIcon,
    BriefcaseIcon,
    PhoneIcon,
    LayoutDashboardIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface TeamTableProps {
    members: TeamMember[]
    onEdit: (member: TeamMember) => void
    onDelete: (id: string) => void
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "active": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
        case "inactive": return "bg-slate-500/10 text-slate-600 border-slate-500/20"
        case "banned": return "bg-rose-500/10 text-rose-600 border-rose-500/20"
        case "pending": return "bg-amber-500/10 text-amber-600 border-amber-500/20"
        case "suspended": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
        default: return "bg-slate-500/10 text-slate-600 border-slate-500/20"
    }
}

export function TeamTable({ members, onEdit, onDelete }: TeamTableProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <div className="rounded-xl border border-border/50 bg-background/50 overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-b border-border/50">
                        <TableHead className="w-[40px] px-0"></TableHead>
                        <TableHead className="w-[240px] text-[11px] font-bold uppercase tracking-wider px-6 text-muted-foreground/70">Full Name</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">Phone Number</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">Status</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">Role</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">Last Active</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 text-right pr-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => {
                        const isExpanded = expandedId === member.id
                        return (
                            <React.Fragment key={member.id}>
                                <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                        <TableRow 
                                            className={cn(
                                                "group cursor-pointer hover:bg-muted/20 transition-colors border-b border-border/40 last:border-0",
                                                isExpanded && "bg-muted/30"
                                            )}
                                            onClick={() => toggleExpand(member.id)}
                                        >
                                            <TableCell className="px-0 py-3 text-center">
                                                <ChevronDownIcon className={cn("size-4 text-muted-foreground/40 transition-transform duration-200", isExpanded && "rotate-180")} />
                                            </TableCell>
                                            <TableCell className="py-2.5 px-6">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-8 ring-1 ring-border">
                                                        <AvatarImage src={member.avatar} />
                                                        <AvatarFallback className="text-[10px]">{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-semibold text-foreground/90">{member.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground font-medium">
                                                {member.phone}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-tight h-5 px-2 rounded-full", getStatusColor(member.status))}>
                                                    {member.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {member.role}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground font-sans">
                                                {member.lastActive}
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <div className="flex items-center justify-end gap-0.5" onClick={(e) => e.stopPropagation()}>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="size-8 text-muted-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                                                        onClick={() => onEdit(member)}
                                                    >
                                                        <PencilIcon className="size-3.5" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="size-8 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                                                        onClick={() => onDelete(member.id)}
                                                    >
                                                        <Trash2Icon className="size-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-40">
                                        <ContextMenuItem className="gap-2" onClick={() => onEdit(member)}>
                                            <PencilIcon className="size-3.5" /> Edit Member
                                        </ContextMenuItem>
                                        <ContextMenuItem variant="destructive" className="gap-2" onClick={() => onDelete(member.id)}>
                                            <Trash2Icon className="size-3.5" /> Delete Member
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>

                                {/* Expanded Detail Box */}
                                <TableRow className={cn(
                                    "border-0 hover:bg-transparent overflow-hidden",
                                    !isExpanded && "invisible"
                                )}>
                                    <TableCell colSpan={7} className={cn("p-0 border-0 transition-all duration-300", isExpanded ? "h-auto" : "h-0")}>
                                        <div className={cn(
                                            "grid transition-[grid-template-rows] duration-300 ease-out",
                                            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        )}>
                                            <div className="overflow-hidden">
                                                <div className="grid grid-cols-3 gap-6 bg-muted/10 p-6 border-b border-border/40 shadow-inner">
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Contact Information</h4>
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                                                <div className="size-8 rounded-lg bg-background flex items-center justify-center border border-border/50">
                                                                    <MailIcon className="size-3.5 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Email Address</span>
                                                                    <span>{member.email}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                                                <div className="size-8 rounded-lg bg-background flex items-center justify-center border border-border/50">
                                                                    <AtSignIcon className="size-3.5 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Username</span>
                                                                    <span className="font-mono text-xs">{member.username}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 border-l border-border/30 pl-6">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Member Details</h4>
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                                                <div className="size-8 rounded-lg bg-background flex items-center justify-center border border-border/50">
                                                                    <CalendarIcon className="size-3.5 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Joined Date</span>
                                                                    <span>{member.joinedDate}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                                                <div className="size-8 rounded-lg bg-background flex items-center justify-center border border-border/50">
                                                                    <BriefcaseIcon className="size-3.5 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Position</span>
                                                                    <span>{member.role}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 border-l border-border/30 pl-6">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Performance Summary</h4>
                                                        <div className="bg-background/40 rounded-xl p-4 border border-border/50 flex items-center gap-4">
                                                            <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                                <LayoutDashboardIcon className="size-5 text-emerald-600" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-2xl font-bold tracking-tight">{member.tasksCompleted}</span>
                                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Tasks Finished</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
