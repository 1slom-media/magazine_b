import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import { SubCategoryEntity } from "./sub_category";
import { ProductsEntity } from "./products";


@Entity({ name: "category" })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    category_uz: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    category_en: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    category_ru: string

    @Column({ type: "varchar",nullable:true})
    @IsString()
    image: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>SubCategoryEntity,(sub_category)=>sub_category.category,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    sub_category:SubCategoryEntity[]

    @OneToMany(()=>ProductsEntity,(products)=>products.category,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    products:ProductsEntity[]

}