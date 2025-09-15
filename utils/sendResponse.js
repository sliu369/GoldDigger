export function sendResponse(res, statusCode, data, contentType){
    res.statusCode = statusCode
    res.setHeader("Content-Type", contentType)
    res.end(data)
}