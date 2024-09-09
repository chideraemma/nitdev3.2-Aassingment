import { executeQuery } from "../config/database.js";


export const AccountTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL PRIMARY KEY,
        users_id SERIAL,
        FOREIGN KEY (users_id) REFERENCES users(id),
        AccountNumber VARCHAR(10) UNIQUE NOT NULL,
        Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    try {
        await executeQuery(query);
        console.log("accounts table created");

    } catch (error) {
        console.error("Error creating acounts table", error);
    }

};