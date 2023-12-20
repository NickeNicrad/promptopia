import { connectToDB } from "@/utils/database";

import User from "@/models/user";

export const GET = async (req) => {
    try {
        await connectToDB()

        const users = await User.find()

        return new Response(JSON.stringify(users), {
            status: 200
        })
    } catch (error) {
        console.log(error?.message)
        
        return new Response('Failed to fetch user posts', {
            status: 500
        })
    }
}