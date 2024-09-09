import { executeQuery } from "../config/database.js";

//post user query
export const createUser = async (firstName, lastName, email, password) => {
    try {
        const query = `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3) RETURN *`;

        const result = await executeQuery(query, [firstName, lastName, email, password]);

        return result
    } catch (error) {
        console.error("error inserting into users!!", err);
    }
};


//get all users query
export const getUsers = async () => {
    try{
        const query = `SELECT * FROM users ORDER BY ID ASC`;
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        console.error("Error Fetching Users", err);
    }
};

//get single user by id query
export const getUserById = async (id) => {
    try{
        const query = `SELECT * FROM users WHERE id = $1`;
        const result = await executeQuery(query, [id]);
        return result;
    } catch (error) {
        console.error("Error: Cannot get id", err);
    }
};

//delete user by id query
export const deleteUserById = async (id) => {
    try{
        const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
        const result = await executeQuery(query, [id]);
        return result;
    } catch (err) {
        console.error(`Error deleting user with id ${id}`, err)
    }
}



