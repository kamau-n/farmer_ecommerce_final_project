import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { IsEmail } from "class-validator";

@Entity()
export class Complaints {
    @PrimaryGeneratedColumn()
    complaint_id!: string

    @Column("text")
    complaint_message!: string

    @CreateDateColumn()
    complaint_date!: Date

    @Column("text")
    complaint_name!: string

    @Column({ nullable: false })
    complaint_login_id!: string

    @Column("text")
    @IsEmail()

    complaint_email!: string



    @ManyToOne(type => Login, (login) => login.complaints, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'complaint_login_id' })
    login!: Login




}