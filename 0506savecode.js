const tf = require("@tensorflow/tfjs");

// const a = tf.data.array([{ item: 1 }, { item: 2 }, { item: 3 }]);

// a.forEach((item) => {
//   console.log(item);
// });

const split = require("./split");
const model_initialize = require("./model_initialize");
require("@tensorflow/tfjs-node");

async function main() {
  model = model_initialize();

  const learning_data = await split("./dataset/acde.csv");
  const test_data = await split("./dataset/a_12.csv");

  const x_test = [
    [
      70,
      66,
      10,
      0,
      39,
      53,
      40,
      54,
      50,
      55,
      56,
      39,
      28,
      0,
      8,
      26,
      43,
      47,
      50,
      52,
      41,
      24,
      38,
      52,
      37,
      29,
      42,
      22,
      26,
      29,
      22,
      99,
      97,
      93,
      46,
    ],
  ];
  const y_test = [[1, 0, 0, 0, 0, 0]]; // 결과 데이터
  const x_data = [];
  const y_data = [];

  // test_data.forEach((el) => {
  //   x_test.push(el.splice(0, 35));
  //   y_test.push(el.splice(el));
  // });

  learning_data.forEach((el) => {
    x_data.push(el.splice(0, 35));
    y_data.push(el);
  });

  // const x_tmp = tf.tensor2d(x_data);
  // const y_tmp = tf.tensor2d(y_data);
  const x_realtime = tf.tensor2d(x_test);
  // const y_realtime = tf.tensor2d(y_test);

  // console.log("===================저장 전 비교===========================");
  // model.predict(x_tmp_test).argMax(1).print();
  // y_tmp_test.argMax(1).print();
  try {
    loadedModel = await tf.loadLayersModel("file://./model/model.json");
  } catch (e) {
    console.log("불러오기 실패");
  }

  console.log("==============================================");
  const predictions = loadedModel.predict(x_realtime, 20).argMax(1);
  // const label = y_realtime.argMax(1);

  console.log("==============================================");
}

main();
