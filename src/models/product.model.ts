import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { Image } from "./images.model";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    product_id!: string

    @Column()
    product_name!: string;

    @Column()
    product_quantity!: string;
    @Column()
    product_decription!: string;

    @Column()
    product_price!: string

    @Column()
    product_category!: string




    @ManyToOne(type => Login, (login) => login.product, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'product_login_id' })
    login!: Login

    @OneToMany(type => Image, (image) => image.product, { onDelete: "CASCADE" })
    image!: Image[]





}