import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import { UsersEntity } from "./users";


@Entity({ name: "commentary" })
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    @IsString()
    comentary: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>UsersEntity,(users)=>users.comments,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    users:UsersEntity

}