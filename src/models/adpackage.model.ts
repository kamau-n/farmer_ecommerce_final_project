import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Promoted } from "./promoted.model";

@Entity()
export class Promotion_packages {
    @PrimaryGeneratedColumn()
    package_id!: string;

    @Column()
    package_name!: string;

    @Column()
    package_price!: string;





    @OneToOne(type => Promotion_packages, (promotion_packages) => promotion_packages.promoted, { onDelete: "CASCADE" })
    promoted!: Promoted

}