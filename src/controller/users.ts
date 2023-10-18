import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { sign } from '../utils/jwt';
import { UsersEntity } from '../entities/users';
import randomNum from '../utils/randomNum';
import redis from '../utils/redis';
import sms from '../utils/sms';

class UsersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(UsersEntity).find({
            relations: {
                orders: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(UsersEntity).find({
            relations: {
                orders: true
            }, where: { id: +id }
        }));
    }

    public async SignUp(req: Request, res: Response) {
        let { name, surname, phone, email, image } = req.body

        const foundUsers = await AppDataSource.getRepository(UsersEntity).find({
            where: { phone }
        })

        if (!foundUsers.length) {
            const users = await AppDataSource.getRepository(UsersEntity).createQueryBuilder().insert().into(UsersEntity).values({ name, surname, phone, email, image }).returning("*").execute()
            const code = randomNum();
            redis.set(phone, code, 'EX', 120);
            sms.send(phone, `Для завершения процедуры регистрации на https://tools-group.uz пожалуйста, введите код: ${code} `)
            res.json({
                status: 201,
                message: "Users created",
                data: users.raw[0],
            })
        } else {
            res.json({
                status: 401,
                message: "This number already exists. You can access your account by login in",
            })
        }

    }

    public async VerifyPhone(req: Request, res: Response) {
        const { phone, code } = req.body

        const foundUser = await AppDataSource.getRepository(UsersEntity).findOne({
            where: { phone }
        })

        if (foundUser) {
            const redisCode = await redis.get(phone)
            if (redisCode && redisCode == code) {
                return res
                    .status(200)
                    .json({
                        status: 200,
                        message: 'Congratulations, you have successfully registered',
                        token: sign({ id: foundUser.id }),
                        user: foundUser
                    });
            } else {
                return res.status(400).json({ status: 400, message: 'Invalid code' });
            }
        } else {
            res.json({ status: 400, message: 'Phone not found' })
        }

    }

    public async SignIn(req: Request, res: Response) {
        const { phone } = req.body

        const foundUser = await AppDataSource.getRepository(UsersEntity).findOne({
            where: { phone }
        })

        if (foundUser) {
            const code = randomNum();
            redis.set(phone, code, 'EX', 120);
            sms.send(phone, `Для завершения процедуры регистрации на https://tools-group.uz пожалуйста, введите код: ${code} `)
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'Congratulations, you have successfully login',
                    data: foundUser
                });

        } else {
            res.json({ status: 400, message: 'Phone not found' })
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const { id } = req.params
            let { name, surname, phone, email, image } = req.body

            const users = await AppDataSource.getRepository(UsersEntity).createQueryBuilder().update(UsersEntity)
                .set({ name, surname, phone, email, image })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "Users updated",
                data: users.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

}

export default new UsersController();

