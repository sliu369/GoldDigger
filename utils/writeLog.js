import path from "node:path"
import fs from "node:fs/promises"

export async function writeLog(body) {
    try{
        const logFilePath = path.join("purchaseLog.txt")
        const log =
            `\n${body.time}, amount paid: $${body.paid}, price per Oz: $${body.price}, gold sold: ${body.sold} Oz`

        await fs.appendFile(logFilePath, log, 'utf8')
    }catch(e){
        throw new Error (e)
    }

}