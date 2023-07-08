import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ProductsEntity } from '../entities/products';
import { Like } from 'typeorm';

class ProductsController {
    public async Get(req: Request, res: Response): Promise<void> {
        const { categoryId, brandId, subCategoryId, price, min, max } = req.query

        let query = AppDataSource.getRepository(ProductsEntity)
            .createQueryBuilder('products')
            .leftJoinAndSelect('products.category', 'category')
            .leftJoinAndSelect('products.sub_category', 'sub_category')
            .leftJoinAndSelect('products.brands', 'brands');

        if (categoryId && Number(categoryId) > 0) {
            query = query.where('products.category.id = :category_id', { category_id: categoryId });
        }
        if (brandId && Number(brandId) > 0) {
            query = query.andWhere('products.brands.id=:brand_id', { brand_id: brandId })
        }
        if (subCategoryId && Number(subCategoryId) > 0) {
            query = query.andWhere('products.sub_category.id=:sub_id', { sub_id: subCategoryId })
        }
        if (price && price == "max") {
            query = query.orderBy('products.price', 'DESC')
        }
        if (price && price == "min") {
            query = query.orderBy('products.price', 'ASC')
        }
        if (min && max && Number(min) >= 0 && Number(max) > 0) {
            query = query.andWhere('products.price>=:min_price', { min_price: min }).andWhere('products.price<=:max_price', { max_price: max })
        }

        const products = await query.getMany();
        res.json(products);
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(ProductsEntity).find({
            relations: {
                category: true,
                brands: true,
                sub_category: true,
                orders: true
            }, where: { id: +id }
        }));
    }

    public async GetSearch(req: Request, res: Response): Promise<void> {
        let { search } = req.query

        search = search.toString().trim().toLowerCase()

        res.json(await AppDataSource.getRepository(ProductsEntity).find({
            relations: {
                category: true,
                brands: true,
                sub_category: true,
                orders: true
            }, where: [{ product_name_uz: Like(`${search}%`) },
            { product_name_en: Like(`${search}%`) },
            { product_name_ru: Like(`${search}%`) }
            ]
        }));
    }

    public async Post(req: Request, res: Response) {
        let { product_name_uz, product_name_en, product_name_ru, description_uz, description_en, description_ru, price, count, color, guarantee, max_tension, weight, size, all, sale, three_months, six_months, tvelve_months, category, sub_category, brands, image1, image2, image3 } = req.body

        product_name_uz = product_name_uz.toLowerCase()
        product_name_en = product_name_en.toLowerCase()
        product_name_ru = product_name_ru.toLowerCase()

        const products = await AppDataSource.getRepository(ProductsEntity).createQueryBuilder().insert().into(ProductsEntity).values({ product_name_uz, product_name_en, product_name_ru, description_uz, description_en, description_ru, price, count, color, guarantee, max_tension, weight, size, all, sale, three_months, six_months, tvelve_months, category, sub_category, brands, image1, image2, image3 }).returning("*").execute()

        res.json({
            status: 201,
            message: "products created",
            data: products.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { product_name_uz, product_name_en, product_name_ru, description_uz, description_en, description_ru, price, count, color, guarantee, max_tension, weight, size, all, sale, three_months, six_months, tvelve_months, category, sub_category, brands, image1, image2, image3 } = req.body
            const { id } = req.params

            const products = await AppDataSource.getRepository(ProductsEntity).createQueryBuilder().update(ProductsEntity)
                .set({ product_name_uz, product_name_en, product_name_ru, description_uz, description_en, description_ru, price, count, color, guarantee, max_tension, weight, size, all, sale, three_months, six_months, tvelve_months, category, sub_category, brands, image1, image2, image3 })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "products updated",
                data: products.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const products = await AppDataSource.getRepository(ProductsEntity).createQueryBuilder().delete().from(ProductsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "products deleted",
                data: products.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductsController();