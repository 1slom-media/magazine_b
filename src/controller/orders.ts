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
            query = query.andWhere('orders.createdAt=:order_date', { order_date: date })
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
        const { status,type_payment,type_sell,location,addition_phone,term_date,comentary,price,count,users,products,admins,indeks } = req.body

        const orders=new OrdersEntity()
        orders.status=status
        orders.type_payment=type_payment
        orders.type_sell=type_sell
        orders.location=location
        orders.addition_phone=addition_phone
        orders.term_date=term_date
        orders.comentary=comentary
        orders.price=price
        orders.indeks=indeks
        orders.count=count
        orders.users=users
        orders.admins=admins
        orders.products=products

        await AppDataSource.manager.save(orders)

        res.json({
            status: 201,
            message: "orders created",
            data:orders
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { status,type_payment,type_sell,location,addition_phone,term_date,comentary,price,count,users,products,admins,indeks } = req.body
            const { id } = req.params

            const orders = await AppDataSource.getRepository(OrdersEntity).findOne({
                where: { id: +id }, relations: {
                    products: true,
                    users: true,
                    admins:true
                }
            })

            orders.status = status != undefined ? status : orders.status
            orders.products = products != undefined ? products : orders.products
            orders.indeks = indeks != undefined ? indeks : orders.indeks
            orders.price = price != undefined ? price : orders.price
            orders.type_payment = type_payment != undefined ? type_payment : orders.type_payment
            orders.type_sell = type_sell != undefined ? type_sell : orders.type_sell
            orders.location = location != undefined ? location : orders.location
            orders.addition_phone = addition_phone != undefined ? addition_phone : orders.addition_phone
            orders.term_date = term_date != undefined ? term_date : orders.term_date
            orders.comentary = comentary != undefined ? comentary : orders.comentary
            orders.count = count != undefined ? count : orders.count
            orders.users = users != undefined ? users : orders.users.id
            orders.admins = admins != undefined ? admins : orders.admins.id

            await AppDataSource.manager.save(orders)

            res.json({
                status: 200,
                message: "orders updated",
                data: orders
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