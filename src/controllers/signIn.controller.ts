import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import { decryptPassword } from "../Utilities/functions/encrypt.function";
import jwt, { Secret } from "jsonwebtoken"





//getting all the user detail

export const getUser = (req: Request, res: Response) => {
    //@ts-ignore
    res.json({ user: req.user, authenticated: true })


}


//signing in a user

export const signIn = async (req: Request, res: Response) => {
    try {


        try {
            const User = await appDataSource.createQueryBuilder()
                .select()
                .from(Login, 'login')
                .where("login.login_email=:email", { email: req.body.login_email })
                .execute()


            const new_user = User[0];

            if (User.length != 0) {
                if (await decryptPassword(req.body.login_password, new_user.login_password)) {

                    const accessToken = jwt.sign({
                        id: new_user.login_id,
                        name: new_user.login_username,
                        address: new_user.login_location,
                        email: new_user.login_email,
                        role: new_user.login_role,
                        contact: new_user.login_contact
                    }, "i hve a secret", { expiresIn: "1h" })



                    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: false }).json({
                        authenticated: true, msg: "login successfull"
                    })



                }
                else {
                    res.json({ authenticated: false, msg: "Unable to authenticate  user ,wrong password " })

                }


            }
            else {
                res.json({ authenticated: false, msg: "Unable to authenticate  user ,user does not exist " })

            }

            // res.json({ created: true, msg: "User authenticated  Successfully" })

        } catch (error) {
            res.json({ created: false, msg: "Unable to authenticate  user ,user valid email " })


        }



    } catch (error) {
        res.json({ msg: "ubable to login" })

    }




}

//signing out a user 


export const signOut = (req: Request, res: Response) => {
    res.cookie("accessToken", "").send("successfully logged out")




}