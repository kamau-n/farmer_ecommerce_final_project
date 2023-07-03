import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import assert from "assert";


export const getAllUSers = async (req: Request, res: Response) => {
    try {


        const users = await appDataSource.getRepository(Login).find();
        res.send(users)
    }
    catch (err) {
        res.send([])
    }


}

export const deleteUser = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const deleted = await appDataSource.createQueryBuilder()
            .delete()
            .from(Login)
            .where("login_id=:id", { id: req.body.delete_id })
            .execute()

        res.json({ msg: "user deleted successfully", deleted: true })



    } catch (error) {

        console.log(error)
        res.json({ msg: "unable to delete the user", deleted: false })

    }

}