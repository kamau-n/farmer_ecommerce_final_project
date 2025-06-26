import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Login } from "./login.model";
import { Messages } from "./messages.model";

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  room_id!: string;

  @CreateDateColumn()
  room_created_date!: string;

  @Column()
  room_visibility!: string;

  @Column({ nullable: false })
  room_chat_sender!: string;

  @Column({ nullable: false })
  room_chat_receiver!: string;

  @Column({ nullable: false })
  room_chat_sender_name!: string;

  @Column("text", { nullable: true })
  room_chat_receiver_name!: string;

  @ManyToOne((type) => Login, (sender) => sender.room, { onDelete: "CASCADE" })
  @JoinColumn({ name: "room_chat_sender" })
  sender!: Login;

  @ManyToOne((type) => Login, (receiver) => receiver.room, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "room_chat_receiver" })
  receiver!: Login;

  @OneToMany((type) => Messages, (messages) => messages.room, {
    onDelete: "CASCADE",
  })
  messages!: Messages[];
}
