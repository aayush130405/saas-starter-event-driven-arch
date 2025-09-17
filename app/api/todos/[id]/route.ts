import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { messageInRaw } from "svix";

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    const {userId} = await auth()

    if(!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const todoId = params.id

        const todo = await prisma.todo.findUnique({
            where: {id: todoId}
        })

        if(!todo) {
            return NextResponse.json({error: "Todo not found"}, {status: 404})
        }

        if(todo.userId !== userId) {
            return NextResponse.json({error: "Forbidden"}, {status: 403})
        }

        await prisma.todo.delete({where: {id: todoId}})

        return NextResponse.json({message: "Todo deleted successfully"}, {status: 201})
    } catch (error) {
        console.error("Failed to delete todo")
        return NextResponse.json({error: "Internal server error"}, {status: 402})
    }
}