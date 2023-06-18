import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    image_id!: string


    @Column()
    image_url!: string;

    @Column({ nullable: false })
    image_product_id!: string;



    @ManyToOne(type => Product, (product) => product.image, { onDelete: "CASCADE" })
    @JoinColumn({ name: "image_product_id" })
    product!: Product





}