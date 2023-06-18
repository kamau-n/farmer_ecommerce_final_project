import express, { response } from "express"


const app = express()

import bodyParser from "body-parser";


import { appDataSource } from "./connection/configuration"
import authRouter from "./routes/auth.routes";
import cors from "cors"
import cookieParser from "cookie-parser";

import productRouter from "./routes/products.routes";
// import commentRouter from "./Routes/comments.routes";
// import userRouter from "./Routes/user.routes";
// import mailRouter from "./Routes/mailer.routes"
// import activateRouter from "./Routes/activator.routes";



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
app.use("/", authRouter, productRouter)





appDataSource.initialize()
  .then(() => { console.log("the connection has been established") })
  .catch((err: any) => {
    console.log("there was a problem in the connection" + err)
    response.json({ mg: "unable to connect to server" })
  })







try {
  app.listen(8000, () => {
    console.log("we have been connectefd to a port")
  })

}
catch (err) {
  response.json({ msg: "internal server error" })
  console.log(err)

}