import config from "../config/database.js"

export async function registerLog(connection, event) {

    const sql = "INSERT INTO logs (usuario, acao, mensagem, recurso_afetado, id_recurso_afetado, valor_antigo, valor_novo, campos_alterados, ip, codigo_http, status_acao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const result = await connection.execute(sql, [
        event.usuario,
        event.acao,
        event.mensagem,
        event.recurso_afetado,
        event.id_recurso_afetado,
        event.valor_antigo,
        event.valor_novo,
        event.campos_alterados,
        event.ip,
        event.codigo_http,
        event.status_acao
    ]);
}

export async function listLogs(req, res) {
    const [rows] = await req.app.locals.db.execute("SELECT l.id as id_log, l.usuario as usuario_log, u.nome as usuario_nome, l.datahora as datahora, l.acao as acao, l.mensagem as mensagem, l.recurso_afetado as recurso_afetado, l.id_recurso_afetado as id_recurso_afetado, l.valor_antigo as valor_antigo, l.valor_novo as valor_novo, l.campos_alterados as campos_alterados, l.ip as ip, l.codigo_http as codigo_http, l.status_acao as status_acao FROM logs as l LEFT JOIN users as u ON l.usuario = u.id ORDER BY l.data DESC");
    res.json(rows);
}

export async function registerLoginLog(req, status, userId = null){
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase().slice(0,    254) : "nâo informado";

    await registerLog(req.app.locals.db, {
        usuario: userId, 
        acao: "login",
        mensagem: `Tentativa de login com email: ${email}. Resultado: ${status}`,
        recurso_afetado: "login",
        id_recurso_afetado: null,
        valor_antigo: null,
        valor_novo: null,
        campos_alterados: null,
        ip: req.ip,
        status_acao: status,
    })

    const sql = "INSERT INTO logs (usuario, acao, mensagem, recurso_afetado, id_recurso_afetado, valor_antigo, valor_novo, campos_alterados, ip, codigo_http, status_acao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
}

