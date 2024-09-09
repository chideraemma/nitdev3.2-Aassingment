import { createUser} from "./user.services.js";
import { getUsers } from "./user.services.js";
import { getUserById } from "./user.services.js";
import { deleteUserById } from "./user.services.js";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const usercredential = await createUser(firstName, lastName, email, password);
    
    return res.status(201).json({
        "message": "user created",
        usercredential
    })
};

//get all users controller
export const getAllUsers = async (req, res) => {
    const allUsers = await getUsers();

    return res.status(200).json({
        message: "This is all the users",
        allUsers
    })
};

//get user by id controller
export const UserById = async (req, res) => {
    const { id } = req.params;

    const singleUser = await getUserById(id)

    return res.status(200).json({
        message: `This is a single user with an id ${id}`,
        singleUser
    })
};

//delete user by id controller
export const deleteUserId = async (req, res) => {
    const { id } = req.params;

    const deleteSingleUser = await deleteUserById(id);

    return res.status(204).json({
        message: `User with id ${id} has been deleted!`,
        deleteSingleUser
    })
}
