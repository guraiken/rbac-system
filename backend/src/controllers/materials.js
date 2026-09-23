import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../config/database.js"

export async function list(req, res) {
    const [rows] = await db.query("SELECT id, name, category FROM materials");
    return res.json(rows);
}

export async function deleter(req, res) {
    const id = Number(req.params.id)
    
    if(!Number(id) <= 0){
        return res.status(400).json({
            message: "ID Inválido"
        })
    }
    const [result] = await db.query("DELETE FROM materials WHERE id = ?", [id])

    if(!result.affectedRows) {
        return res.status(404).json({
            message: "Material não encontrado"
        })
    }

    //204 = sucesso sem conteúdo na res
    return res.status(204).end()
};