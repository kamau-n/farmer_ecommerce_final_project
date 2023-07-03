import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken"

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        console.log("there is no user")
        res.status(200).json({ msg: "unauthorized access", authenticated: false })

    }
    else {
        console.log("Trying to authenticate a user")
        console.log("there is a user logged in")
        const decode = jwt.verify(accessToken || refreshToken, "i hve a secret")
        //@ts-ignore
        if (decode && decode.role == "Admin") {
            // @ts-ignore
            req.user = decode
            console.log(decode)
            next()

        }

        else {
            res.status(200).json({ msg: "unauthorized access", authenticated: false })
            console.log("you are not and admin")
        }

    }

}

