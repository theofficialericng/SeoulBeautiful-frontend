"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    address: "",
  })
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      setProfileData({
        username: user.username,
        email: user.email,
        age: user.age.toString(),
        gender: user.gender,
        address: user.address,
      })
    }
  }, [user, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value) => {
    setProfileData((prev) => ({ ...prev, gender: value }))
  }

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://localhost:8080/api/user/update', profileData);
      if (newPassword && newPassword === confirmPassword) {
        // Update password logic would go here
      }
      if (avatar) {
        // Upload avatar logic would go here
      }
      setEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) return null // or a loading spinner

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl || "/placeholder-avatar.jpg"} alt={user.username} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        {editing && <Input type="file" onChange={handleAvatarChange} accept="image/*" />}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={profileData.age}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select disabled={!editing} onValueChange={handleGenderChange} value={profileData.gender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        {editing && (
          <>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        )}
        {editing ? (
          <div className="flex space-x-2">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        )}
      </form>
    </div>
  )
}
