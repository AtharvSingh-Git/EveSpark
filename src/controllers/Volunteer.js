// volunteerController.js

import { StatusCodes } from 'http-status-codes';
import Sequelize from 'sequelize'; 
import Volunteers from '../models/VolunteerModel.js';
import express from 'express';

const getVolunteers = async (req, res) => {
    try {
        const response = await Volunteers.findAll();
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
}

const createVolunteers = async (req, res) => {
    const { name, email, reg_no, phone_no } = req.body;
    try {
        await Volunteers.create({
            name: name,
            email: email,
            reg_no: reg_no,
            phone_no: phone_no
        });
        res.status(StatusCodes.CREATED).json({ msg: "Volunteer Registration Successful!"});
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.response });
    }
}

export { getVolunteers, createVolunteers };
