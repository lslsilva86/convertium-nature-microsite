import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const contentFilePath = path.join(__dirname, '../../data/slideOne.json');

const getContent = (): any => {
  const rawData = fs.readFileSync(contentFilePath, 'utf8');
  return JSON.parse(rawData);
};

router.get('/slideOne', (req: Request, res: Response) => {
  try {
    const content = getContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

export default router;
