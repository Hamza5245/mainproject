const Notification = require('../models/notificationModel');

// 1. Create notification
const addnotification = async (req, res) => {
    try {
        const info = {
            bookId: req.body.bookId,
            userId: req.body.userId,
            sellerId: req.body.sellerId,
            seen: req.body.seen,
        };

        const notification = await Notification.create(info);
        return res.status(200).json({ status: 'ok', data: notification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all notifications
const getnotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        return res.status(200).json({ status: 'ok', data: notifications });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get notification by id
const getnotificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await Notification.findById(id);
        return res.status(200).json({ status: 'ok', data: notification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update notification
const updatenotification = async (req, res) => {
    try {
        let id = req.params.id;


        const updatednotification = await Notification.findByIdAndUpdate(id, 
            { ...req.body,  }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatednotification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete notification
const deletenotification = async (req, res) => {
    try {
        const id = req.params.id;
        await Notification.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addnotification,
    getnotifications,
    getnotificationById,
    updatenotification,
    deletenotification
};
