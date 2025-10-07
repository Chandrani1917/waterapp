const express = require('express');
const router = express.Router();
const Transfer = require('../modules/supplierSchema'); // adjust path if needed
const User = require('../modules/userSchema');
const File = require('../modules/retailerSchema');

// ================= Create a Transfer =================
router.post('/create', async (req, res) => {
  try {
    const { sender, receiver, file, transferMode } = req.body;

    if (!sender || !file) {
      return res.status(400).json({ success: false, message: 'Sender and File are required' });
    }

    const newTransfer = new Transfer({
      sender,
      receiver,
      file,
      transferMode
    });

    await newTransfer.save();
    res.status(201).json({ success: true, transfer: newTransfer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// ================= Get All Transfers =================
router.get('/allt', async (req, res) => {
  try {
    const transfers = await Transfer.find()
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .populate('file', 'fileName fileType fileUrl');

    res.json({ success: true, transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// ================= Update Transfer Status =================
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ['pending', 'in-progress', 'completed', 'failed'];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const transfer = await Transfer.findByIdAndUpdate(
      req.params.id,
      { status, completedAt: status === 'completed' ? new Date() : undefined },
      { new: true }
    );

    if (!transfer) return res.status(404).json({ success: false, message: 'Transfer not found' });

    res.json({ success: true, transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
