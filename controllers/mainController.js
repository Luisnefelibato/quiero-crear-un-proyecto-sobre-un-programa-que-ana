const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');

const ANALYSIS_SCRIPT_PATH = path.join(__dirname, '../scripts/analyze_marketing_trends.py');
const CONTENT_GENERATION_SCRIPT_PATH = path.join(__dirname, '../scripts/generate_content.py');

class MainController {
  async analyzeTrends(req, res) {
    try {
      const { data } = await axios.get('https://api.example.com/marketing-trends');
      const trendsData = JSON.stringify(data);

      // Save trends data to a temporary file
      const tempFilePath = path.join(__dirname, '../temp/trends.json');
      fs.writeFileSync(tempFilePath, trendsData);

      // Run analysis script
      const { stdout, stderr } = await exec(`python3 ${ANALYSIS_SCRIPT_PATH} ${tempFilePath}`);

      if (stderr) {
        throw new Error(stderr);
      }

      res.send({ message: 'Analysis completed successfully', result: stdout });
    } catch (error) {
      res.status(500).send({ message: 'Error analyzing trends', error: error.message });
    }
  }

  async generateContent(req, res) {
    try {
      const { trendId } = req.params;
      const contentTemplatePath = path.join(__dirname, '../templates/content_template.txt');

      // Run content generation script
      const { stdout, stderr } = await exec(`python3 ${CONTENT_GENERATION_SCRIPT_PATH} ${trendId} ${contentTemplatePath}`);

      if (stderr) {
        throw new Error(stderr);
      }

      // Convert text content to image
      const imagePath = path.join(__dirname, '../temp/generated_content.png');
      await sharp(stdout.split('\n').join(' '))
        .toFile(imagePath);

      res.download(imagePath, 'generated_content.png', (err) => {
        if (err) {
          res.status(500).send({ message: 'Error generating content', error: err.message });
        } else {
          fs.unlinkSync(imagePath); // Clean up generated image file
        }
      });
    } catch (error) {
      res.status(500).send({ message: 'Error generating content', error: error.message });
    }
  }
}

module.exports = MainController;