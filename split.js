var fs = require("fs");

/**
 * csv 데이터 추출
 * @return Promise<arr[][]>
 */
module.exports = (filePath) => {
  return new Promise((resolve) => {
    var data = fs.readFileSync(filePath, { encoding: "utf-8" });
    var result = data.split("\r\n");
    var rows = [];

    result.forEach((el, i) => {
      if (result[i].length > 1) rows[i] = el.split(",").map((e) => Number(e));
    });

    resolve(rows);
  });
};
