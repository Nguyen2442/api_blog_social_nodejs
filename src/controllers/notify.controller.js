import Notify from "../models/notify.model.js";

export const createNotify = async (req, res) => {
    try {
        const { id, recipients, url, content, image, isRead } = req.body;
        
        if(recipients.includes(req.user.id)){
            return res.status(400).send('You can not send notify to yourself');
        }

        const notify = new Notify({
            id,
            user: req.user.id,
            recipients,
            url,
            content,
            image,
            isRead
        });

        await notify.save();
        return res.status(201).json(notify);

    } catch (error) {
        return res.status(400).json(error);
    }
}

export const removeNotify = async (req, res) => {
    try {
        const notify = await Notify.findByIdAndDelete({
            id: req.params.id,
            url: req.query.url,
        });
        return res.json({notify});
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getNotifies = async (req, res) => {
    try {
        const notifies = await Notify.find({
            recipients: req.user.id
        }).sort("-createdAt");

        return res.json({notifies});
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const isReadNotify = async (req, res) => {
    try {
        const notifies = await Notify.findOneAndUpdate({
            _id: req.params.id,
        }, {
            isRead: true
        });
        return res.json({notifies});
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const deleteAllNotifies = async (req, res) => {
    try {
        const notifies = await Notify.deleteMany({
            recipients: req.user.id
        });
        return res.json({notifies});
    } catch (error) {
        return res.status(400).json(error);
    }
}