const express = require('express');
const router = express.Router();
const { analyzeTrends, generateContent } = require('../controllers/marketingController');
const authMiddleware = require('../middleware/auth');

// Protected route to analyze trends
router.get('/analyze', authMiddleware, async (req, res) => {
  try {
    const analysisResult = await analyzeTrends(req.user.id);
    res.status(200).json(analysisResult);
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing trends', error: error.message });
  }
});

// Protected route to generate content based on trends
router.post('/generate-content', authMiddleware, async (req, res) => {
  try {
    const { trendId } = req.body;
    if (!trendId) {
      return res.status(400).json({ message: 'Trend ID is required' });
    }
    const content = await generateContent(trendId);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error generating content', error: error.message });
  }
});

module.exports = router;