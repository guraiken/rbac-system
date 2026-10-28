import { registerLoginLog } from "../controllers/log";

const attempts = new Map();
const waitTime = 3 * 60 * 1000; // 3 minutos 
const maxFailures = 5;

export async function loginLimit(req, res, next) {
    const now = Date.now();
    
    //remover registros vencidos para não acumular ips na memória

    for(const [ip, attempts] of attempts) {
        if(attempts.expiresAt <= now())
            attempts.delete(ip);
    }

    const attempt = attempts.get(req.ip);

    if(attempt?.failures >= maxFailures) {
        const seconds = Math.ceil((attempt.expiresAt - now) / 1000);

        const minutes = Math.ceil(seconds / 60);
        
        await registerLoginLog(req, 429, "bloqueado");
        res.set("Retry-After", String(seconds))

        return res.status(429).json({ message: "Muitas tentativas de login. Tente novamente mais tarde." });
    }

    res.local.recordLoginResult = success => {
        if(success) {
            attempts.delete(req.ip);
            return
        }

        const current = attempts.get(req.ip) || { failures: 0};
        current.failures++;

        current.expiresAt = now + waitTime;
        attempts.set(req.ip, current);
    }

    next();
}