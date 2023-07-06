import { Request, Response } from "express";
import fs from "fs"
import { appDataSource } from "../connection/configuration";
import { Image } from "../models/images.model";

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

export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await appDataSource.getRepository(Image).find({})
        res.send(images)

    } catch (error) {
        console.log(error)
        res.send([])

    }

}