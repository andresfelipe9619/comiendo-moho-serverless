import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const prod = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root", // review
  password: "Capachino31$", // review
  database: "development",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
  // Production Mode
  ...(prod && {
    database: "production",
    logging: false,
    // synchronize: false,
    extra: {
      socketPath: "/cloudsql/comiendo-moho:us-central1:comiendo-moho",
    },
  }),
});
