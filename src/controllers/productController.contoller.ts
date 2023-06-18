import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Product } from "../models/product.model";

import multer from "multer";
import { Image } from "../models/images.model";








export const uploadProduct = async (req: Request, res: Response) => {

    console.log(req.body)

    try {

        const product = await appDataSource.createQueryBuilder()
            .insert()
            .into(Product)
            .values(req.body)
            .execute()

        res.json({ msg: "product uploaded successfully", created: true })
    }
    catch (err) {
        res.json({ msg: "unable to upload a new Product", created: false })
    }


}

// this is a controller for getting products by the id

export const getProductById = async (req: Request, res: Response) => {

    console.log(req.body)


    try {
        const productRepo = appDataSource.getRepository(Product)

        const product = await productRepo.find({
            where: {
                product_id: req.body.id
            }, relations: {
                image: true

            }
        })





        res.send(product)

    } catch (error) {
        res.send([])

    }

}


//this is a controller for getting all the products





export const getProducts = async (req: Request, res: Response) => {

    const productsRepo = appDataSource.getRepository(Product)

    try {
        const products = await productsRepo.find();
        res.send(products)
    } catch (error) {
        res.send([])

    }



}


// this is  a controller for uploading images

export const imageUpload = async (req: Request, res: Response) => {

    console.log(req.body.image_product_id)
    const imageRepo = appDataSource.getRepository(Image)

    if (!req.files) {
        res.send("unable to uploads images")
    }
    else {


        const length = req.files.length;

        //@ts-ignore
        for (let i = 0; i < length; i++) {
            //@ts-ignore
            const image_url = (req.files[i].filename)

            imageRepo.save({ image_url: image_url, image_product_id: req.body.image_product_id })







        }
        res.json({ msg: "successfully uploaded", uploaded: true })

    }


}