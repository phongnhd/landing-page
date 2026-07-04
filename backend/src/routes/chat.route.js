import express from 'express';
import { askGemini } from '../services/gemini.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const answer = await askGemini(message);

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Gemini Error',
    });
  }
});

export default router;