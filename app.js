const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: `192.168.0.103`,
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
})
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });



// connection.query(addSql,addSqlParams,function (err, result) {
//     if(err){
//      console.log('[INSERT ERROR] - ',err.message);
//      return;
//     }        

//    console.log('--------------------------INSERT----------------------------');
//    console.log('INSERT ID:',result);        
//    console.log('-----------------------------------------------------------------\n\n');  
// });


connection.query(`SELECT * FROM runoob_tbl`, (error, results, fields) => {
    console.log(JSON.stringify(results))
})

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     console.log('The solution is: ', results[0].solution);
//   });


// connection.connect();
// connection.query('CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;', function (error, results, fields) {
//     if (error) throw error;
//     console.log('创建数据库')
//     console.log(results)
// });

// connection.query('use test;')

// connection.query(`CREATE TABLE IF NOT EXISTS myuser(
//         name text,
//         age int
//     )`, function (error, results, fields) {
//     if (error) throw error;
//     console.log('创建表')
//     console.log(results)
// });

// connection.end()

app.use(bodyParser.urlencoded({extended: false}))


app.get('/test_get', (request, response) => {
    connection.query('select * from runoob_tbl', (error, results, fields) => {
        console.log(results)
        // if (error) throw error;
        response.send({
            code: 200,
            data: results,
            message: '成功',
        })
    })
    // connection.end()
})

// app.use(express.static('public'))

// app.get('/random/image',(request, response) => {
//     response.setHeader('Content-Type', 'text/json')
//     response.send(request.query)
// })

app.post('/test_post', (request, response) => {
    console.log(JSON.stringify(request.body))
    const {runoob_title, runoob_author, submission_date} = request.body;
    if (!(runoob_title && runoob_author && submission_date)) {
        response.send({
            code: 'error',
            message: '参数错误',
            data: null
        })
        return
    }else{
        let addSql = 'INSERT INTO runoob_tbl(runoob_id, runoob_title, runoob_author, submission_date) VALUES(0,?,?,?)';
        let addSqlParams = [runoob_title, runoob_author, submission_date];
        connection.query(addSql,addSqlParams,function (err, result) {
            if (err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            } else {
                response.send({
                    code: 200,
                    message: '添加成功',
                    data: {}
                })
            }    
        });
    }
    
})

// connection.end();


app.listen(8087, () => {
    console.log('开启')
})