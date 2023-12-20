'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@/components/Profile"

function MyProfile() {
    const router = useRouter()
    const {data: session} = useSession()
    const [userPosts, setUserPosts] = useState([])

    const handleEdit = (item) => {
        router.push(`/update-prompt?id=${item?._id}`)
    }

    const handleDelete = async (item) => {
        const hasConfirmed = confirm('Are you sure want to delete this prompt?')

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompts/${item?._id}`, {
                    method: 'DELETE',
                })

                const filteredPosts = userPosts.filter(post => post?._id !== item?._id)

                setUserPosts(filteredPosts)
            } catch (error) {
                console.log(error?.message)
            }
        }
    }

    const fetchUserPosts = async () => {
        const response = await fetch(`/api/users/${session?.user?.id}/posts`)
        const data = await response.json()
    
        setUserPosts(data)
    }
    
    useEffect(() => {
        if (session?.user?.id) fetchUserPosts()
    }, [session?.user?.id])

    return (
        <Profile
            name='My Profile'
            desc='Welcome to your personalized profile page'
            data={userPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile