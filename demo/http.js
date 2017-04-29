const http = require('http')
const fs = require('fs')

http.createServer(function(req, res) {

    new Promise((resolve, reject) => {
        fs.readFile('./test.js', function(err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    }).then(resfile => {
        res.write('1')
        res.write('2')
        res.end('closed')
    }).catch(err => {
        res.end('err')
    })

}).listen(7000)

console.log('server listening on port 7000')
