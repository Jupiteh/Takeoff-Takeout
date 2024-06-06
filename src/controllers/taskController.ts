import { Request, Response } from 'express';
import Task from '../models/task';

// Créer une tâche
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (err: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les tâches
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une tâche par ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (err: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une tâche par ID
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (err: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une tâche par ID
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: err.message });
  }
};
