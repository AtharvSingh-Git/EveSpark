import StatusCodes from 'http-status-codes';
import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll();
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }

}
export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'], // performance optimization
            where: {
                uuid: req.params.id
            }
        });
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
}
export const createUsers = async (req, res) => {

    const { name, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Passwords don't match" });
    console.log(password);
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(StatusCodes.CREATED).json({ msg: "Sign up Successful!" });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    }

}
export const updateUsers = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    let hashPassword;
    const { name, email, password, confPassword, role } = req.body;
    if (password === "" || password === null) {
        hashPassword = user.password
    }
    else {
        hashPassword = await argon2.hash(password)
    }
    if (password !== confPassword) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Passwords don't match" });
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });

        res.status(StatusCodes.CREATED).json({ msg: "User Updated!" });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    }
}
export const deleteUsers = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });

        res.status(StatusCodes.CREATED).json({ msg: "User Deleted!" });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    }
}

