
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";

@Entity()
export class Promoted {
    @PrimaryGeneratedColumn()
    promoted_id!: string

    @Column()
    promoted_product_id!: string;

    @Column()
    promoted_product_status!: string;


    @OneToOne(type => Product, (product) => product.promoted, { onDelete: "CASCADE" })
    @JoinColumn({ name: "promoted_product_id" })
    product!: Product;

}