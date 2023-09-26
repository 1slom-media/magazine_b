import "reflect-metadata"
import { DataSource } from "typeorm"
import { UsersEntity } from "./entities/users"
import { CategoryEntity } from "./entities/category"
import { SubCategoryEntity } from "./entities/sub_category"
import { BrandsEntity } from "./entities/brands"
import { ProductsEntity } from "./entities/products"
import { BannerCategoryEntity } from "./entities/banner_category"
import { BannerEntity } from "./entities/banner"
import { OrdersEntity } from "./entities/orders"
import { AdminEntity } from "./entities/admin"
import { CommentsEntity } from "./entities/comments"
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,
    logging: false,
    entities: [UsersEntity,CategoryEntity,SubCategoryEntity,BrandsEntity,ProductsEntity,BannerCategoryEntity,BannerEntity,OrdersEntity,AdminEntity,CommentsEntity],
    migrations: [],
    subscribers: [],
})
