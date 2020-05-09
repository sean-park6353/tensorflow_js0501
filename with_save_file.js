const tf = require("@tensorflow/tfjs");
const split = require("./split");
const model_initialize = require("./model_initialize");
const insert_words = require("./switch");
require("@tensorflow/tfjs-node");

function onBatchEnd(batch, logs) {
  console.log("Accuracy", logs.acc);
}
async function main() {
  model = model_initialize();

  const data = await split("C:/Users/park ji seong/Desktop/데이터셋/acde.csv");
  const test_data = await split(
    "C:/Users/park ji seong/Desktop/데이터셋/a_120.csv"
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

  model
    .fit(x_tmp, y_tmp, {
      epochs: 500,
      callbacks: { onBatchEnd },
    })
    .then((info) => {
      console.log("fianl accuracy", info.hisotry.acc);
    });

  try {
    const saveResults = await model.save("file://./model/");
    console.log(saveResults);
  } catch (e) {
    console.log("저장 실패");
  }

  console.log("===================저장 전 비교===========================");
  const past_x = model.predict(x_tmp_test).argMax(1);
  const past_y = y_tmp_test.argMax(1);
  var past_p = past_x.dataSync()[0];
  var past_l = past_y.dataSync()[0];
  console.log(`예측한 자세는 ${insert_words(past_p)}입니다`);
  console.log(`예측한 자세는 ${insert_words(past_l)}입니다`);

  try {
    loadedModel = await tf.loadLayersModel("file://./model/model.json");
  } catch (e) {
    console.log("불러오기 실패");
  }

  console.log("===================저장 후 비교===========================");
  const predictions = loadedModel.predict(x_tmp_test).argMax(1);
  const label = y_tmp_test.argMax(1);
  var p = predictions.dataSync()[0];
  var l = label.dataSync()[0];

  console.log(`예측한 자세는 ${insert_words(p)}입니다`);
  console.log(`예측한 자세는 ${insert_words(l)}입니다`);

  console.log("==========================================================");
}

main();
