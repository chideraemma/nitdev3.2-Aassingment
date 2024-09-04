import express from "express";
import { users } from "./users.js";
import fs from "fs";


const app = express();

const port = 3200;

app.use(express.json());

// middleware code 

const logger = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (id < 1) {
        return res.status(400).json({ message: "id must be greater than 0" });
    }
    console.log("i am a middleware and i am greeting you");
    next();
};

// all routes 

app.get("/get-users", logger, (req, res) => {
    // res.send("Hello this is the home page");
    return res.json({
        message: "this are the users",
        data: users,
    });
});

// routes

app.get("/get-user/:id", (req, res) => {
    const { id } = req.params;

    console.log(req.params);

    // const user = users.fine((user) => user.id == parseInt(id));
    // console.log(user)

    res.json({
        message: "this is the user",
        // data: user,
    });
});

// middleware code
const validateEmail = (req, res, next) => {
    const email = req.body.email;

    const userExist = users.find((user) => user.email === email);

    if(userExist) {
        return res.status(409).json({
            message: "user with this email already exist"
        })
    }

    next();
}

// middleware code
const validateUsername = (req, res, next) => {
    const username = req.body.username;

    const userExist = users.find((user) => user.username === username);

    if(userExist) {
        return res.status(409).json({
            message: "user with this username already exist"
        })
    }

    next();
}

// middleware code

const validatePassword = (req, res, next) => {
    const password = req.body.password;

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if(!passwordValid.test(password)) {
        return res.status(401).json({
            message: "user email password is incorrect "
        })
    }
    next();
}


// routes and  middleware code
app.post("/signup", validateEmail, validateUsername, validatePassword, (req, res) => {
    // console.log(re.body);
    const { username, email, password } = req.body;

    const id = users.length + 1;

    const newUser = {
        id,
        username,
        email,
        password,
    };

    users.push(newUser);

    const stringUsers = JSON.stringify(users);

    fs.writeFileSync(
        "C:/Users/dera098765/OneDrive/Documents/nitdev3.2-Aassingment/src/users.js",
        `export let users = ${stringUsers}`
    );

    return res.status(201).json({
        message: "user has been created",
        data: newUser,
        // data: JSON.parse(stringUsers),
    });
});

app.listen(port, () => {
    // const content = fs.readFileSync("/Users/dera098765/OneDrive/Desktop/nitdev3.2-Aassingment/src/fsRead.txt", "utf-8")
    console.log(`server is running on http://localhost:${port}`);
});