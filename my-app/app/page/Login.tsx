
"use client"


import React, { useState } from 'react'
import { login, type Session } from '../services/login'
import {Home} from '../page/Home'
import Register from './Register'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState("")
    const [showRegister, setShowRegister] = useState(false)
    const [notice, setNotice] = useState("")

    const handleLogin = async (event: any) => {
        event.preventDefault()

        try {
            const result = await login(email, password)
            setSession(result)
            setPassword("")
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
                        setPassword("")
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
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>E-mail</label>
                        <input type='text' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Entrar</button>

                </form>
            </div>
        </>
    )
}

export default Login