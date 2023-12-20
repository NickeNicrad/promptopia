import { connectToDB } from "@/utils/database";

import Prompt from "@/models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params?.id).populate('creator')

        if (!prompt)
            return new Response('Prompt not found', {
                status: 404
            })

        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch prompt', {
            status: 500
        })
    }
}

export const PATCH = async (req, { params }) => {
    try {
        await connectToDB()

        const { prompt, tag } = await req.json()

        const promptExist = await Prompt.findById(params?.id).populate('creator')

        if (!promptExist)
            return new Response('Prompt not found', {
                status: 404
            })

        promptExist.tag = tag
        promptExist.prompt = prompt

        await promptExist.save()

        return new Response(JSON.stringify(promptExist), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to update prompt', {
            status: 500
        })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(params?.id)

        return new Response('Prompt deleted', {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to delete prompt', {
            status: 500
        })
    }
}