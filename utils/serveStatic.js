import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {
  
  const filePath = path.join(baseDir, 'public', req.url === '/'? 'index.html' : req.url)
  const ext = path.extname(filePath)

  const contentType = getContentType(ext)

  try {
    const content = await fs.readFile(filePath)
    sendResponse(res, 200, content, contentType)
  } catch (err) {
    if (err.code === 'ENOENT') {
        const content = await fs.readFile(path.join(baseDir, 'public', '404.html'))
        sendResponse(res, 404, content, 'text/html')
    }
    else{
        sendResponse(res, 500, '<h1> Error 500: Internal server error</h1>', 'text/html')
    }
  }
}