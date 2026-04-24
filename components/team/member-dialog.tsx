"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TeamMember } from "@/app/team/page"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface MemberDialogProps {
    member: TeamMember | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (member: TeamMember) => void
}

const ROLES = ["Developer", "Designer", "Manager", "Product Owner", "Marketing", "HR"]
const STATUSES = ["Active", "Inactive", "Banned", "Pending", "Suspended"]

export function MemberDialog({ member, open, onOpenChange, onSave }: MemberDialogProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [status, setStatus] = useState<string>("Active")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        if (member) {
            setName(member.name)
            setEmail(member.email)
            setUsername(member.username)
            setStatus(member.status)
            setRole(member.role)
            setPhone(member.phone)
            setAvatar(member.avatar)
        } else {
            setName("")
            setEmail("")
            setUsername("")
            setStatus("Active")
            setRole("")
            setPhone("")
            setAvatar("")
        }
    }, [member, open])

    const handleSave = () => {
        if (!name || !email || !role || !username) return

        onSave({
            id: member?.id || Math.random().toString(36).substring(2, 9),
            name,
            email,
            username,
            status: status as any,
            role,
            phone: phone || "No phone",
            avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            lastActive: member?.lastActive || "Just now",
            joinedDate: member?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            tasksCompleted: member?.tasksCompleted || 0,
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] border-border/50 shadow-2xl">
                <DialogHeader>
                    <DialogTitle>{member ? "Edit Member" : "Add New Member"}</DialogTitle>
                    <DialogDescription>
                        {member ? "Make changes to the member's profile here." : "Fill in the details to add a new team member."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Full Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="bg-muted/30 border-border/50 focus-visible:ring-primary/20"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="bg-muted/30 border-border/50 focus-visible:ring-primary/20"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Username</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="johndoe"
                                className="bg-muted/30 border-border/50 focus-visible:ring-primary/20"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/20">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUSES.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Role</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/20">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {ROLES.map((r) => (
                                    <SelectItem key={r} value={r}>{r}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Phone Number</Label>
                        <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="bg-muted/30 border-border/50 focus-visible:ring-primary/20"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">Cancel</Button>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                        {member ? "Save Changes" : "Add Member"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
