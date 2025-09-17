import { sendResponse } from "./sendResponse.js"
import { parseJSONBody } from "./parseJSONBody.js";
import { writeLog } from "./writeLog.js"

export async function handlePost(req, res){
    try{
        const parsedBody = await parseJSONBody(req)
        const log = await writeLog(parsedBody)
        sendResponse(res, 201, JSON.stringify(log), "text/plain")
    }
    catch(e){
        console.log("routeHandler: " + e)
    }

}