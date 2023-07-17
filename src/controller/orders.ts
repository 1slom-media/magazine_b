import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Like } from 'typeorm';
import { OrdersEntity } from '../entities/orders';

class ProductsController {
    public async Get(req: Request, res: Response): Promise<void> {
        const { status, typePayment, typeSell, date } = req.query

        let query = AppDataSource.getRepository(OrdersEntity)
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.admins', 'admins')
            .leftJoinAndSelect('orders.users', 'users')
            .leftJoinAndSelect('orders.products', 'products');

        if (status && status.length) {
            query = query.where('orders.status = :order_status', { order_status: status });
        }
        if (typePayment && typePayment.length) {
            query = query.andWhere('orders.type_payment=:type_payment', { type_payment: typePayment })
        }
        if (typeSell && typeSell.length) {
            query = query.andWhere('orders.type_sell=:type_sell', { type_sell: typeSell })
        }
        if (date && date.length) {
            query = query.andWhere('orders.date=:order_date', { order_date: date })
        }

        const orders = await query.getMany();
        res.json(orders);
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(OrdersEntity).find({
            relations: {
                products: true,
                admins: true,
                users: true
            }, where: { id: +id }
        }));
    }

    public async GetSearch(req: Request, res: Response): Promise<void> {
        let { search } = req.query

        search = search.toString().trim().toLowerCase()

        res.json(await AppDataSource.getRepository(OrdersEntity).find({
            relations: {
                products: true,
                admins: true,
                users: true
            }, where: [{ products: { product_name_uz: Like(`${search}%`) } },
            { products: { product_name_en: Like(`${search}%`) } },
            { products: { product_name_ru: Like(`${search}%`) } }
            ]
        }));
    }

    public async Post(req: Request, res: Response) {
        const { status,type_payment,type_sell,location,addition_phone,date,term_date,comentary,price,users,products,admins } = req.body

        

        const orders = await AppDataSource.getRepository(OrdersEntity).createQueryBuilder().insert().into(OrdersEntity).values({status,type_payment,type_sell,location,addition_phone,date,term_date,comentary,price,users,products,admins }).returning("*").execute()

        res.json({
            status: 201,
            message: "orders created",
            data: orders.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { status,type_payment,type_sell,location,addition_phone,date,term_date,comentary,price,users,products,admins } = req.body
            const { id } = req.params

            const orders = await AppDataSource.getRepository(OrdersEntity).createQueryBuilder().update(OrdersEntity)
                .set({ status,type_payment,type_sell,location,addition_phone,date,term_date,comentary,price,users,products,admins })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "orders updated",
                data: orders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const orders = await AppDataSource.getRepository(OrdersEntity).createQueryBuilder().delete().from(OrdersEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "orders deleted",
                data: orders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductsController();