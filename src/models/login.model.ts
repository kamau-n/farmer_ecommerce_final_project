import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";
import { Messages } from "./messages.model";
import { ChatRoom } from "./room.model";
import { Complaints } from "./complaints.model";
import { IsEmail } from "class-validator";


@Entity()
export class Login {

    @PrimaryGeneratedColumn()
    login_id!: number;


    @Column({ unique: true })
    @IsEmail()
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

    @Column({ default: false })
    login_terms!: boolean


    @CreateDateColumn({ nullable: true })
    login_created_on!: Date


    @OneToMany(type => Product, (product) => product.login, { onDelete: "CASCADE" })
    product!: Product[];



    @OneToMany(type => Login, (login) => login.room, { onDelete: "CASCADE" })
    room!: ChatRoom[];

    @OneToMany(type => Complaints, (complaints) => complaints.login, { onDelete: "CASCADE" })
    complaints!: Complaints[];



    @OneToOne(type => Messages, (messages) => messages.login, { onDelete: "CASCADE" })
    messages!: Messages[]



}/*  */