'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@/components/Form"

function EditPrompt() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [submitting, setSubmitting] = useState(false)

    const promptId = searchParams.get('id')

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async (e) => {
        e.preventDefault()

        if (!promptId) return alert('Prompt ID not found')

        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompts/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    tag: post.tag,
                    prompt: post.prompt
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompts/${promptId}`)

        const post = await response.json()

        setPost({prompt: post?.prompt, tag: post?.tag})
    }

    useEffect(() => {
        if (promptId) getPromptDetails()
    }, [promptId])

    return (
        <Form
            type={"Edit"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt