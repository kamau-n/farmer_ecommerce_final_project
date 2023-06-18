import { type } from "os";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";


@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    message_id!: number

    @Column()
    message_content!: string

    @ManyToOne(type => Login, (login) => login.messages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sender_id" })
    login!: Login[];



}