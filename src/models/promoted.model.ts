
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";
import { Payments } from "./payments.model";

@Entity()
export class Promoted {
    @PrimaryGeneratedColumn()
    promoted_id!: string

    @Column()
    promoted_product_id!: string;

    @Column()
    promoted_product_status!: string;

    @Column()
    promoted_product_package!: string;

    @Column()
    promoted_product_payment_option!: string;


    @OneToOne(type => Product, (product) => product.promoted, { onDelete: "CASCADE" })
    @JoinColumn({ name: "promoted_product_id" })
    product!: Product;


    @OneToMany(type => Payments, (payments) => payments.promoted, { onDelete: "CASCADE" })
    payments!: Payments;


}