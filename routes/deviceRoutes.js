// routes/deviceRoutes.js
const express = require('express');
const Device = require('../modules/deviceSchema'); // path to Device schema
const router = express.Router();

// ================= Add a device =================
router.post('/add', async (req, res) => {
  try {
    const { user, deviceId, deviceName, os, ipAddress } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, message: 'deviceId is required' });
    }

    const newDevice = new Device({
      user,
      deviceId,
      deviceName,
      os,
      ipAddress
    });

    await newDevice.save();
    res.status(201).json({ success: true, message: 'Device added', device: newDevice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Get all devices =================
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find().populate('user', 'name email profilePic');
    res.json({ success: true, devices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Get single device =================
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id).populate('user', 'name email profilePic');
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    res.json({ success: true, device });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Update device =================
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    updates.lastActive = new Date(); // update lastActive whenever device info changes

    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedDevice) return res.status(404).json({ success: false, message: 'Device not found' });

    res.json({ success: true, message: 'Device updated', device: updatedDevice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Delete device =================
router.delete('/:id', async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice) return res.status(404).json({ success: false, message: 'Device not found' });

    res.json({ success: true, message: 'Device deleted', device: deletedDevice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
