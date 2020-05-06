const tf = require("@tensorflow/tfjs");
const split = require("./split");
const model_initialize = require("./model_initialize");
require("@tensorflow/tfjs-node");

async function main() {
  model = model_initialize();

  const data = await split("C:/Users/park ji seong/Desktop/데이터셋/acde.csv");
  const test_data = await split(
    "C:/Users/park ji seong/Desktop/데이터셋/a_12.csv"
  );

  const x_test = []; // 예측할 데이터
  const y_test = []; // 결과 데이터
  const x_data = [];
  const y_data = [];

  test_data.forEach((el) => {
    x_test.push(el.splice(0, 35));
    y_test.push(el.splice(el));
  });

  data.forEach((el) => {
    x_data.push(el.splice(0, 35));
    y_data.push(el);
  });

  const x_tmp = tf.tensor2d(x_data);
  const y_tmp = tf.tensor2d(y_data);
  const x_tmp_test = tf.tensor2d(x_test);
  const y_tmp_test = tf.tensor2d(y_test);

  console.log("===================저장 전 비교===========================");
  model.predict(x_tmp_test).argMax(1).print();
  y_tmp_test.argMax(1).print();
  try {
    loadedModel = await tf.loadLayersModel("file://./model/model.json");
  } catch (e) {
    console.log("불러오기 실패");
  }

  console.log("===================저장 후 비교===========================");
  const predictions = loadedModel.predict(x_tmp_test).argMax(1);
  const label = y_tmp_test.argMax(1);
  predictions.print();
  label.print();
  console.log("==========================================================");
}

main();
