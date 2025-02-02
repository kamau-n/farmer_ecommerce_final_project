import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken"

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {

        res.status(200).json({ msg: "unauthorized access", authenticated: false })

    }
    else {

        const decode = jwt.verify(accessToken || refreshToken, "i hve a secret")
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

