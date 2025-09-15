import http from "http"
import {serveStatic} from "./utils/serveStatic.js"
import path from "node:path"

const __dirname = import.meta.dirname


const PORT = 8000


const server = http.createServer(async (req, res) => {
    await serveStatic(req, res, __dirname)
    
})

server.listen(PORT, () => console.log("Server is listening on port " + PORT))