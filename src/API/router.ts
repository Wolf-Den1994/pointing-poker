import { Router } from 'express';
import { deleteRoom, getRoom } from './mongoDB';

export const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getRoom(id);
    res.json(response);
  } catch (e) {
    res.status(400).json('Error');
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    await deleteRoom(id);
    res.status(200).json('Ok');
  } catch (e) {
    res.status(404).json('Error');
  }
});
