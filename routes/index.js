const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const {
  getTrends,
  generateContent,
  personalizeAnalysis,
  visualizeResults,
  autoAnalyzeData
} = require('../controllers/marketing');

// Get marketing trends
router.get('/trends', authMiddleware, async (req, res) => {
  try {
    const trends = await getTrends();
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Generate content based on trends
router.post('/generate-content', authMiddleware, [
  check('trendId', 'Trend ID is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const content = await generateContent(req.body.trendId);
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Personalize analysis based on user preferences
router.put('/personalize-analysis', authMiddleware, [
  check('analysisId', 'Analysis ID is required').not().isEmpty(),
  check('preferences', 'Preferences are required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const personalizedAnalysis = await personalizeAnalysis(req.body.analysisId, req.body.preferences);
    res.json(personalizedAnalysis);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Visualize results using charts or graphs
router.get('/visualize-results/:id', authMiddleware, async (req, res) => {
  try {
    const visualization = await visualizeResults(req.params.id);
    res.json(visualization);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Automatically analyze data from various sources
router.post('/auto-analyze-data', authMiddleware, [
  check('dataSources', 'Data sources are required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const analysisResults = await autoAnalyzeData(req.body.dataSources);
    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;