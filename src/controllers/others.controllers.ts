import { Request, Response } from "express"
import { appDataSource } from "../connection/configuration"
import { Complaints } from "../models/complaints.model"


export const setComplaint = async (req: Request, res: Response) => {
    console.log("posting complaint")
    console.log(req.body)
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