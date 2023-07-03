import express, { response } from "express"


import bodyParser from "body-parser";
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { appDataSource } from "./connection/configuration"
import authRouter from "./routes/auth.routes";
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser";


import productRouter from "./routes/products.routes";
import fileRouter from "./routes/files.auth";
import chatRouter from "./routes/chat.routes";
import { Messages } from "./models/messages.model";
import userRouter from "./routes/users.routes";
import otherRouters from "./routes/others.routes";
// import commentRouter from "./Routes/comments.routes";
// import userRouter from "./Routes/user.routes";
// import mailRouter from "./Routes/mailer.routes"
// import activateRouter from "./Routes/activator.routes";


const app = express()


const server = http.createServer(app);
export const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});



const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "DELETE"],
  credentials: true,

}
  ;
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))



app.use(express.json())
app.use("/", authRouter, productRouter, fileRouter, chatRouter, userRouter, otherRouters)





appDataSource.initialize()
  .then(() => { console.log("the connection has been established") })
  .catch((err: any) => {
    console.log("there was a problem in the connection" + err)
    response.json({ mg: "unable to connect to server" })
  })





io.on('connection', (socket) => {
  console.log("connection established : " + socket.id);




  socket.on("join_chat", (data) => {
    console.log("joining chat " + data)

    socket.join(data)
    console.log("joining room  : " + data)



  })




  socket.on("Send", async (data) => {
    await appDataSource.getRepository(Messages).save(data)
    console.log(data.message_room_id)
    const messages = await appDataSource.getRepository(Messages).find({
      where: {
        message_room_id: data.message_room_id
      }
    })


    socket.to(data.message_room_id).emit("Received", messages)

  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Add more event handlers here as needed
})








try {
  server.listen(8000, () => {
    console.log("we have been connectefd to a port")
  })

}
catch (err) {
  response.json({ msg: "internal server error" })
  console.log(err)

}