import http from "http"
import {serveStatic} from "./utils/serveStatic.js"
import { getPrice } from "./utils/getPrice.js"
import path from "node:path"

const __dirname = import.meta.dirname


const PORT = 8000


const server = http.createServer(async (req, res) => {

    if (!(req.url === '/price/live')){
        return await serveStatic(req, res, __dirname)
    }
    else if (req.url ==='/price/live'){

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        setInterval(() => {
            const price = getPrice();
            res.write(
                `data: ${JSON.stringify({ event: 'price-updated', currentPrice: price})}\n\n`
            )
        }, 2000);
    }
    
    
})

server.listen(PORT, () => console.log("Server is listening on port " + PORT))