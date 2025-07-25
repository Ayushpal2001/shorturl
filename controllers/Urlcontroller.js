const Url = require('../models/url');
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
require('dotenv').config();

const baseUrl = process.env.BASE_URL || 'http://localhost:5000'; // Use env variable or default

// POST /shorten
exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json({ error: "URL required" });

  // Validate URL
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortId = nanoid(6);
  const newUrl = new Url({ shortId, originalUrl });
  try {
    await newUrl.save();
  } catch (error) {
    console.error('Error saving URL:', error);
    return res.status(500).json({ error: 'Server error saving URL' });
  }

  res.json({ shortUrl: `${baseUrl}/${shortId}` });
};

// GET /:shortId
exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  const entry = await Url.findOne({ shortId });

  if (entry) {
    res.redirect(entry.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
};
