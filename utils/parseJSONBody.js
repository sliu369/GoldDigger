export async function parseJSONBody(req) {
    try {
        let body = ''

        for await (const chunk of req) {
            body += chunk.toString();
        }

        return JSON.parse(body)

    } catch (err) {
        throw new Error(`Invalid JSON format: ${err}`)
    }

}