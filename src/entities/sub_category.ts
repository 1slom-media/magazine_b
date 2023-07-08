import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "./category";
import { ProductsEntity } from "./products";


@Entity({ name: "sub_category" })
export class SubCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    @IsString()
    title_uz: string

    @Column({ type: "varchar" })
    @IsString()
    title_en: string

    @Column({ type: "varchar" })
    @IsString()
    title_ru: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.sub_category,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    category: CategoryEntity

    @OneToMany(()=>ProductsEntity,(products)=>products.sub_category,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    products:ProductsEntity[]
}
