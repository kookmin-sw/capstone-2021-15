const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장문

// 200: 성공함
// 201: 생성에 성공함
http.createServer(async (req, res => {
    try{
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                return res.end(data);
            }else if(req.url === '/about'){
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                return res.end(data);
            }else if(req.url === '/users'){
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                return res.end(JSON.stringify(users));
            }
            // /, /about, /users도 아닐 경우
            try{
                const data = await fs.readFile(`.${req.url}`); // restFront.css restFront.js 를 프론트로 보냄
                return res.end(data);
            }catch (err){
                // 주소에 해당하는 라우트를 못찾았다는 404 not found error 발생
            }
        }else if( req.method === 'POST'){
            let body = '';
            // 요청의 body를 stream 형식으로 받는다
            req.on('data', (data) => {
                body += data;
            });
            // 요청의 body를 다 받은 후 실행됨
            return req.on('end', () => {
                console.log('POST 본문(Body):', body);
                const {name} = JSON.parse(body);
                const id = Date.now();
                users[id] = name;
                res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('ok');
            })
        }else if (req.method === 'PUT'){
            if(req.url.startsWith('/users/')){
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                    return res.end('ok');
                })
            }
        }else if (req.method === 'DELETE'){
            if(req.url.startsWith('/users/')){
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                return res.end('ok');
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
        }catch (err) {
    }
}));