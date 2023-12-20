import { connectToDB } from "@/utils/database";

import Prompt from "@/models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const userPosts = await Prompt.find({creator: params?.id}).populate('creator')

        return new Response(JSON.stringify(userPosts), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch user posts', {
            status: 500
        })
    }
}