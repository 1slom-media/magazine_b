import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { BannerEntity } from '../entities/banner';

class BannerController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(BannerEntity).find({
            relations: {
                banner_category:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(BannerEntity).find({
            relations: {
                banner_category: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { title_uz, title_en,title_ru,description_uz,description_en,description_ru,price,image,banner_category } = req.body

        const banner = await AppDataSource.getRepository(BannerEntity).createQueryBuilder().insert().into(BannerEntity).values({ title_uz, title_en,title_ru,description_uz,description_en,description_ru,price,image,banner_category }).returning("*").execute()

        res.json({
            status: 201,
            message: "banner created",
            data: banner.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz, title_en,title_ru,description_uz,description_en,description_ru,price,image,banner_category } = req.body
            const { id } = req.params

            const banner = await AppDataSource.getRepository(BannerEntity).createQueryBuilder().update(BannerEntity)
                .set({ title_uz, title_en,title_ru,description_uz,description_en,description_ru,price,image,banner_category })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "banner updated",
                data: banner.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const banner = await AppDataSource.getRepository(BannerEntity).createQueryBuilder().delete().from(BannerEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "banner deleted",
                data: banner.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BannerController();