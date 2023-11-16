import ImprestProduct from "../models/imprest_product/imprest.product.model.js";
import Product from "../models/product/product.model.js";
import Imprest from "../models/imprest/imprest.model.js";
import messages from "../helpers/messages.js";

const getImprestProducts = async (req, res) => {
    try {
        const imprestProducts = await ImprestProduct.findAll(
            {
                include: [
                    {
                        model: Product,
                    },
                    {
                        model: Imprest,
                    },
                ],
            });

        res.status(200).json(imprestProducts)

    } catch (error) {
        res.status(500).json({ message: messages.ServerMessage.ERROR_MESSAGE })
    }
}

const createImprestProduct = async (req, res) => {
    try {
        const imprestProductData = req.body;
        const imprestProduct = await ImprestProduct.create(imprestProductData);
        console.log(imprestProduct, "imprestProduct")
        res.status(201).json(imprestProduct)
    } catch (error) {
        res.status(400).json({ error: messages.ImprestProductMessage.CREATE_ERROR_MESSAGE });
    }
}

const updateImprestProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const imprestProduct = req.body;
        if (imprestProduct.availablestock >= imprestProduct.maxstock
            || imprestProduct.maxstock <= imprestProduct.minstock) {
            return res.status(400).json({ error: messages.ImprestProductMessage.INVALID_STOCK_MESSAGE });
        }
        let dbImprestProduct = await ImprestProduct.findByPk(id);

        if (!dbImprestProduct) {
            return res.status(404).json({ error: 'ImprestProduct not found.' });
        }

        dbImprestProduct = await dbImprestProduct.update(imprestProduct);
        res.status(200).json(dbImprestProduct);
    } catch (error) {
        res.status(400).json({ error: messages.ImprestProductMessage.UPDATE_ERROR_MESSAGE });
    }
};

const getImprestProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const imprestProduct = await ImprestProduct.findByPk(id, {
            include: [
                { model: Imprest },
                { model: Product }
            ]
        });

        if (!imprestProduct) {
            return res.status(404).json({ error: messages.ImprestProductMessage.ID_NOTFOUND_MESSAGE });
        }

        res.status(200).json(imprestProduct);
    } catch (error) {
        res.status(500).json({ error: messages.ServerMessage.ERROR_MESSAGE });
    }
};


const deleteImprestProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const imprestProduct = await ImprestProduct.findByPk(id);

        if (!imprestProduct) {
            return res.status(404).json({ error: messages.ImprestProductMessage.ID_NOTFOUND_MESSAGE });
        }

        const deletedImprestProduct = imprestProduct.toJSON();

        await imprestProduct.destroy();

        res.status(200).json({ message: messages.ImprestProductMessage.UPDATE_SUCCESS_MESSAGE, deletedImprestProduct });
    } catch (error) {
        res.status(400).json({ error: messages.ImprestProductMessage.DELETE_ERROR_MESSAGE });
    }
};

export default {
    getImprestProducts,
    createImprestProduct,
    updateImprestProduct,
    getImprestProductById,
    deleteImprestProduct
}