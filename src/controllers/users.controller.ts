import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import assert from "assert";
import { encryptPassword } from "../Utilities/functions/encrypt.function";


export const getAllUSers = async (req: Request, res: Response) => {
    try {


        const users = await appDataSource.getRepository(Login).find();
        res.send(users)
    }
    catch (err) {
        res.send([])
    }


}


export const resetPassword = async (req: Request, res: Response) => {
    console.log("resetting password")
    console.log(req.body)
    try {
        const password_reset = await appDataSource.createQueryBuilder()
            .update(Login)
            .set({ login_password: await encryptPassword(req.body.reset_password) })
            .where("login_email =:reset_email", { reset_email: req.body.reset_email })
            .execute()

        password_reset.affected == 0 ? res.json({ msg: "unable to reset, check your email", reset: false }) :
            res.json({ msg: "password reset Sucessfully", reset: true })

    } catch (error) {
        console.log(error)
        res.json({ msg: "unable to reset password", reset: false })

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