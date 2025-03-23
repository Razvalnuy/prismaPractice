"use client"
import { cn } from "@/lib/utils"
import { Eye, EyeClosed, X } from "lucide-react"
import React from "react"
import { Skeleton } from "../ui/skeleton"

interface TasksProps {
	text: string
	id: number
	isChecked: boolean
}

interface Props {
	tasks: TasksProps[]
	loader: boolean
	updateTask: (id: number, isChecked: boolean) => void
	deleteTask: (id: number) => void
}

export const TasksGroup: React.FC<Props> = ({
	tasks,
	loader,
	updateTask,
	deleteTask,
}) => {
	return (
		<div className="flex flex-col w-full max-w-[600px] mx-auto gap-2 px-4">
			{loader &&
				[...Array(tasks?.length || 6)].map((_, index) => (
					<Skeleton
						key={index}
						className="flex justify-between border rounded-2xl px-2 py-2 items-center w-full"
					>
						<div className="flex items-center">
							<EyeClosed size={20} className="cursor-pointer mr-2" />
							<label className="max-w-[500px] w-full break-words text-xl sm:text-base">
								Загрузка...
							</label>
						</div>
						<X
							size={20}
							className="text-red-800 cursor-pointer flex-shrink-0"
						/>
					</Skeleton>
				))}

			{tasks.map((task, index) => (
				<div
					key={index}
					className={cn(
						"flex justify-between border rounded-2xl px-2 py-2 items-center w-full",
						task.isChecked
							? "bg-gray-100 text-gray-500 line-through opacity-70"
							: "bg-white"
					)}
				>
					<div className="flex items-center w-full">
						{task.isChecked ? (
							<EyeClosed
								size={20}
								className="cursor-pointer mr-2"
								onClick={() => updateTask(task.id, !task.isChecked)}
							/>
						) : (
							<Eye
								size={20}
								className="cursor-pointer mr-2"
								onClick={() => updateTask(task.id, !task.isChecked)}
							/>
						)}

						<label
							htmlFor={task.text + index}
							className="max-w-[500px] w-full break-words text-xl sm:text-base"
						>
							{task.text}
						</label>
					</div>
					{!task.isChecked && (
						<X
							size={20}
							className="text-red-800 cursor-pointer flex-shrink-0"
							onClick={() => deleteTask(task.id)}
						/>
					)}
				</div>
			))}
		</div>
	)
}
