const sql = require("./db.js");

const Tutorial = function(tutorial) {
  this.tutorial_key = tutorial.key;
  this.value = tutorial.value;
  this.timestamp = tutorial.timestamp;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    const _newTutorial = {
      key: newTutorial.tutorial_key,
      value: newTutorial.value,
      timestamp: newTutorial.timestamp
    }
    result(null, { ..._newTutorial });
  });
};

Tutorial.findByKeyAndTime = (params, result) => {
  const {key, timestamp} = params;
  console.log(key, timestamp, 'params');

  sql.query(`SELECT * FROM tutorials WHERE tutorial_key = '${key}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      if (res.length === 1) {
        if (timestamp) {
          result(null, Number(timestamp) >= Number(res[0].timestamp) ? {value: res[0].value} : {message: 'There are no data'});
        } else {
          result(null, {value: res[0].value});
        }
        return;
      }
      if (res.length > 1) {
        const latest = res.reduce((pre, curv) => Number(pre.timestamp) < Number(curv.timestamp) ? curv : pre)
        const earliest = res.reduce((pre, curv) => Number(pre.timestamp) > Number(curv.timestamp) ? curv : pre)
        if (timestamp) {
          if (Number(timestamp) > Number(latest.timestamp)) {
            result(null, {value: latest.value})
            return
          }
          if (Number(timestamp) < Number(earliest.timestamp)) {
            result(null, {message: 'There are no data'})
            return
          }
          let target = {}
          let l = 0, r = res.length - 1;
          while(l <= r) {
            let mid = Math.floor((r + l) / 2)
            if (Number(timestamp) === Number(res[mid].timestamp)) {
              target = res[mid]
              result(null, {value: target.value})
              return
            } else if (Number(timestamp) < Number(res[mid].timestamp)) {
              r = mid - 1
            } else {
              l = mid + 1
            }
          }
          result(null, {value: res[l - 1].value})
        } else {
          result(null, {value: latest.value})
        }
        return
      }
      return;
    }

    // not found Tutorial with the key
    result({}, null);
  });
};

module.exports = Tutorial;