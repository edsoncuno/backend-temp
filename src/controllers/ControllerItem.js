import Item from '../models/Item';

export const getItems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
}

export const getItem = async (req, res) => {
    const item = await Item.findById({ _id: req.params.id });
    res.json(item);
}

export const postItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.json({ status: "saved" });
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const putItem = async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: "updated" });
}

export const deleteItem = async (req, res) => {
    await Item.findByIdAndDelete({ _id: req.params.id });
    res.json({ status: "deleted" });
}