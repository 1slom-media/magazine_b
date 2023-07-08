import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { sign } from '../utils/jwt';
import { compare } from '../utils/compare';
import { hashed } from '../utils/hashed';
import { UsersEntity } from '../entities/users';

class UsersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(UsersEntity).find({
            relations: {
                orders: true,
            },order:{id:"ASC"}
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
        let { name, surname, phone,email } = req.body

        const foundUsers = await AppDataSource.getRepository(UsersEntity).find({
            where:{phone}
        })
        
        if(!foundUsers.length){
            const users = await AppDataSource.getRepository(UsersEntity).createQueryBuilder().insert().into(UsersEntity).values({ name, surname, phone,email }).returning("*").execute()
    
            res.json({
                status: 201,
                message: "Users created",
                data: users.raw[0],
                token:sign({id:users.raw[0].id})
            })
        }else{
            res.json({
                status: 401,
                message: "This number already exists. You can access your account by login in",
            })
        }

    }

    public async SignIn(req: Request, res: Response) {
        try {
            const { phone} = req.body

            const foundUsers = await AppDataSource.getRepository(UsersEntity).find({
                where: { phone }
            })
             
            if (foundUsers && foundUsers.length) {
                return res.json({
                    status: 200,
                    message: "Users login successful",
                    token: sign({ id: foundUsers[0].id }),
                    data: foundUsers
                })

            } else {
                res.status(401).json({
                    status: 401,
                    message: "wrong phone number",
                    token: null,
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    public async Put(req: Request, res: Response) {
        try {
            const { id } = req.params
            let { name, surname, phone,email } = req.body

            const users = await AppDataSource.getRepository(UsersEntity).createQueryBuilder().update(UsersEntity)
                .set({ name, surname, phone,email })
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

