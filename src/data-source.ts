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

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1sU*DtM&9RfB",
    database: "magazine_b",
    synchronize: true,
    logging: false,
    entities: [UsersEntity,CategoryEntity,SubCategoryEntity,BrandsEntity,ProductsEntity,BannerCategoryEntity,BannerEntity,OrdersEntity,AdminEntity],
    migrations: [],
    subscribers: [],
})
