const tf = require("@tensorflow/tfjs");
const split = require("./split");
const insert_words = require("./switch");
const model_initialize = require("./model_initialize");
const fs = require("fs");
require("@tensorflow/tfjs-node");

async function main() {
  model = model_initialize();
  // const learning_data = await split("./dataset/acde.csv");
  const input_data = await split("./dataset/e_120.csv");

  const x_data = [];
  const y_data = [];
  const x_test = [];
  const y_test = [];

  // learning_data.forEach((el) => {
  //   x_data.push(el.splice(0, 35));
  //   y_data.push(el);
  // });

  input_data.forEach((el) => {
    x_test.push(el.splice(0, 35));
    y_test.push(el);
  });

  const x_realtime = tf.tensor2d(x_test);
  const y_realtime = tf.tensor2d(y_test);

  try {
    loadedModel = await tf.loadLayersModel(
      "file://./model_0518_epochs_60/model.json"
    );
  } catch (e) {
    console.log("불러오기 실패");
  }

  console.log("==============================================");
  const predictions = loadedModel.predict(x_realtime, 10).argMax(1);
  // var p = predictions.dataSync()[0];
  var p = predictions.dataSync();
  const label = y_realtime.argMax(1);
  // var l = label.dataSync()[0];
  var l = label.dataSync();

  // predictions.print();
  // label.print();

  predict = JSON.stringify(predictions);
  result = JSON.stringify(label);
  fs.writeFile("./predictions.txt", predict, () => {});
  fs.writeFile("./result.txt", result, () => {});
  // console.log(`예측한 자세는 ${insert_words(p)}입니다`);
  for (i in p) {
    console.log(`예측: ${insert_words(p[i])}`);
    console.log(`실제: ${insert_words(l[i])}`);
  }
  // console.log(`실제 자세는 ${insert_words(l[0])}입니다`);
}
main();
