import { IsString, isArray} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { UsersEntity } from "./users";
import { ProductsEntity } from "./products";
import { AdminEntity } from "./admin";

@Entity({ name: "oders" })
export class OrdersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200,default:"ожидание" })
    @IsString()
    status: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type_payment: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type_sell: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    location: string

    @Column({ type: "varchar", length: 100,nullable:true })
    @IsString()
    addition_phone: string

    @Column({ type: "varchar", length: 100,nullable:true })
    @IsString()
    price: string

    @Column({ type: "varchar", length: 100,nullable:true })
    @IsString()
    term_date: string 

    @Column({ type: "text",nullable:true })
    @IsString()
    comentary: string

    @Column({ type: "text",nullable:true })
    @IsString()
    count: string

    @Column({ type: "jsonb",nullable:true })
    indeks: object[]

    @ManyToOne(() => UsersEntity, (user) => user.orders,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    users: UsersEntity

    @ManyToMany(() => ProductsEntity,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE"})
    @JoinTable()
    products: ProductsEntity[]

    @ManyToOne(() =>AdminEntity , (admins) => admins.orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    admins:AdminEntity 

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}