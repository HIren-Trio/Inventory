const {createNotification} = require("../Notification/NotificationService");
const { Inventory } = require("./InventoryModel");
const { InventoryAddValidationSchema, InventoryUpdateValidationSchema } = require("./InventoryValidationSchema");


exports.addInventory = async (req, res) => {
    const {
        userId,
        name,
        category,
        price,
        stock,
        description,
    } = req.body;

    try {
        const { error } = InventoryAddValidationSchema.validate({
            userId,
            name,
            category,
            price,
            stock,
            description,
        });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let inventory = await Inventory.findOne({ name });

        if (inventory) {
            return res.status(400).json({ message: 'Inventory already exists with this name' });
        }

        inventory = new Inventory({
            userId,
            name,
            category,
            price,
            stock,
            description,
        });

        await inventory.save();
        await createNotification(`Inventory ${name} added`, userId, 'User');

        res.status(200).json({ message: 'Inventory added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateInventory = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        category,
        price,
        stock,
        description,
    } = req.body;

    try {
        const { error } = InventoryUpdateValidationSchema.validate({
            name,
            category,
            price,
            stock,
            description,
        });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let inventory = await Inventory.findByIdAndUpdate(id, {
            name,
            category,
            price,
            stock,
            description,
        }, { new: true });

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        await createNotification(`Inventory ${name} updated`, inventory.userId, 'User');

        res.status(200).json({ message: 'Inventory updated successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteInventory = async (req, res) => {
    const { id } = req.params;

    try {
        let inventory = await Inventory.findByIdAndDelete(id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        await createNotification(`Inventory ${inventory.name} deleted`, inventory.userId, 'User');

        res.json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

exports.getInventory = async (req, res) => {
    const { id } = req.params;

    try {
        let inventory = await Inventory.findById(id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getInventories = async (req, res) => {
    const { userId } = req.params;

    try {
        let inventories = await Inventory.find({ userId });

        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.searchInventory = async (req, res) => {
    const { query } = req.params;

    try {
        let inventories = await Inventory.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ],
        });

        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
