import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import { encryptPassword } from "../Utilities/functions/encrypt.function";



export const signUp = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const hashed_password: string = await encryptPassword(req.body.login_password)

        const new_user = {
            login_email: req.body.login_email,
            login_role: req.body.login_role,
            login_contact: req.body.login_contact,
            login_location: req.body.login_location,
            login_password: hashed_password,
            login_username: req.body.login_username,

        }


        try {
            const User = appDataSource.getRepository(Login)

            await User.save(new_user)

            res.json({ created: true, msg: "User Created Successfully" })

        } catch (error) {
            res.json({ created: false, msg: "Unable to create user ,user valid email " })
            console.log(error, error)


        }



    } catch (error) {
        res.json({ msg: "ubable to Register" })

    }




}


