export async function listComments(req, res) {
  const materialId = Number(req.params.materialId);

  if (!Number.isSafeInteger(materialId) || materialId <= 0) {
    return res.status(400).json({
      message: "ID do material invalido."
    });
  }

  const [rows] = await req.app.locals.db.execute(
    `SELECT id, material_id, comment
     FROM comments
     WHERE material_id = ?
     ORDER BY id`,
    [materialId]
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

export async function createComment(req, res) {
  const materialId = Number(req.params.id);
  const { comment } = req.body;

  if (!Number.isSafeInteger(materialId) || materialId <= 0) {
    return res.status(400).json({ message: "ID do material invalido." });
  }

  if (typeof comment !== "string") {
    return res.status(400).json({
      message: "O comentario deve ser um texto."
    });
  }

  if (comment.length < 1 || comment.length > 500) {
    return res.status(400).json({
      message: "O comentario deve possuir entre 1 e 500 caracteres."
    });
  }

  const [material] = await req.app.locals.db.execute(
    "SELECT id FROM materials WHERE id = ?",
    [materialId]
  );

  if (!material.length) {
    return res.status(404).json({
      message: "Material nao encontrado."
    });
  }

  const [result] = await req.app.locals.db.execute(
    "INSERT INTO comments (material_id, comment) VALUES (?, ?)",
    [materialId, comment]
  );

  res.status(201).json({
    id: result.insertId,
    material_id: materialId,
    comment
  });
}