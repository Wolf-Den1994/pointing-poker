import { Router } from 'express';
import {
  deteteRoom, getRoom, setRoom, updateRoom,
} from './mongoDB';

export const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getRoom(id);
    res.json(response);
  } catch (e) {
    res.status(404).json('Error');
  }
});

router.post('/', async (req, res) => {
  const room = req.body.data;
  try {
    await setRoom(room);
    res.status(200).json('Ok');
  } catch (e) {
    res.status(404).json('Error');
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    await deteteRoom(id);
    res.status(200).json('Ok');
  } catch (e) {
    res.status(404).json('Error');
  }
});

router.put('/', async (req, res) => {
  const room = req.body.data;
  try {
    await updateRoom(room);
    res.status(200).json('Ok');
  } catch (e) {
    res.status(404).json('Error');
  }
});
