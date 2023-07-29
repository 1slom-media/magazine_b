import { IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { CategoryEntity } from "./category";
import { SubCategoryEntity } from "./sub_category";
import { BrandsEntity } from "./brands";
import { OrdersEntity } from "./orders";
 
@Entity({ name: "products" })
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 500 })
    @IsString()
    product_name_uz: string

    @Column({ type: "varchar", length: 500 })
    @IsString()
    product_name_en: string

    @Column({ type: "varchar", length: 500 })
    @IsString()
    product_name_ru: string

    @Column({ type: "varchar" })
    @IsString()
    description_uz: string

    @Column({ type: "varchar" })
    @IsString()
    description_en: string

    @Column({ type: "varchar" })
    @IsString()
    description_ru: string

    @Column({ type: "int" })
    @IsString()
    price: number

    @Column({ type: "varchar" })
    @IsNumber()
    count: string

    @Column({ type: "varchar" })
    @IsNumber()
    color: string

    @Column({ type: "varchar" })
    @IsNumber()
    guarantee: string

    @Column({ type: "varchar", nullable:true })
    @IsNumber()
    max_tension: string

    @Column({ type: "varchar", nullable:true })
    @IsNumber()
    weight: string

    @Column({ type: "varchar",nullable:true })
    @IsNumber()
    size: string

    @Column({ type: "varchar",nullable:true })
    @IsNumber()
    sale: string

    @Column({ type: "varchar",nullable:true })
    @IsNumber()
    all: string

    @Column({ type: "varchar",nullable:true })
    @IsNumber()
    three_months: string

    @Column({ type: "varchar",nullable:true })
    @IsNumber()
    six_months: string

    @Column({ type: "varchar",nullable:true })
    @IsNumber()
    tvelve_months: string

    @Column({ type: "text" })
    @IsString()
    image1: string

    @Column({ type: "text" })
    @IsString()
    image2: string

    @Column({ type: "text" })
    @IsString()
    image3: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.products,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    category: CategoryEntity

    @ManyToOne(() => SubCategoryEntity, (sub_category) => sub_category.products,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    sub_category: SubCategoryEntity

    @ManyToOne(() => BrandsEntity, (brands) => brands.products,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    brands: BrandsEntity
}