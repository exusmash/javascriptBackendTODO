import {Task} from "@prisma/client";
import {prisma} from "../server"


const createNewTask = async (task: Task): Promise<Task> => {
    const {title, description, isDone, tagId} = task
    console.log(task)
    if (isIncludeTag(task)) {
        return prisma.task.create({
            data: {
                title,
                description,
                isDone,
                tagId: tagId // Подключите тег напрямую по полю tagId
            },
            include: {
                tag: true
            }
        });
    }

    return prisma.task.create({
        data: {
            title,
            description,
            isDone
        }
    });
}

const getAllTasks = async (): Promise<Task[]> => {
    return prisma.task.findMany({
        include: {
            tag: true
        }
    });
}

const getTaskById = async (taskId: number): Promise<Task> => {
    return prisma.task.findUniqueOrThrow({
        where: {
            id: taskId
        }
    });
}

const updateTask = async (taskId: number, task: Task): Promise<Task> => {
    const {title, description, isDone, tagId} = task
    if (isIncludeTag(task)) {
        return prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                title: title,
                description: description,
                isDone: isDone,
                tag: {
                    connect: {id: tagId}
                }

            },
            include: {
                tag: true
            }
        });
    }
    return prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            title: title,
            description: description,
            isDone: isDone,
        },
    });
}

const deleteTask = async (taskId: number): Promise<void> => {
    await prisma.task.delete({
        where: {
            id: taskId
        }
    })
}

function isIncludeTag(task: Task): boolean {
    return task.tagId !== undefined && task.tagId !== null
}


export default {
    createNewTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}