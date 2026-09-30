
"use client"


import React, { useState } from 'react'
import { login, type Session } from '../services/login'
import Home from '../page'
import Register from './Register'

const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState("")
    const [showRegister, setShowRegister] = useState(false)
    const [notice, setNotice] = useState("")

    const handleLogin = async (event: any) => {

        event.preventDefault()

        try {

            const response = await login(email, senha)

            if (!response) {
                alert('E-mail ou Senha inválidos')
            }
            alert('Login efetuado com sucesso!')
        } catch (error) {
            console.error("Erro ao fazer login:", error)
        }
    }

    return (
        <>
            <div>
                {/* SEM SESSÃO É MOSTRADO LOGIN, COM SESSÃO MOSTRA HOME */}

                {session ? (
                    <Home
                    session={session}
                    onLogout={() => {
                        setSession(null)
                        setEmail("")
                        setSenha("")
                    }}
                    />
                ) : showRegister ? (
                    <Register
                    onBack={() => setShowRegister(false)}
                    onRegistered={message => {
                        setShowRegister(false)
                        setNotice(message)
                    }}

                    />
                ) : <></>

                }
                <form action="">
                    <div>
                        <label htmlFor='email'>E-mail</label>
                        <input type='text' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor='senha'>Senha</label>
                        <input type='password' name='senha' id='senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                    <button type="submit">Entrar</button>

                </form>
            </div>
        </>
    )
}

export default Login