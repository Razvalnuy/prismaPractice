import { prisma } from "./prisma.client"

async function up() {}

async function down() {
	await prisma.$executeRawUnsafe(`DEALLOCATE ALL;`)

	await prisma.$transaction([
		prisma.$executeRawUnsafe(`DELETE FROM "Task";`),
		prisma.$executeRawUnsafe(`ALTER SEQUENCE "Task_id_seq" RESTART WITH 1;`),
	])
}

async function main() {
	try {
		await down()
		await up()
	} catch (err) {
		console.log("errPrisma", err)
		await prisma.$disconnect()
	} finally {
		await prisma.$disconnect()
	}
}

main()
