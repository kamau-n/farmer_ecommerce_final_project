import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import { decryptPassword } from "../Utilities/functions/encrypt.function";
import jwt, { Secret } from "jsonwebtoken"
import { Dp_image } from "../models/dp.model";





//getting all the user detail

export const getUser = (req: Request, res: Response) => {
    //@ts-ignore
    res.json({ user: req.user, authenticated: true })


}


//signing in a user

export const signIn = async (req: Request, res: Response) => {



    try {

        const User = await appDataSource.getRepository(Login).findOne({
            where: {
                login_email: req.body.login_email
            },
            relations: {
                dp_image: true
            }
        })



        console.log(User)

        if (User && User.login_email.length > 0) {
            if (await decryptPassword(req.body.login_password, User!.login_password)) {
                console.log("authentication successfull")

                const accessToken = jwt.sign({
                    id: User.login_id,
                    name: User.login_username,
                    address: User.login_location,
                    email: User.login_email,
                    role: User.login_role,
                    contact: User.login_contact,
                    dp: User.dp_image[0] ? User.dp_image[0].dp_url : " "
                }, "i hve a secret", { expiresIn: "1h" })

                const refreshToken = jwt.sign({
                    id: User.login_id,
                    name: User.login_username,
                    address: User.login_location,
                    email: User.login_email,
                    role: User.login_role,
                    contact: User.login_contact,
                    dp: User.dp_image[0] ? User.dp_image[0].dp_url : " "
                }, "i hve a secret", { expiresIn: "1y" })

                console.log("am setting the ccookie")


                res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: false }).cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 * 12, httpOnly: true, secure: false }).json({
                    authenticated: true, msg: "login successfull", role: User!.login_role
                })



            }
            else {
                res.json({ authenticated: false, msg: "Unable to authenticate  user ,wrong password " })
                console.log("wrong password")

            }


        }
        else {
            res.json({ authenticated: false, msg: "Unable to authenticate  user ,user does not exist " })

        }

        // res.json({ created: true, msg: "User authenticated  Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ created: false, msg: "Unable to authenticate  user ,user valid email " })


    }








}

//signing out a user 


export const signOut = (req: Request, res: Response) => {
    res.cookie("accessToken", "").cookie("refreshToken", "").send("successfully logged out")




}