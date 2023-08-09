import { Request, Response } from "express"
import { appDataSource } from "../connection/configuration"
import { Complaints } from "../models/complaints.model"
import { Payments } from "../models/payments.model"
import { Promoted } from "../models/promoted.model"
import { getMoney } from "../Utilities/getMoney"


export const setComplaint = async (req: Request, res: Response) => {
    console.log("posting complaint")
    console.log(req.body)

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


    console.log("promoted product is ")
    console.log(promoted_product)
    console.log("request body")

    console.log(req.body)
    const new_payment = req.body
    //@ts-ignore
    new_payment.payment_amount = getMoney(promoted_product.promoted_product_package)
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


export const getPayments = async (req: Request, res: Response) => {
    console.log(req.query)



    //@ts-ignore
    if (req.user.role == "ADMIN" && req.query.id == null) {
        const all_payments = await appDataSource.getRepository(Payments).find({
            relations: {
                product: true,
                login: true
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









