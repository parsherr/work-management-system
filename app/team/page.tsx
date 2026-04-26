"use client"

import React, { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TeamTable } from "@/components/team/team-table"
import { MemberDialog } from "@/components/team/member-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    PlusIcon,
    SearchIcon,
    ChevronDownIcon,
    DownloadIcon,
    FilterIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

export type TeamMember = {
    id: string
    name: string
    username: string
    role: string
    status: "Active" | "Inactive" | "Banned" | "Pending" | "Suspended"
    joinedDate: string
    lastActive: string
    tasksCompleted: number
    avatar: string
    phone: string
    email: string
}

const initialMembers: TeamMember[] = [
    {
        id: "1",
        name: "Sarah Chen",
        username: "sarahc",
        role: "Product Owner",
        status: "Active",
        joinedDate: "March 12, 2023",
        email: "sarah.chen@workos.com",
        phone: "+1 (555) 123-4567",
        avatar: "/avatars/avatar-1.png",
        lastActive: "2 mins ago",
        tasksCompleted: 42,
    },
    {
        id: "2",
        name: "Michael Ross",
        username: "mross77",
        role: "Developer",
        status: "Active",
        joinedDate: "June 27, 2022",
        email: "michael.ross@workos.com",
        phone: "+1 (555) 987-6543",
        avatar: "/avatars/avatar-2.png",
        lastActive: "15 mins ago",
        tasksCompleted: 128,
    },
    {
        id: "3",
        name: "Emily Watson",
        username: "emily_w",
        role: "Designer",
        status: "Inactive",
        joinedDate: "January 8, 2024",
        email: "emily.watson@workos.com",
        phone: "+1 (555) 456-7890",
        avatar: "/avatars/avatar-3.png",
        lastActive: "1 hour ago",
        tasksCompleted: 64,
    }
]

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers)
    const [searchQuery, setSearchQuery] = useState("")
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const filteredMembers = useMemo(() => {
        return members.filter(m =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [members, searchQuery])

    const handleSaveMember = (member: TeamMember) => {
        if (members.find(m => m.id === member.id)) {
            setMembers(members.map(m => m.id === member.id ? member : m))
        } else {
            setMembers([...members, member])
        }
    }

    const handleDeleteMember = (id: string) => {
        if (confirm("Are you sure you want to remove this member?")) {
            setMembers(members.filter(m => m.id !== id))
        }
    }

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
                <main className="flex flex-1 flex-col overflow-auto bg-background/50">
                    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 space-y-6">
                        {/* Refined Filter Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative group w-full sm:w-64">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        placeholder="Search members..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 bg-background/40 border-border/40 focus-visible:ring-primary/20 h-9 text-sm rounded-lg"
                                    />
                                </div>
                                <Button variant="outline" size="sm" className="h-9 gap-2 border-border/50 text-muted-foreground">
                                    <FilterIcon className="size-3.5" />
                                    Role
                                    <ChevronDownIcon className="size-3.5" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Button variant="outline" size="sm" className="h-9 gap-2 border-border/50 text-muted-foreground">
                                    <DownloadIcon className="size-3.5" />
                                    Export
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setEditingMember(null)
                                        setIsDialogOpen(true)
                                    }}
                                    className="bg-primary hover:bg-primary/90 shadow-sm gap-2 h-9 rounded-lg font-medium px-4"
                                >
                                    <PlusIcon className="size-4" />
                                    Add User
                                </Button>
                            </div>
                        </div>

                        {/* Professional Data Table */}
                        <TeamTable
                            members={filteredMembers}
                            onEdit={(m) => {
                                setEditingMember(m)
                                setIsDialogOpen(true)
                            }}
                            onDelete={handleDeleteMember}
                        />

                        {filteredMembers.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-24 bg-muted/5 border-2 border-dashed border-border/20 rounded-2xl">
                                <p className="text-sm text-muted-foreground font-medium italic">No matching members found.</p>
                            </div>
                        )}
                    </div>
                </main>

                <MemberDialog
                    member={editingMember}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onSave={handleSaveMember}
                />
            </SidebarInset>
        </SidebarProvider>
    )
}
