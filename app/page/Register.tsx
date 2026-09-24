"use client"

import { ReactEventHandler, useState } from "react"
import { register } from "../services/register"
import { errorMessage } from "../services/api"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function submit(event: any){
        event.preventDefault();

        setError("");
        try {
            const result = await register({name, email, password});
            console.log("Mensagem: ", result)
        } catch (error) {
            setError(errorMessage(error))
        }
    }

  return (
    <div>
        <h1>Registrar Usuário</h1>
        <form onSubmit={submit}>
            <div>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" required value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={name}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" name="password" required value={name}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit">Cadastrar</button>
        </form>
    </div>
  )
}

export default Register