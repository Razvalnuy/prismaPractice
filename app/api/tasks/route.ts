import { prisma } from "@/prisma/prisma.client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	const tasks = await prisma.task.findMany()
	return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
	const data = await req.json()
	const task = await prisma.task.create({ data })

	return NextResponse.json(task)
}

export async function PATCH(req: NextRequest) {
	const data = await req.json()

	const updateTask = await prisma.task.update({
		where: { id: data.id },
		data: {
			isChecked: data.isChecked,
		},
	})

	return NextResponse.json(updateTask)
}

export async function DELETE(req: NextRequest) {
	try {
		const { id } = await req.json()
		await prisma.task.delete({ where: { id } })
		return NextResponse.json({ message: "Task deleted", id }, { status: 200 })
	} catch (error) {
		console.error("err", error)
		return NextResponse.json({ error: "Task not found" }, { status: 404 })
	}
}
