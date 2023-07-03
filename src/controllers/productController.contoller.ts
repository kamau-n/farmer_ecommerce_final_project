import { Request, Response, query } from "express";
import { appDataSource } from "../connection/configuration";
import { Product } from "../models/product.model";

import multer from "multer";
import { Image } from "../models/images.model";








export const uploadProduct = async (req: Request, res: Response) => {

    console.log(req.body)

    try {
        //@ts-ignore
        const product_login_id = req.user.id;
        //@ts-ignore


        const insert_object = req.body;
        //@ts-ignore
        insert_object['product_login_id'] = req.user.id
        console.log(insert_object)

        const product = await appDataSource.createQueryBuilder()
            .insert()
            .into(Product)
            .values(insert_object)
            .execute()

        const new_product_id = product.identifiers[0].product_id
        res.json({ msg: "product uploaded successfully", created: true, new_product_id: new_product_id })
        //@ts-ignore

        //console.log(new_product_id[0].product_id)
    }
    catch (err) {
        res.json({ msg: "unable to upload a new Product", created: false })
        console.log(err)
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
                image: true,
                login: true

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
        const products = await productsRepo.find({
            relations: {
                image: true,
                login: true
            }
        }

        );
        res.send(products)
    } catch (error) {
        res.send([])

    }



}


// a controller for getting products by userId

export const userById = async (req: Request, res: Response) => {
    console.log(req.body)
    try {

        const productRepo = await appDataSource.getRepository(Product)
            .find({
                where: {
                    product_login_id: req.body.user_id
                },
                relations: {
                    login: true,
                    image: true
                }

            })


        res.send(productRepo)


    } catch (error) {
        console.log(error)
        res.send([])

    }

}



// this is a controller for deleting a product

export const deleteProduct = async (req: Request, res: Response) => {
    console.log(req.body)



    try {
        const productRepo = await appDataSource.createQueryBuilder()
            .delete()
            .from(Product)
            .where("product_id=:id", { id: req.body.delete_id })
            .execute()


        res.json({ deleted: true, msg: "Product Deleted Successfully" })
    }
    catch (err) {

        res.json({ deleted: false, msg: "Unable to delele Product" })

    }

}

// this is  a controller for uploading images

export const imageUpload = async (req: Request, res: Response) => {

    //@ts-ignore
    //  console.log(req.files)
    // console.log((req.body))

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



// this is a controller for searching products by category

export const productCategory = async (req: Request, res: Response) => {
    const productsRepo = appDataSource.getRepository(Product)

    try {
        const products = await productsRepo.find({
            where: {
                product_category: req.body.category
            },
            relations: {
                image: true
            }
        }

        );
        res.send(products)
        //console.log(products)
    } catch (error) {
        res.send([])

    }


}


// this is a controller for getting product by user id

export const getUserProducts = async (req: Request, res: Response) => {

    console.log("getting user data by their id ......")
    console.log("user id gotten from client is  : " + req.body.user_id)
    const productsRepo = appDataSource.getRepository(Product)
    try {
        const products = await productsRepo.find({
            where: {
                //@ts-ignore
                product_login_id: req.user.id
            },
            relations: {
                image: true,
                login: true
            }
        })
        res.send(products)
    }
    catch (error) {
        console.log(error)
        res.send([])
    }
}