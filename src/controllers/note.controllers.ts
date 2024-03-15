import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Note } from "../entity/Note.entity";

export class NoteController {
  static async getAllNotes(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      const noteRepository = AppDataSource.getRepository(Note);
      const notes = await noteRepository.find();
      cache.put("data", notes, 10000);
      return res.status(200).json({
        data: notes,
      });
    }
  }

  static async getNote(req: Request, res: Response) {
    const { id } = req.params;
    const noteRepository = AppDataSource.getRepository(Note);
    const notes = await noteRepository.findOne({
      where: { id },
    });
    cache.put("data", notes, 10000);
    return res.status(200).json({
      data: notes,
    });
  }

  static async createNote(req: Request, res: Response) {
    const { title, description, image } =
      req.body;
    const note = new Note();
    note.title = title;
    note.description = description;
    note.image = image;
    const noteRepository = AppDataSource.getRepository(Note);
    await noteRepository.save(note);
    return res
      .status(200)
      .json({ message: "Note created successfully", note });
  }

  static async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, director, year, rating, image, cast } =
      req.body;
    const noteRepository = AppDataSource.getRepository(Note);
    const note = await noteRepository.findOne({
      where: { id },
    });
    note.title = title;
    note.description = description;
    note.image = image;
    await noteRepository.save(note);
    return res
      .status(200)
      .json({ message: "Note updated successfully", note });
  }

  static async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const noteRepository = AppDataSource.getRepository(Note);
    const note = await noteRepository.findOne({
      where: { id },
    });
    await noteRepository.remove(note);
    return res
      .status(200)
      .json({ message: "Note deleted successfully", note });
  }
}
