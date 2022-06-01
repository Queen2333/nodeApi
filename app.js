const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./src/routes/tutorial.routes.js")(app);

// app.get('/test_get', (request, response) => {
//     connection.query('select * from runoob_tbl', (error, results, fields) => {
//         console.log(results)
//         // if (error) throw error;
//         response.send({
//             code: 200,
//             data: results,
//             message: '成功',
//         })
//     })
// })

// app.use(express.static('public'))

// app.get('/random/image',(request, response) => {
//     response.setHeader('Content-Type', 'text/json')
//     response.send(request.query)
// })

// app.post('/test_post', (request, response) => {
//     console.log(JSON.stringify(request.body))
//     const {runoob_title, runoob_author, submission_date} = request.body;
//     if (!(runoob_title && runoob_author && submission_date)) {
//         response.send({
//             code: 'error',
//             message: '参数错误',
//             data: null
//         })
//         return
//     }else{
//         let addSql = 'INSERT INTO runoob_tbl(runoob_id, runoob_title, runoob_author, submission_date) VALUES(0,?,?,?)';
//         let addSqlParams = [runoob_title, runoob_author, submission_date];
//         connection.query(addSql,addSqlParams,function (err, result) {
//             if (err){
//                 console.log('[INSERT ERROR] - ',err.message);
//                 return;
//             } else {
//                 response.send({
//                     code: 200,
//                     message: '添加成功',
//                     data: {}
//                 })
//             }    
//         });
//     }
    
// })

// connection.end();
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});