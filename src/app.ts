import  express from "express"
import { Request, Response } from "express"
import { User } from "./entity/User"
import { AppDataSource} from "./data-source"


AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


const app = express()
app.use(express.json())


app.get("/users", async function (req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    console.log(req.params.id)
    const UserID = parseInt(req.params.id)
    const results = await AppDataSource.getRepository(User).findOneBy({ id : UserID,})
    return res.send(results)

})

app.post("/users", async function (req: Request, res: Response) {
    const user = await AppDataSource.getRepository(User).create(req.body)
    const results = await AppDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const UserID = parseInt(req.params.id)
    const user = await AppDataSource.getRepository(User).findOneBy({ id : UserID, })
    AppDataSource.getRepository(User).merge(user, req.body)
    const results = await AppDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})


app.listen(3000)