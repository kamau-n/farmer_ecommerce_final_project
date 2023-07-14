import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { Image } from "./images.model";

import { Promoted } from "./promoted.model";

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

    @Column({ nullable: false })
    product_login_id!: string

    @Column({ nullable: true })
    product_location!: string;

    @Column({ nullable: true })
    product_promoted!: boolean;

    @CreateDateColumn({ nullable: true })
    product_posted_on!: Date






    @ManyToOne(type => Login, (login) => login.product, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'product_login_id' })
    login!: Login

    @OneToMany(type => Image, (image) => image.product, { onDelete: "CASCADE" })
    image!: Image[]


    @OneToOne(type => Promoted, (promoted) => promoted.product, { onDelete: "CASCADE" })
    promoted!: Promoted;





}