import { useEffect, useState } from "react";
import { Session } from "../services/login";
import { api, errorMessage } from "../services/api";

type Props = {
    session: Session;
    onLogout: () => void;
}

type Material = {
    id: number;
    name: string;
    category: string;
}

const Home = ({session, onLogout,}: Props) => {

    const [materials, setMaterials] = useState<Material[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")

    const [deleting, setDeleting] = useState<number | null>(null)
    const [revision, setRevision] = useState(0)
    const isAdmin = session.user.role === "ADMIN"


    useEffect(() => {
        let active = true

        async function fetchMaterials() {
            try {
                const response = await api.get<Material[]>("/materials", 
                    { headers: { Authorization: `Bearer ${session.token}` } 
                })
                if (active) {
                    setMaterials(response.data)
                }
            } catch (error) {
                if(active) setError(errorMessage(error))
            } finally {
                if(active) setLoading(false)
            }
        }

        fetchMaterials()
        return () => { active = false }
    }, [session.token, revision])

    function refresh() {
        setLoading(true)
        setError("");
        setNotice("");
        setRevision(current => current + 1)

    }

    async function remove(material: Material) {
        if(!window.confirm("Deseja realmente remover o material " + material.name + "?")) {
            return;
        }
        setDeleting(material.id)
        setError("")
        setNotice("")

        try {
            const response = await api.delete("/materials/" + material.id, {
                headers: { Authorization: `Bearer ${session.token}` }
            })

            setMaterials(current => current.filter(m => m.id !== material.id))
            setNotice(`${material.name} removido com sucesso!`)
        } catch (error) {
            setError(errorMessage(error))
        }
        finally {
            setDeleting(null)
        }
    }

    return (
        <>
            HOME Inicial
        </>
    )
}
