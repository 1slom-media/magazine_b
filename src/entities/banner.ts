import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { BannerCategoryEntity } from "./banner_category";


@Entity({ name: "banner" })
export class BannerEntity {
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

    @Column({ type: "varchar" })
    @IsString()
    description_uz: string

    @Column({ type: "varchar" })
    @IsString()
    description_en: string

    @Column({ type: "varchar" })
    @IsString()
    description_ru: string

    @Column({ type: "varchar" })
    @IsString()
    price: string

    @Column({ type: "text" })
    @IsString()
    image: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => BannerCategoryEntity, (banner_category) => banner_category.banner,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    banner_category: BannerCategoryEntity
}
