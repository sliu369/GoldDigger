import http from "http"
import {serveStatic} from "./utils/serveStatic.js"
import { getPrice } from "./utils/getPrice.js"
import {handlePost} from "./utils/routeHandlers.js"

const __dirname = import.meta.dirname


const PORT = 8000


const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url ==='/price/live'){

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
    else if (req.url === "/purchased"){
        if(req.method === "POST"){
            return await handlePost(req, res)
        }
    }
    else if (!req.url.startsWith("/purchased")){
        return await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log("Server is listening on port " + PORT))