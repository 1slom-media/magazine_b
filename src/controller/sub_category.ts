import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { SubCategoryEntity } from '../entities/sub_category';

class SubCategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(SubCategoryEntity).find({
            relations: {
                products: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(SubCategoryEntity).find({
            relations: {
                products: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { title_uz, title_en, title_ru,category } = req.body

        const sub_category = await AppDataSource.getRepository(SubCategoryEntity).createQueryBuilder().insert().into(SubCategoryEntity).values({ title_uz, title_en, title_ru,category }).returning("*").execute()

        res.json({
            status: 201,
            message: "subcategory created",
            data: sub_category.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz, title_en, title_ru,category } = req.body
            const { id } = req.params

            const sub_category = await AppDataSource.getRepository(SubCategoryEntity).createQueryBuilder().update(SubCategoryEntity)
                .set({ title_uz, title_en, title_ru,category })
                .where({ id })
                .returning("*")
                .execute()
            res.json({
                status: 200,
                message: "sub_category updated",
                data: sub_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const sub_category = await AppDataSource.getRepository(SubCategoryEntity).createQueryBuilder().delete().from(SubCategoryEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "subcategory deleted",
                data: sub_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new SubCategoryController();