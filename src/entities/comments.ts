import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import { UsersEntity } from "./users";


@Entity({ name: "commentary" })
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    @IsString()
    comentary_uz: string

    @Column({ type: "varchar" })
    @IsString()
    comentary_ru: string

    @Column({ type: "varchar" })
    @IsString()
    comentary_en: string 

    @Column({ type: "varchar" })
    @IsString()
    users: string 

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}