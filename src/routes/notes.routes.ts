import * as express from "express";
import { authentification } from "../middleware/authentification";
import { NoteController } from "../controllers/note.controllers";

const Router = express.Router();

Router.get("/notes", authentification, NoteController.getAllNotes);
Router.get("/notes/:id", authentification, NoteController.getNote);
Router.post("/notes", authentification, NoteController.createNote);

Router.put(
  "/notes/:id",
  authentification,
  NoteController.updateNote
);

Router.delete(
  "/notes/:id",
  authentification,
  NoteController.deleteNote
);
export { Router as noteRouter };
