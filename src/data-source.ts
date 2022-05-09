import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "9292455z",
    database: "good",
    entities: [User],
    logging: true,
    synchronize: true,
})
