const http = require('http');
const fs = require("fs");

let counter = 0;
const server = http.createServer(async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end("");
        return;
    }
    if (req.method !== "POST") {
        res.writeHead(400);
        res.end("Not post");
        return;
    }
    const buffer = await new Promise(
        resolve => {
            const chunks = [];
            req.on('data', chunk => {
                chunks.push(chunk);
            });
            req.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            req.on("error", resolve);
        }
    );
    if (buffer instanceof Error) {
        consolg.log(buffer);
        res.writeHead(400);
        res.end("Something went terribly wrong");
        return;
    }
    console.log("Saved", buffer.length);
    fs.writeFileSync("./data/image"+counter+".png", buffer);
    counter++;
    res.writeHead(200);
    res.end("");
});

server.listen(8081, function() {
    console.log("Listening at http://localhost:8081/");
});