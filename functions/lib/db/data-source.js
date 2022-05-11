"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.prod = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
exports.prod = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource(Object.assign({ type: "mysql", host: "127.0.0.1", port: 3306, username: "root", password: "Capachino31$", database: "development", synchronize: true, logging: true, entities: [User_1.User], migrations: [], subscribers: [] }, (exports.prod && {
    database: "production",
    logging: false,
    // synchronize: false,
    extra: {
        socketPath: "/cloudsql/comiendo-moho:us-central1:comiendo-moho",
    },
})));
//# sourceMappingURL=data-source.js.map