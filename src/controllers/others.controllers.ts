import { Request, Response } from "express"
import { appDataSource } from "../connection/configuration"
import { Complaints } from "../models/complaints.model"
import { Payments } from "../models/payments.model"
import { Promoted } from "../models/promoted.model"
import { getMoney } from "../Utilities/getMoney"
import { Promotion_packages } from "../models/adpackage.model"


export const setComplaint = async (req: Request, res: Response) => {

    //@ts-ignore  


    try {

        const save_message = await appDataSource.getRepository(Complaints).save(req.body)
        res.json({ msg: " Message/complaint post successfully", posted: true })




    } catch (error) {
        console.log(error)

        res.json({ msg: "unable to post message/complaint", posted: false })

    }

}

export const getComplaints = async (req: Request, res: Response) => {
    try {
        const results = await appDataSource.getRepository(Complaints).find()
        res.send(results)

    } catch (error) {
        res.send([])

    }

}


export const addPayment = async (req: Request, res: Response) => {

    const promoted_product = await appDataSource.getRepository(Promoted).findOne({
        where: {
            promoted_id: req.body.payment_promoted_id
        }
    })



    const new_payment = req.body
    //@ts-ignore
    new_payment.payment_amount = await getMoney(promoted_product.promoted_product_package_id)
    //@ts-ignore
    new_payment.payment_option = promoted_product.promoted_product_payment_option
    console.log("new payment is")
    console.log(new_payment)
    try {
        const set_payment = await appDataSource.getRepository(Payments).save(new_payment)
        set_payment != null ? res.json({
            payment_set: true,
            msg: "payment set successfully,Product Promoted Successfully"
        }) : res.json({
            payment_set: false,
            msg: "unable to set payment"
        })

    } catch (error) {
        console.log(Error)
        res.json({
            payment_set: false,
            msg: "unable to set Payment"
        })

    }
}



//get a user's payments
export const getPayments = async (req: Request, res: Response) => {
    console.log(req.query)

    //@ts-ignore
    if (req.user.role == "ADMIN" && req.query.id == null) {
        const all_payments = await appDataSource.getRepository(Payments).find({
            relations: {
                product: true,
                login: true,


            }
        });

        res.send(all_payments)
    }

    //@ts-ignore
    else if (req.query.id != null) {

        try {
            const receipts = await appDataSource.getRepository(Payments).find({
                //@ts-ignore
                where: {
                    payment_login_id: req.query.id

                }
                , relations: {
                    product: true,
                    login: true

                }
            })

            res.send(receipts)

        } catch (error) {
            console.log(error)
            res.send([])
        }
    }
    else {
        res.send([])
    }
}



//creating a  new package

export const createPackage = async (req: Request, res: Response) => {
    try {
        const created = await appDataSource.getRepository(Promotion_packages).save(req.body)
        created != null ? res.status(201).json({ msg: "package added successfully", created: true }) : res.status(200).json({ msg: "package not added successfully", created: false })
    }
    catch (err) {
        console.log(err)
        res.status(201).json({ msg: "package not added ", created: false })
    }

}


// fetching all the promotional packages

export const getPackages = async (req: Request, res: Response) => {
    const packages = await appDataSource.getRepository(Promotion_packages).find({})
    res.send(packages)

}


// delete a package 

export const deletePackage = async (req: Request, res: Response) => {
    try {
        const deleted_package = await appDataSource.createQueryBuilder()
            .delete()
            .from(Promotion_packages)
            .where("package_id = :id", { id: req.body.id })
            .execute()

        deleted_package.affected! > 0 ? res.json({ msg: "deleted package successfully", delete: true }) : res.json({ msg: "unable to delete package", delete: false })


    }
    catch (err) {
        res.json({ msg: "unable to delete package", delete: false })
    }
}



//update package
export const editPackages = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const package_data = await appDataSource.getRepository(Promotion_packages).findOne({
            where: {
                package_id: req.body.id
            }
        })
        console.log(package_data)

        const old_data = req.body;

        if (package_data != null) {

            if (old_data.price.length == 0) {


                old_data.price = package_data.package_price

            }

            if (old_data.name.length == 0) {



                old_data.name = package_data.package_name

            }

            console.log("updated old data")
            console.log(old_data)
            const package_update = await appDataSource.createQueryBuilder()
                .update(Promotion_packages)
                //@ts-ignore
                .set({ package_name: old_data.name, package_price: old_data.price })
                .where("package_id =:id", { id: req.body.id })
                .execute()


            package_update.affected! > 0 ? res.json({ msg: " update was successfull", update: true }) : res.json({ msg: "unable to update", update: false })





        }
        else {
            res.json({ msg: "unable to update", update: false })

        }




    }
    catch (err) {
        console.log(err)
        res.json({ msg: "unable to update", update: false })
    }

}








