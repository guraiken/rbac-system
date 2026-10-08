import { Router } from "express";
import {
  listComments,
  createComment
} from "../controllers/comment.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// AUTENTICAÇÃO: todas as rotas abaixo exigem um token válido.
router.use(authenticate);

// Lista os comentários de um material.
router.get("/:materialId", listComments);

// Cadastra um comentário em um material.
router.post("/:materialId", createComment);

export default router;