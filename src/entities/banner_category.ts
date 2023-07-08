import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import { BannerEntity } from "./banner";


@Entity({ name: "banner_category" })
export class BannerCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    banner_category_uz: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    banner_category_en: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    banner_category_ru: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>BannerEntity,(banner)=>banner.banner_category,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    banner:BannerEntity[]

}