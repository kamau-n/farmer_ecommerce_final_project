import { Request, Response } from "express"
import { appDataSource } from "../connection/configuration"
import { ChatRoom } from "../models/room.model"
import { io } from "../app"
import { Messages } from "../models/messages.model"


export const createRoom = async (req: Request, res: Response) => {
    const roomRepo = appDataSource.getRepository(ChatRoom)
    console.log(req.body)

    try {

        const room_object = req.body;
        //@ts-ignore
        room_object['room_chat_sender'] = req.user.id

        //@ts-ignore
        room_object["room_chat_sender_name"] = req.user.name
        room_object["room_chat_receiver_name"] = req.body.room_chat_receiver_name
        room_object["room_chat_receiver"] - req.body.room_chat_receiver
        console.log(room_object)
        const roomCreated = await roomRepo.save(room_object)

        res.json(roomCreated.room_id)

    } catch (error) {
        console.log(error)
        res.send("unable to create a room")

    }


}




//fetch chats



export const fetchChats = async (req: Request, res: Response) => {
    const chatRepo = appDataSource.getRepository(Messages)
    console.log(req.body)
    try {
        const chats = await chatRepo.find({
            where: {
                message_room_id: req.body.room_id
            }
        })
        res.send(chats)

    } catch (error) {
        res.send([])
        console.log(error)

    }



}


export const getChatRoom = async (req: Request, res: Response) => {
    try {
        const rooms = await appDataSource.getRepository(ChatRoom).find({
            where: [
                //@ts-ignore
                { room_chat_receiver: req.user.id }, { room_chat_sender: req.user.id }

            ]

        })

        res.send(rooms)


    } catch (error) {
        res.send([])
        console.log(error)

    }

}


export const mediaUpload = (req: Request, res: Response) => {

    console.log("Am uploading a message file")
    res.send(req.file)
}

// export const createChats = (req: Request, res: Response) => {

//     const room_id: string = req.body.room_id;
//     io.on("connection", (socket) => {
//         socket.on("join_chat", (data) => {
//             socket.join(data)
//             console.log("joining room")
//         })

//         socket.on("Send", (data) => {
//             console.log("sending Messages")
//             socket.to(data.room).emit("Received", data)
//         })
//     })





// }

// a router for deleting a conversion


export const deleteConversation = async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        const deleted = await appDataSource.createQueryBuilder()
            .delete()
            .from(Messages)
            .where("message_room_id =:room_id", { room_id: req.body.room_id })
            .execute()


        deleted.affected! < 1 ? res.json({ msg: "unable to delete conversation", deleted: false }) : res.json({ msg: " delete conversation successfully", deleted: true })

    } catch (error) {
        console.log(error)


    }
}