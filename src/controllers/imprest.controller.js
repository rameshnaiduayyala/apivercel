import Imprest from "../models/imprest/imprest.model.js";
import Message from "../helpers/messages.js";
import { isImprestHasReferences } from "../validations/validation.js"

const getImprests = async (req, res) => {
  try {
    const imprests = await Imprest.findAll({
    });
    res.status(200).json(imprests);
  } catch (error) {
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const updateImprest = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id")
    const imprestItem = req.body;
    const imprest = await Imprest.findByPk(id);

    if (!imprest) {
      return res.status(404).json({ error: Message.ImprestMessage.ID_NOTFOUND_MESSAGE });
    }

    const updatedImprest = await imprest.update(imprestItem);

    res.status(200).json(updatedImprest);
  } catch (error) {
    res.status(400).json({ error: Message.ImprestMessage.UPDATE_ERROR_MESSAGE });
  }
};


const createImprest = async (req, res) => {
  try {
    const imprestData = req.body;
    imprestData.active = true;
    const imprest = await Imprest.create(imprestData);
    res.status(201).json(imprest);
  } catch (error) {
    res.status(400).json({ error: Message.ImprestMessage.CREATE_ERROR_MESSAGE });
  }
};

const getOneImprest = async (req, res) => {
  try {
    const imprestId = req.params.id;

    const imprest = await Imprest.findByPk(imprestId);

    if (!imprest) {
      return res.status(404).json({ message: Message.ImprestMessage.ID_NOTFOUND_MESSAGE });
    }

    res.status(200).json(imprest);
  } catch (error) {
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const deleteImprest = async (req, res) => {
  try {
    const imprestId = req.params.id;
    const hasReferences = await isImprestHasReferences(imprestId);
    if (hasReferences) {
      return res.status(400).json({ error: Message.ImprestMessage.REFERENCE_MESSAGE });
    }

    const imprest = await imprestModel.findByPk(imprestId);
    if (!imprest) {
      return res.status(404).json({ error: Message.ImprestMessage.NOT_FOUND_MESSAGE });
    }

    await imprest.destroy();

    res.status(204).send(Message.ImprestMessage.DELETE_SUCCESS_MESSAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.DELETE_ERROR_MESSAGE });
  }
}
export default {
  getImprests,
  updateImprest,
  createImprest,
  getOneImprest,
  deleteImprest,
};
