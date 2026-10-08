// Lista materiais para qualquer usuario autenticado.
export async function listMaterials(req, res) {
  const [rows] = await req.app.locals.db.execute(
    "SELECT id, name, category FROM materials ORDER BY id"
  );
  res.json(rows);
}

export async function getMaterial(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID invalido."
    });
  }

  const [rows] = await req.app.locals.db.execute(
    "SELECT id, name, category FROM materials WHERE id = ?",
    [id]
  );

  if (!rows.length) {
    return res.status(404).json({
      message: "Material nao encontrado."
    });
  }

  res.json(rows[0]);
}

// Exclui material: a rota ja garante que apenas admin chega aqui.
export async function deleteMaterial(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ message: "ID invalido." });
  }

  const [result] = await req.app.locals.db.execute(
    "DELETE FROM materials WHERE id = ?",
    [id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Material nao encontrado." });
  }

  // 204 significa sucesso sem conte?do na resposta.
  res.status(204).end();
}