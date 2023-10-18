import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CommentsEntity } from '../entities/comments';

class CommentsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(CommentsEntity).find({
            order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(CommentsEntity).find({
            where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { comentary_uz, comentary_en, comentary_ru, users } = req.body

        const comments = await AppDataSource.getRepository(CommentsEntity).createQueryBuilder().insert().into(CommentsEntity).values({ comentary_uz, comentary_en, comentary_ru, users }).returning("*").execute()

        res.json({
            status: 201,
            message: "comments created",
            data: comments.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { comentary_uz, comentary_en, comentary_ru, users } = req.body
            const { id } = req.params

            const comments = await AppDataSource.getRepository(CommentsEntity).createQueryBuilder().update(CommentsEntity)
                .set({ comentary_uz, comentary_en, comentary_ru, users })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "comments updated",
                data: comments.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const comments = await AppDataSource.getRepository(CommentsEntity).createQueryBuilder().delete().from(CommentsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "comments deleted",
                data: comments.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CommentsController();