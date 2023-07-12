/**
 * Classe responsavel por fazer as requisicoes
 * @param {"Host da API"} host
 * @param {"Headers da API"} headers
 * @returns {Requester} Requester
 * @example
 * const requester = new Requester({
 *  host: "http://localhost:8031",
 *  headers: {
 *      "Content-Type": "application/json",
 *  }
 * })
 */
class Requester {
    #host;
    #headers;

    constructor({ host, headers }) {
        this.#host = host;
        this.#headers = headers;
    }

    /**
     * Envia uma requisicao
     * @param {"Path da requisicao"} values.path
     * @param {"Metodo da requisicao"} values.method
     * @returns {Promise} Promise
     * @example
     * const res = await requester.send({
     *  path: "/auth/login",
     *  method: "POST",
     *  body: {
     *      email: "email",
     *      password: "password"
     *  }
     * })
     */
    async send(values) {
        const request = new Request(`${this.#host}${values.path}`);
        
        delete values.path;
        delete values.host;

        values.headers = this.#headers;

        if(values.body) {
            values.body = JSON.stringify(values.body);
        }

        const res = await fetch(request, values).then(async response => {
            return response.json().then((data) => {
                return data;
            })
        })

        return res;
    }
}

export default Requester;