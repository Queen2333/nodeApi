/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst app = express();\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst mysql = __webpack_require__(/*! mysql */ \"mysql\");\n\nlet connection = mysql.createConnection({\n  host: `192.168.0.103`,\n  user: 'root',\n  password: '123456',\n  port: '3306',\n  database: 'test'\n});\nconnection.connect(function (err) {\n  if (err) {\n    console.error('error connecting: ' + err.stack);\n    return;\n  }\n\n  console.log('connected as id ' + connection.threadId);\n}); // connection.query(addSql,addSqlParams,function (err, result) {\n//     if(err){\n//      console.log('[INSERT ERROR] - ',err.message);\n//      return;\n//     }        \n//    console.log('--------------------------INSERT----------------------------');\n//    console.log('INSERT ID:',result);        \n//    console.log('-----------------------------------------------------------------\\n\\n');  \n// });\n\nconnection.query(`SELECT * FROM runoob_tbl`, (error, results, fields) => {\n  console.log(JSON.stringify(results));\n}); // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {\n//     console.log('The solution is: ', results[0].solution);\n//   });\n// connection.connect();\n// connection.query('CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;', function (error, results, fields) {\n//     if (error) throw error;\n//     console.log('创建数据库')\n//     console.log(results)\n// });\n// connection.query('use test;')\n// connection.query(`CREATE TABLE IF NOT EXISTS myuser(\n//         name text,\n//         age int\n//     )`, function (error, results, fields) {\n//     if (error) throw error;\n//     console.log('创建表')\n//     console.log(results)\n// });\n// connection.end()\n\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.get('/test_get', (request, response) => {\n  connection.query('select * from runoob_tbl', (error, results, fields) => {\n    console.log(results); // if (error) throw error;\n\n    response.send({\n      code: 200,\n      data: results,\n      message: '成功'\n    });\n  }); // connection.end()\n}); // app.use(express.static('public'))\n// app.get('/random/image',(request, response) => {\n//     response.setHeader('Content-Type', 'text/json')\n//     response.send(request.query)\n// })\n\napp.post('/test_post', (request, response) => {\n  console.log(JSON.stringify(request.body));\n  const {\n    runoob_title,\n    runoob_author,\n    submission_date\n  } = request.body;\n\n  if (!(runoob_title && runoob_author && submission_date)) {\n    response.send({\n      code: 'error',\n      message: '参数错误',\n      data: null\n    });\n    return;\n  } else {\n    let addSql = 'INSERT INTO runoob_tbl(runoob_id, runoob_title, runoob_author, submission_date) VALUES(0,?,?,?)';\n    let addSqlParams = [runoob_title, runoob_author, submission_date];\n    connection.query(addSql, addSqlParams, function (err, result) {\n      if (err) {\n        console.log('[INSERT ERROR] - ', err.message);\n        return;\n      } else {\n        response.send({\n          code: 200,\n          message: '添加成功',\n          data: {}\n        });\n      }\n    });\n  }\n}); // connection.end();\n\napp.listen(8087, () => {\n  console.log('开启');\n});\n\n//# sourceURL=webpack://node-new/./app.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;