"use client"
import { Api } from "@/services/api-client"
import React, { useEffect, useState } from "react"
import { NewTask } from "./newTask"
import { TasksGroup } from "./tasksGroup"

interface TasksProps {
	id: number
	text: string
	isChecked: boolean
}

export const TaskManager: React.FC = () => {
	const [tasks, setTasks] = useState<TasksProps[]>([])
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		async function get() {
			try {
				setLoader(true)
				const data = await Api.Tasks.getTasks()
				setTasks(data)
			} catch (err) {
				console.log("Ошибка загрузки задач:", err)
			} finally {
				setLoader(false)
			}
		}
		get()
	}, [])

	const addTask = async (text: string) => {
		try {
			const data = await Api.Tasks.addedTask(text)
			setTasks((prevTasks) => [
				...prevTasks,
				{ id: data.id, text: data.text, isChecked: false },
			])
		} catch (err) {
			console.error("Ошибка добавления задачи:", err)
		}
	}

	async function updateTask(id: number, isChecked: boolean) {
		const prevData = [...tasks]
		try {
			setTasks((prevTasks) => [
				...prevTasks.map((prevTask) =>
					prevTask.id === id ? { ...prevTask, isChecked } : prevTask
				),
			])

			const status = await Api.Tasks.updateTask(id, isChecked)
			if (!status) {
				throw new Error("Ошибка обновления задачи")
			}
		} catch (err) {
			setTasks([...prevData])
			console.error("Ошибка обновления задачи:", err)
		}
	}

	const deleteTask = async (id: number) => {
		const prevData = [...tasks]
		try {
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))

			const status = await Api.Tasks.deleteTask(id)
			if (!status) {
				throw new Error("Ошибка удаления задачи")
			}
		} catch (err) {
			setTasks([...prevData])
			console.error("Ошибка удаления задачи:", err)
		}
	}

	return (
		<div className="w-full max-w-[600px] mx-auto px-4">
			<NewTask addTask={addTask} />
			<TasksGroup
				tasks={tasks}
				loader={loader}
				updateTask={updateTask}
				deleteTask={deleteTask}
			/>
		</div>
	)
}
