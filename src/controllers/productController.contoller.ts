import { Request, Response, query } from "express";
import { appDataSource } from "../connection/configuration";
import { Product } from "../models/product.model";

import multer from "multer";
import { Image } from "../models/images.model";
import { Promoted } from "../models/promoted.model";

import exp from "constants";
import { deletesImage } from "../services/deleteImage";








//uploading a product
export const uploadProduct = async (req: Request, res: Response) => {

    console.log(req.body)

    try {
        //@ts-ignore
        const product_login_id = req.user.id;
        //@ts-ignore


        const insert_object = req.body;
        //@ts-ignore
        insert_object['product_login_id'] = req.user.id
        insert_object['product_promoted'] = false;
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



    try {
        const productRepo = await appDataSource.getRepository(Product)
            .findOne({
                where: {
                    product_id: req.params.id
                }
                , relations: {
                    image: true,
                    login: true
                }

            })
        //console.log(productRepo)

        productRepo == null ? res.send([]) : res.send(productRepo)


    } catch (error) {
        res.send([])

    }
}




//this is a controller for getting all the products



export const getProducts = async (req: Request, res: Response) => {

    const productsRepo = appDataSource.getRepository(Product)

    if (req.query.category == " " && req.query.region == '') {
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

    else if (req.query.region?.length == 0 && req.query.category !== " ") {

        try {
            const products = await productsRepo.find({
                //@ts-ignore
                where: {
                    product_category: req.query.category

                },
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

    else if (req.query.region != " " && req.query.category?.length == 0) {
        try {
            const products = await productsRepo.find({
                //@ts-ignore
                where: {
                    product_location: req.query.location

                },
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



    else {
        try {
            const products = await productsRepo.find({
                //@ts-ignore
                where: {
                    product_category: req.query.category,
                    product_location: req.query.region


                },
                relations: {
                    image: true,
                    login: true
                }

            }

            );
            console.log(products)

            res.send(products)
        } catch (error) {
            res.send([])

        }

    }



}


// a controller for getting products by userId

export const userById = async (req: Request, res: Response) => {

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


// a search for product querry 

// export const searchCategory = async (req: Request, res: Response) => {

//     if(req.query)

// }

// this is  a controller for uploading images

export const imageUpload = async (req: Request, res: Response) => {


    console.log(req.files)
    console.log((req.body))

    const imageRepo = appDataSource.getRepository(Image)

    if (!req.files) {
        res.json({ sg: "unable to uploads images", upload: false })
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


// a controller for deleting an image


export const deleteImage = async (req: Request, res: Response) => {
    console.log("deleting image")
    console.log(req.body)
    try {

        const delele_image = await appDataSource.createQueryBuilder()
            .delete()
            .from(Image, "image")
            .where("image_id =:id", { id: req.body.delete_id })
            .execute()


        console.log(delele_image)
        delele_image.affected! > 0
            ? res.json({ msg: "Image deleted Successfully", deleted: true }) : res.status(200).json({ msg: "Unable to delete the image", deleted: false })
    } catch (error) {
        console.log(error)
        res.status(200).json({ msg: "Unable to delete the image", deleted: false })

    }
}


// a controller for promoting a product


export const promoteProduct = async (req: Request, res: Response) => {



    try {

        const new_promoted = req.body;
        //@ts-ignore

        new_promoted["promoted_product_status"] = "not approved";

        const create_new_promoted_product = await appDataSource.getRepository(Promoted).save(new_promoted)
        res.json({ msg: " Product submitted for Promotion  Successfully", promoted: true })


    } catch (error) {
        console.log(error)
        res.json({ msg: "unable to promote Product, Try again", promoted: false })

    }

}

// router for getting all the  promoted products


export const promotedProduct = async (req: Request, res: Response) => {

    try {


        const products = await appDataSource.getRepository(Product)
            .find({
                where: {
                    product_promoted: true
                },
                relations: {
                    image: true,

                }
            })

        res.send(products)


    } catch (error) {
        console.log(error)
        res.send([])

    }

}

// route for changing the status of an promoted products
export const productPromotedUpdate = async (req: Request, res: Response) => {
    console.log(req.query)



    if (req.query.promoted_id == null || req.query.new_state == null || req.query.product_id == null) {
        res.json({ msg: "approval Failed ,Product Not Found", approved: false })

    }
    else {

        //  res.send(req.query.promoted_id)
        try {
            const promoted = await appDataSource.createQueryBuilder()
                .update(Promoted)
                .set({ promoted_product_status: req.query.new_state })
                .where("promoted_id =:promoted_id", { promoted_id: req.query.promoted_id })
                .execute()

            console.log(promoted)

            if (promoted.affected! > 0 && req.query.new_state == "revoked") {
                console.log("revoked a promoted column")
                const update_product = await appDataSource.createQueryBuilder()
                    .update(Product)
                    .set({ product_promoted: false })
                    .where("product_id = :product_id", { product_id: req.query.product_id })
                    .execute()

                console.log(update_product)

                // @ts-ignore
                update_product.affected > 0 ? res.json({ msg: "Revoked Successfully", approved: true }) : res.json({ msg: "approval failed", approved: false })
            }
            else if (promoted.affected! > 0 && req.query.new_state == "approved") {
                console.log("approved a promoted column")
                const update_product = await appDataSource.createQueryBuilder()
                    .update(Product)
                    .set({ product_promoted: true })
                    .where("product_id = :product_id", { product_id: req.query.product_id })
                    .execute()

                console.log(update_product)



                // @ts-ignore
                update_product.affected > 0 ? res.json({ msg: "Approved Successfully", approved: true }) : res.json({ msg: "approval failed", approved: false })
            }
            else {
                res.json({ msg: "approval failed", approved: false })

            }







        }




        catch (error) {
            console.log(error)
            res.json({ msg: "approval Failed", approved: false })

        }
    }

}




// a route for deleting a promoted product

export const productPromotedDelete = async (req: Request, res: Response) => {
    try {
        const promoted = await appDataSource.createQueryBuilder()

            .delete()
            .from(Promoted)

            .where("promoted_id =:promoted_id", { promoted_id: req.body.promoted_id })
            .execute()

        console.log(promoted)

        if (promoted.affected! > 0) {
            console.log("deleted a promoted column")
            const update_product = await appDataSource.createQueryBuilder()
                .update(Product)
                .set({ product_promoted: false })
                .where("product_id = :product_id", { product_id: req.body.product_id })
                .execute()

            console.log(update_product)

            // @ts-ignore
            update_product.affected > 0 ? res.json({ msg: "Deleted Successfully", delete: true }) : res.json({ msg: "Delete failed", delete: false })
        }
        else {
            res.json({ msg: "revoked failed", delete: false })

        }








    }
    catch (err) {
        console.log(err)

        res.json({ msg: "revoked failed", revoked: false })

    }

}



// this is a controller for searching products by category

export const productCategory = async (req: Request, res: Response) => {

    const productsRepo = appDataSource.getRepository(Product)
    if (req.query.category == null) {
        res.send([])
    }
    else {

        try {
            const products = await productsRepo.find({
                //@ts-ignore
                where: {
                    product_category: req.query.category
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


}


// this is a controller for getting product by user id

export const getUserProducts = async (req: Request, res: Response) => {

    // console.log("getting user data by their id ......")
    // console.log("user id gotten from client is  : " + req.body.user_id)
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
        res.send(error)
    }
}



// route for getting all the promoted products


export const promotedProducts = async (req: Request, res: Response,) => {
    try {
        const promoted_products = await appDataSource.getRepository(Promoted).find({
            relations: {
                product: true,

            },


        })

        res.send(promoted_products)

    } catch (error) {
        console.log(error)
        res.send([])

    }

}

// a controller for updating a product 
export const productUpdate = async (req: Request, res: Response) => {

    const updated_product = req.body;

    try {
        const product = await appDataSource.getRepository(Product).find({
            where: {
                product_id: req.body.id
            }
        })


        if (updated_product.name == "") {
            //@ts-ignore
            updated_product.name = product.product_name

        }
        if (updated_product.unitPrice == "") {
            //@ts-ignore
            updated_product.name = product.product_price_unit

        }
        if (updated_product.location == "") {
            //@ts-ignore
            updated_product.location = product.product_location

        }
        if (updated_product.quantity == "") {
            //@ts-ignore
            updated_product.quantity = product.product_quantity

        }
        if (updated_product.price == '') {
            //@ts-ignore
            updated_product.price = product.product_price

        }


        console.log(updated_product)



        const update_product = await appDataSource.createQueryBuilder()
            .update(Product)
            .set({ product_name: updated_product!.name, product_location: updated_product!.location, product_quantity: updated_product!.quantity, product_price: updated_product!.price })
            .where("product_id =:id", { id: updated_product!.id })
            .execute()

        update_product.affected! > 0 ? res.json({ msg: "Update Successful", updated: true }) : res.json({ msg: "update failed", updated: false })
    } catch (error) {
        console.log(error)
        res.json({ msg: "update failed", updated: false })

    }

}


// geting a user promoted products

export const getUserPromoted = async (req: Request, res: Response) => {
    try {
        const products = await appDataSource.getRepository(Product)
            .find({
                where: {
                    product_login_id: req.params.id,
                    product_promoted: true
                }
                , relations: {
                    image: true,
                    login: true,
                }

            })
        products == null ? res.send([]) : res.send(products)
    } catch (error) {
        res.send([])
        console.log(error)

    }

}


// geting a user non promoted products
export const getUserNonPromoted = async (req: Request, res: Response) => {
    console.log("we are getting non promoted items")
    console.log(req.params)
    try {
        const products = await appDataSource.getRepository(Product)
            .find({
                where: {

                    product_login_id: req.params.id,
                    product_promoted: false
                }
                , relations: {
                    image: true,
                    login: true,
                }

            })
        products == null ? res.send([]) : res.send(products)
    } catch (error) {
        res.send([])
        console.log(error)

    }

}
