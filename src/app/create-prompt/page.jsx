'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Form from "@/components/Form"

function CreatePrompt() {
    const router = useRouter()
    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false)

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e) => {
        e.preventDefault()

        setSubmitting(true)

        try {
            const response = await fetch('/api/prompts/new', {
                method: 'POST',
                body: JSON.stringify({
                    tag: post.tag,
                    prompt: post.prompt,
                    userId: session.user?.id
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

    return (
        <Form
            type={"Create"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt