import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import { SubCategoryEntity } from "./sub_category";
import { ProductsEntity } from "./products";


@Entity({ name: "brands" })
export class BrandsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    brands_name_uz: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    brands_name_en: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    brands_name_ru: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    country: string

    @Column({ type: "varchar" })
    @IsString()
    image: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>ProductsEntity,(products)=>products.brands,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    products:ProductsEntity[]

}