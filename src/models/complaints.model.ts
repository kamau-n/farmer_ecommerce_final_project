import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";

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

    @Column("text")
    complaint_email!: string



    // @ManyToOne(type => Login, (login) => login.complaints, { onDelete: "CASCADE" })
    // @JoinColumn({ name: 'complaint_login_id' })
    // login!: Login




}