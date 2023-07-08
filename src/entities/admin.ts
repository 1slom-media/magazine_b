import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { OrdersEntity } from "./orders";


@Entity({ name: "admin" })
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    admin_name: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    admin_surname: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    phone: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    login: string

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar",nullable:true })
    image: string;

    @Column({ type: "varchar",default:"admin" })
    role: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>OrdersEntity,(orders)=>orders.admins,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    orders:OrdersEntity[]
}