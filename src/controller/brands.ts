import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { BrandsEntity } from '../entities/brands';
import { Like } from 'typeorm';

class BrandsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(BrandsEntity).find({
            relations: {
                products: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(BrandsEntity).find({
            relations: {
                products: true
            }, where: { id: +id }
        }));
    }

    public async GetSearch(req: Request, res: Response): Promise<void> {
        let { search } = req.query

        search = search.toString().trim().toLowerCase()

        res.json(await AppDataSource.getRepository(BrandsEntity).find({
            relations: {
                products: true
            }, where: [
                { brands_name_uz: Like(`${search}%`) },
                { brands_name_en: Like(`${search}%`) },
                { brands_name_ru: Like(`${search}%`) }
            ]
        }));
    }

    public async Post(req: Request, res: Response) {
        let { brands_name_uz, brands_name_en, brands_name_ru, country } = req.body

        brands_name_uz=brands_name_uz.toLowerCase()
        brands_name_en=brands_name_en.toLowerCase()
        brands_name_ru=brands_name_ru.toLowerCase()
        
        const brands = await AppDataSource.getRepository(BrandsEntity).createQueryBuilder().insert().into(BrandsEntity).values({ brands_name_uz, brands_name_en, brands_name_ru, country }).returning("*").execute()

        res.json({
            status: 201,
            message: "brands created",
            data: brands.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { brands_name_uz, brands_name_en, brands_name_ru, country } = req.body
            const { id } = req.params

            const brands = await AppDataSource.getRepository(BrandsEntity).createQueryBuilder().update(BrandsEntity)
                .set({ brands_name_uz, brands_name_en, brands_name_ru, country })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "brands updated",
                data: brands.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const brands = await AppDataSource.getRepository(BrandsEntity).createQueryBuilder().delete().from(BrandsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "brands deleted",
                data: brands.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BrandsController();