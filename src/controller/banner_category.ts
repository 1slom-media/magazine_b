import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { BannerCategoryEntity } from '../entities/banner_category';

class BannerCategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(BannerCategoryEntity).find({
            relations: {
                banner:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(BannerCategoryEntity).find({
            relations: {
                banner: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { banner_category_uz, banner_category_en,banner_category_ru } = req.body

        const banner_category = await AppDataSource.getRepository(BannerCategoryEntity).createQueryBuilder().insert().into(BannerCategoryEntity).values({ banner_category_uz, banner_category_en,banner_category_ru }).returning("*").execute()

        res.json({
            status: 201,
            message: "banner_category created",
            data: banner_category.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { banner_category_uz, banner_category_en,banner_category_ru } = req.body
            const { id } = req.params

            const banner_category = await AppDataSource.getRepository(BannerCategoryEntity).createQueryBuilder().update(BannerCategoryEntity)
                .set({ banner_category_uz, banner_category_en,banner_category_ru })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "banner_category updated",
                data: banner_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const banner_category = await AppDataSource.getRepository(BannerCategoryEntity).createQueryBuilder().delete().from(BannerCategoryEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "banner_category deleted",
                data: banner_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BannerCategoryController();