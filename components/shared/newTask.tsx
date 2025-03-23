"use client"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface Props {
	addTask: (text: string) => void
}

export const NewTask: React.FC<Props> = ({ addTask }) => {
	const [text, setText] = useState("")
	const [error, setError] = useState(false)

	const handleAddTask = () => {
		if (!text.trim()) {
			setError(true)
			return
		}
		addTask(text)
		setError(false)
		setText("")
	}

	return (
		<div
			className={cn(
				"relative flex gap-2 mx-auto justify-center mt-4 px-4 mb-4 w-full max-w-[500px] items-center rounded-sm ",
				error ? "text-red-600" : ""
			)}
		>
			<Input
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="w-full max-w-[400px] sm:max-w-[600px] px-4 py-2 text-sm sm:text-lg"
				type="text"
				placeholder={error ? "Пусто?" : "Новая задача..."}
			/>

			{/* <PencilLine
				onClick={handleAddTask}
				className="absolute top-1/2 translate-y-[-50%] right-6 cursor-pointer hover:text-gray-600"
				size={20}
			/> */}
			<Button className="bg-primary">test</Button>
		</div>
	)
}
