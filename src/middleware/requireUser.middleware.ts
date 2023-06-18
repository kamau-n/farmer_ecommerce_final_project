import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken"

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        console.log("there is no user")
        res.status(200).json({ msg: "unauthorized access", authenticated: false })

    }
    else {
        console.log(accessToken)
        console.log("there is a user")
        const decode = jwt.verify(accessToken, "i hve a secret")
        if (decode) {
            // @ts-ignore
            req.user = decode
            next()

        }

        else {
            res.status(200).json({ msg: "unauthorized access", authenticated: false })
        }

    }

}

