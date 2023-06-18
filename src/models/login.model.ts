import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";
import { Messages } from "./messages.model";


@Entity()
export class Login {
    @PrimaryGeneratedColumn()
    login_id!: number;


    @Column({ unique: true })
    login_email!: string;

    @Column()
    login_username!: string;

    @Column()
    login_location!: string;

    @Column({ length: 100 })
    login_password!: string;

    @Column()
    login_role!: string

    @Column()
    login_contact!: string



    @OneToMany(type => Product, (product) => product.login, { onDelete: "CASCADE" })
    product!: Product[];


    @ManyToMany(type => Messages, (messages) => messages.login, { onDelete: "CASCADE" })
    messages!: Messages;



}/*  */