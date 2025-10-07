// routes/fileRoutes.js
const express = require('express');
const File = require('../modules/retailerSchema'); // file schema path
const router = express.Router();

// ================= Upload file =================
router.post('/upload', async (req, res) => {
  try {
    const { fileName, fileType, fileSize, fileUrl, uploadedBy } = req.body;

    if (!fileName || !fileUrl || !uploadedBy) {
      return res.status(400).json({ success: false, message: 'fileName, fileUrl, and uploadedBy are required' });
    }

    const newFile = new File({
      fileName,
      fileType,
      fileSize,
      fileUrl,
      uploadedBy
    });

    await newFile.save();
    res.status(201).json({ success: true, message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Get all files =================
router.get('/', async (req, res) => {
  try {
    const files = await File.find().populate('uploadedBy', 'name email profilePic'); // user info join
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Get single file =================
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate('uploadedBy', 'name email profilePic');
    if (!file) return res.status(404).json({ success: false, message: 'File not found' });
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Update file =================
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const updatedFile = await File.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedFile) return res.status(404).json({ success: false, message: 'File not found' });

    res.json({ success: true, message: 'File updated', file: updatedFile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= Delete file =================
router.delete('/:id', async (req, res) => {
  try {
    const deletedFile = await File.findByIdAndDelete(req.params.id);
    if (!deletedFile) return res.status(404).json({ success: false, message: 'File not found' });

    res.json({ success: true, message: 'File deleted', file: deletedFile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
