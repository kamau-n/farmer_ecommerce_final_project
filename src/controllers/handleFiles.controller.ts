import { Request, Response } from "express";
import fs from "fs"

export const deleteFiles = (req: Request, res: Response) => {

    console.log(req.body)

    const url = req.body.url;

    try {
        fs.unlink(url, (err) => {
            if (err) {
                res.send("unable to delete File")
            }
            res.send("File deleted Successfully")
        })


    } catch (error) {
        res.send("Unable to delete File")
        console.log(error)

    }

} 