// import Hospital from "../models/hospital/hospital.model.js";
import Message from "../helpers/messages.js";
import UserModel from "../models/user/user.model.js";
import { isUserHasReferences } from "../validations/validation.js";
import { isValidEmail, isValidUsername } from "../validations/validation.js";

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    userData.active = true;
    if (!isValidEmail(userData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const newUser = await UserModel.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      // include: Hospital
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: Message.UserMessage.ID_NOTFOUND_MESSAGE });
    }

    const updatedUser = await user.update(userData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const hasReferences = await isUserHasReferences(userId);
    if (hasReferences) {
      return res.status(400).json({ error: Message.UserMessage.REFERENCE_MESSAGE });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: Message.UserMessage.NOT_FOUND_MESSAGE });
    }

    await user.destroy();

    res.status(204).send(Message.UserMessage.DELETE_SUCCESS_MESSAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.DELETE_ERROR_MESSAGE });
  }
};



const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await UserModel.findByPk(id);
    if (!User) {
      return res.status(404).json({ error: Message.UserMessage.ID_NOTFOUND_MESSAGE });
    }
    res.status(200).json(User);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};