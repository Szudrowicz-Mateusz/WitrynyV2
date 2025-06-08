import { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Note } from '../models/note.model';

export const createNote: RequestHandler = async (req: Request, res: Response) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note); 
  } catch (err) {
    res.status(500).json({ message: 'Błąd przy tworzeniu notatki', error: err }); 
  }
};

export const getNotes: RequestHandler = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes); 
  } catch (err) {
    res.status(500).json({ message: 'Błąd przy pobieraniu notatek', error: err });
  }
};

export const getNoteById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Nieprawidłowy format ID notatki' });
      return;
    }
    const note = await Note.findById(id);
    if (!note) {
      res.status(404).json({ message: 'Notatka nie znaleziona' });
      return;
    }
    res.status(200).json(note);
  } catch (err: any) {
    res.status(500).json({ message: 'Błąd przy pobieraniu notatki', error: err.message });
  }
};

export const updateNote: RequestHandler = async (req: Request, res: Response) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedNote) {
      res.status(404).json({ message: 'Notatka do aktualizacji nie znaleziona' }); 
      return; 
    }
    res.status(200).json(updatedNote); 
  } catch (err) {
    res.status(500).json({ message: 'Błąd przy aktualizacji notatki', error: err }); 
  }
};

export const deleteNote: RequestHandler = async (req: Request, res: Response) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: 'Notatka do usunięcia nie znaleziona' }); 
      return; 
    }
    res.status(200).json({ message: 'Notatka usunięta' }); 
  } catch (err) {
    res.status(500).json({ message: 'Błąd przy usuwaniu notatki', error: err }); 
  }
};

export const searchNotes: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      res.status(400).json({ message: 'Parametr query jest wymagany i musi być ciągiem znaków' });
      return;
    }
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(notes);
  } catch (err: any) {
    res.status(500).json({ message: 'Błąd przy wyszukiwaniu notatek', error: err.message });
  }
};