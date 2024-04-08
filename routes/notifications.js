const express = require('express');
const router = express.Router();
const { v4: uuid4 } = require('uuid');
const _ = require('lodash');
let notifications = [];
let notificationHistory = [];

router.post('/notifications', (req, res, next) => {
    const body = req.body;
    const { currentPrice, tradeValue } = body;
    const uniqueId = uuid4();
    const notificationObj = {
        id : uniqueId,
        currentPrice,
        tradeValue
    }
    notifications.push(notificationObj);
    console.log('Notification added to system');
    res.json({ message : 'Notification Got added'});
    return;
});


// List All Notifications
router.get('/notifications', (req, res, next) =>{
    res.json({ data : notifications});
    return;
});

// List All Notifications
router.get('/notifications/:id', (req, res, next) =>{
    const uniqueId = req.query['id'];
    const filteredNotifications = notificationHistory.filter(item => item['id'] == uniqueId);
    res.json({ data : filteredNotifications});
    return;
});


// Send the notification to the user
router.post('/notifications/:id', (req, res) =>{
    const body = req.body;
    const uniqueId = req.params['id'];
    console.log(uniqueId + "niquw ID");
    const currentNotification = notifications.filter((item) => item.id == uniqueId);
    console.log(currentNotification + "notification ID");
    if(_.isEmpty(currentNotification)){
        res.json({ message : `Notification doesn't exists`});
        return;
    }
    // send it to mail server
    const notificationStatus = 'SENT';
    currentNotification['status'] = notificationStatus;
    notificationHistory.push(currentNotification);
    res.json({ data : currentNotification });
});

// Delete the Notification
router.delete('/notifications/:id', (req, res) =>{
    // const body = req.body;
    const uniqueId = req.params['id'];
    const currentNotification = notifications.filter((item) => item.id == uniqueId);
    if(_.isEmpty(currentNotification)){
        res.json({ message : `Notification doesn't exists`});
        return;
    }
    notifications = notifications.filter(item => item.id !== uniqueId);
    res.json({ message : 'Notification is Deleted' });
});

module.exports = router;