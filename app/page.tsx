import { Container } from "@/components/shared/container"
import { TaskManager } from "@/components/shared/taskManager"

export default function Home() {
	return (
		<div className="flex">
			<Container>
				<TaskManager />
			</Container>
		</div>
	)
}
