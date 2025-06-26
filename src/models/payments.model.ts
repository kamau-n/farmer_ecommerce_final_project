import { type } from "os";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Login } from "./login.model";
import { Product } from "./product.model";
import { Promoted } from "./promoted.model";

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  payment_id!: string;

  @CreateDateColumn()
  payment_date!: Date;

  @Column({ type: "varchar", length: 255, unique: true })
  payment_ref!: string;

  @Column({ nullable: false })
  payment_promoted_id!: string;

  @Column({ nullable: false })
  payment_login_id!: string;

  @Column({ nullable: false })
  payment_product_id!: string;

  @Column("bigint")
  payment_amount!: string;

  @Column("text")
  payment_option!: string;

  @Column("text")
  payment_status!: string;

  @ManyToOne((type) => Product, (product) => product.payments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "payment_product_id" })
  product!: Product;

  @ManyToOne((type) => Promoted, (promoted) => promoted.payments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "payment_promoted_id" })
  promoted!: Promoted;

  @ManyToOne((type) => Login, (login) => login.payments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "payment_login_id" })
  login!: Login;
}
