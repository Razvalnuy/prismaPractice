import { Task } from "@prisma/client"
import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getTasks = async (): Promise<Task[]> => {
	return (await axiosInstance.get(ApiRoutes.TASKS)).data
}

export const addedTask = async (text: string): Promise<Task> => {
	return (await axiosInstance.post(ApiRoutes.TASKS, { text })).data
}

export const updateTask = async (
	id: number,
	isChecked: boolean
): Promise<boolean> => {
	const response = await axiosInstance.patch(ApiRoutes.TASKS, { id, isChecked })
	return response.status === 200
}

export const deleteTask = async (id: number): Promise<boolean> => {
	const response = await axiosInstance.delete(`${ApiRoutes.TASKS}`, {
		data: { id },
	})
	return response.status === 200
}
