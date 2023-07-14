import { DataSource } from "typeorm";
import { Login } from "../models/login.model";
import { Product } from "../models/product.model";
import { Image } from "../models/images.model";
import { Messages } from "../models/messages.model";
import { ChatRoom } from "../models/room.model";
import { Complaints } from "../models/complaints.model";
import { Promoted } from "../models/promoted.model";


export const appDataSource = new DataSource({
    type: "mysql",
    database: "Farmers_Ecommerce",
    username: "root",
    password: "",
    logging: false,
    synchronize: true,
    entities: [Login, Product, Image, Messages, ChatRoom, Complaints, Promoted]



})