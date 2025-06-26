import { DataSource } from "typeorm";
import { Login } from "../models/login.model";
import { Product } from "../models/product.model";
import { Image } from "../models/images.model";
import { Messages } from "../models/messages.model";
import { ChatRoom } from "../models/room.model";
import { Complaints } from "../models/complaints.model";
import { Promoted } from "../models/promoted.model";
import { Payments } from "../models/payments.model";
import { Promotion_packages } from "../models/adpackage.model";
import { Dp_image } from "../models/dp.model";

export const appDataSource = new DataSource({
  host: "84.54.23.87",
  type: "mysql",
  database: "Farmers_Ecommerce",
  username: "node_user",
  password: "NodePass123!",
  port: 3306,
  //logging: true,
  synchronize: true,
  entities: [
    Login,
    Product,
    Image,
    Messages,
    ChatRoom,
    Complaints,
    Promoted,
    Payments,
    Promotion_packages,
    Dp_image,
  ],
});
