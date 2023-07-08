import { IsString} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { OrdersEntity } from "./orders";


@Entity({ name: "users" })
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    name: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    surname: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    phone: string

    @Column({ type: "varchar", length: 100, nullable:true })
    @IsString()
    email: string

    @OneToMany(()=>OrdersEntity,(orders)=>orders.users,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    orders:OrdersEntity[]

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}