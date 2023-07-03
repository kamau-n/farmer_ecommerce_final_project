import { type } from "os";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { Room } from "./room.model";


@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    message_id!: number

    @Column({ type: "text" })
    message_content!: string

    @Column()
    message_room_id!: string

    @Column()
    message_sender_id!: string

    @CreateDateColumn()
    message_time!: Date

    @Column({ nullable: true })
    message_sender_name!: string



    @ManyToOne(type => Login, (login) => login.messages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "message_sender_id" })
    login!: Login[];

    @ManyToOne(type => Room, (room) => room.messages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "message_room_id" })
    room!: Room;



}