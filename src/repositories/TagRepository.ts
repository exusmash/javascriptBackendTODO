import {Tag} from "@prisma/client";
import {prisma} from "../server"

const createNewTag = async (tag: Tag): Promise<Tag> => {
    const title = tag.title
    return prisma.tag.create({
        data: {
            title
        }
    });
}

const getAllTags = async (): Promise<Tag[]> => {
    return prisma.tag.findMany({});
}

const getTagById = async (tagId: number): Promise<Tag> => {
    return prisma.tag.findUniqueOrThrow({
        where: {
            id: tagId
        }
    });
}

const updateTag = async (tagId: number, tag: Tag): Promise<Tag> => {
    const title = tag.title
    return prisma.tag.update({
        where: {
            id: tagId
        },
        data: {
            title: title
        }
    });
}

const deleteTag = async (tagId: number): Promise<void> => {
    await prisma.tag.delete({
        where: {
            id: tagId
        }
    })
}

export default {
    createNewTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag
}