import express from "express";
// import { users } from "./users.js";
// import fs from "fs";
import { config } from "./config/env.js";
import { createUserTable } from "./user/user.model.js";
import { AccountTable } from "./account/account.model.js";
import { signup } from './user/user.controller.js';
import { getUsers } from './user/user.controller'
import { getUserById } from './user/user.controller.js';
import { deleteUserById } from './user/user.controller.js';


const app = express();
app.use(express.json());


app.get("/getUsers", getUsers);
app.get("/getUserById/:id", getUserById);
app.post("/signup", signup);
app.delete("/deleteUserById", deleteUserById);



app.listen(config.port, () => {
     createUserTable();
     AccountTable();
    console.log(`server is running on port ${config.port}`);

});