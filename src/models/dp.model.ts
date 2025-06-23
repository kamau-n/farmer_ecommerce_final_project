import { type } from "os";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";

@Entity()
export class Dp_image {
    @PrimaryGeneratedColumn()
    dp_id!: string;

    @Column()
    dp_url!: string;

    @Column()
    dp_login_id!: string;


    @ManyToOne(type => Login, (login) => login.dp_image, { onDelete: "CASCADE" })
    @JoinColumn({ name: "dp_login_id" })
    login!: Login;



}