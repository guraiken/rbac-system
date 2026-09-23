import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
    const [scheme, token] = (req.headers.authorization || "").split(" ");

    if(scheme !== "Bearer " || !token) {
        return res.status(401).json({
            message: "Login necessário" 
        })
    }

    try {
        // Verifica assinatura e validade; guarda o perfil pra próx função
        req.user = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]})
    } catch (error) {
        return res.status(401).json({
            message: "Sessão inválida ou expirada!"
        })
    }

    next()
} 

//confere permissão/cargo depois do usuário ser autenticado
export const requireRole = () => {
    return (req, res, next) => {
        if(req.user.role !== role){
            return res.status(403).json({
                message: "Acesso negado."
            })
        }
        next()
    }
}