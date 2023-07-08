import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { sign } from '../utils/jwt';
import { compare } from '../utils/compare';
import { AdminEntity } from '../entities/admin';
import { hashed } from '../utils/hashed';

class AdminController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(AdminEntity).find({
            relations: {
                orders: true,
            },order:{id:"ASC"}
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(AdminEntity).find({
            relations: {
                orders: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        let { admin_name, admin_surname, phone, password, login, image, role } = req.body
        password = await hashed(password);

        const foundAdmin = await AppDataSource.getRepository(AdminEntity).find({
            where:{login}
        })
        
        if(!foundAdmin.length){
            const admin = await AppDataSource.getRepository(AdminEntity).createQueryBuilder().insert().into(AdminEntity).values({ admin_name, admin_surname, phone, password, login, image, role }).returning("*").execute()
    
            res.json({
                status: 201,
                message: "admin created",
                data: admin.raw[0]
            })
        }else{
            res.json({
                status: 401,
                message: "Already exists",
            })
        }

    }

    public async SignIn(req: Request, res: Response) {
        try {
            const { login, password } = req.body

            const foundAdmin = await AppDataSource.getRepository(AdminEntity).findOne({
                where: { login }
            })
             
            if (foundAdmin && await compare(password, foundAdmin.password) == true) {
                return res.json({
                    status: 200,
                    message: "Admin login successful",
                    token: sign({ id: foundAdmin.id }),
                    data: foundAdmin
                })

            } else {
                res.status(401).json({
                    status: 401,
                    message: "wrong email or password",
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
            let { admin_name, admin_surname, phone, password, login, image, role } = req.body

            const admin = await AppDataSource.getRepository(AdminEntity).createQueryBuilder().update(AdminEntity)
                .set({ admin_name, admin_surname, phone, password, login, image, role })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "admin updated",
                data: admin.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

}

export default new AdminController();

