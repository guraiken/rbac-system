"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, errorMessage } from "../../services/api";
import type { Session } from "../../services/login";

type Material = {
  id: number;
  name: string;
  category: string;
};

type Comment = {
  id: number;
  material_id: number;
  comment: string;
};

type Props = {
  session: Session;
};

export default function MaterialPage({ session }: Props) {
  const params = useParams();
  const materialId = params.id;

  const [material, setMaterial] = useState<Material | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const headers = {
          Authorization: `Bearer ${session.token}`,
        };

        const [materialResponse, commentsResponse] = await Promise.all([
          api.get<Material>(`/materials/${materialId}`, { headers }),
          api.get<Comment[]>(`/comments/${materialId}`, { headers }),
        ]);

        setMaterial(materialResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        setError(errorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [materialId, session.token]);

  if (loading) {
    return <p>Carregando material...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!material) {
    return <p>Material não encontrado.</p>;
  }

  return (
    <section className="panel">
      <h1>{material.name}</h1>

      <p>
        Categoria: <strong>{material.category}</strong>
      </p>

      <hr />

      <h2>Comentários</h2>

      {comments.length === 0 ? (
        <p className="muted">Nenhum comentário ainda.</p>
      ) : (
        <ul>
          {comments.map((item) => (
            <li key={item.id}>
              {item.comment}
            </li>
          ))}
        </ul>
      )}

      <h2>Adicionar comentário</h2>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        maxLength={500}
        placeholder="Digite seu comentário..."
      />

      <p className="muted">
        {comment.length}/500 caracteres
      </p>

      <button
        className="secondary"
        disabled={comment.length < 1}
      >
        Comentar
      </button>
    </section>
  );
}