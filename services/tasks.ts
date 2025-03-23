import { Task } from "@prisma/client"
import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getTasks = async (): Promise<Task[]> => {
	return await axiosInstance.get(ApiRoutes.TASKS)
}

export const addedTask = async (text: string): Promise<Task> => {
	return await axiosInstance.post(ApiRoutes.TASKS, { text })
}

export const updateTask = async (
	id: number,
	isChecked: boolean
): Promise<Task> => {
	return await axiosInstance.patch(ApiRoutes.TASKS, { id, isChecked })
}

export const deleteTask = async (id: number): Promise<Task> => {
	return await axiosInstance.delete(`${ApiRoutes.TASKS}`, { data: { id } })
}
