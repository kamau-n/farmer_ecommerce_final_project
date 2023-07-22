import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import assert from "assert";
import { encryptPassword } from "../Utilities/functions/encrypt.function";



//getting all Users

export const getAllUSers = async (req: Request, res: Response) => {
    console
        .log(req.query)

    if (req.query.role?.length == 0) {
        console.log("no roles supplied")
        try {
            const users = await appDataSource.getRepository(Login).find({});
            res.send(users)
        }
        catch (err) {
            res.send([])
        }

    }
    else if (req.query.role == 'All') {
        console.log("roles are all")
        try {
            const users = await appDataSource.getRepository(Login).find();
            res.send(users)
        }
        catch (err) {
            res.send([])
        }
    }
    else if (req.query.role == "Admin") {
        console.log("getting admins")
        try {
            const users = await appDataSource.getRepository(Login).find({
                where: {
                    login_role: "ADMIN"
                }
            });
            res.send(users)
        }
        catch (err) {
            res.send([])
        }
    }
    else if (req.query.role == "User") {
        try {
            const users = await appDataSource.getRepository(Login).find({
                where: {
                    login_role: "USER"
                }
            });
            res.send(users)
        }
        catch (err) {
            res.send([])
        }

    }



}


// updating user Details


export const updateUserDetails = async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        const updated_user = appDataSource.createQueryBuilder()
            .update(Login)
            .set({ login_contact: req.body.login_contact, login_username: req.body.login_username, login_location: req.body.login_location, login_email: req.body.login_email })
            .where("login_id =:id ", { id: req.body.login_id })
            .execute()
        res.send(updated_user)
    }
    catch (err) {
        console.log(err)
        res.json({ msg: "unable to update", update: false })
    }


}





// a controller for reseting a user password

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


// a controller for deleting a user
export const deleteUser = async (req: Request, res: Response) => {
    console.log("delete route accessed")
    console.log(req.body)
    try {
        const deleted = await appDataSource.createQueryBuilder()
            .delete()
            .from(Login)
            .where("login_id=:id", { id: req.body.delete_id })
            .execute()

        //@ts-ignore
        deleted.affected > 0 ? res.json({ msg: "user deleted successfully", deleted: true }) : res.json({ msg: "unable to delete the user", deleted: false })



    } catch (error) {

        console.log(error)
        res.json({ msg: "unable to delete the user", deleted: false })

    }

}

// a controller for making a user an admin
export const updateUser = async (req: Request, res: Response) => {
    console.log("update route accessed")
    console.log(req.body)
    try {
        const updates = await appDataSource.createQueryBuilder()
            .update(Login)
            .set({ login_role: "ADMIN" })
            .where("login_id=:id", { id: req.body.update_id })
            .execute()

        //@ts-ignore
        updates.affected > 0 ? res.json({ msg: "user updated successfully", update: true }) : res.json({ msg: "unable to update the user", updated: false })



    } catch (error) {

        console.log(error)
        res.json({ msg: "unable to update the user", update: false })

    }

}

