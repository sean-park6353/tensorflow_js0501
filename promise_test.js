const tf = require("@tensorflow/tfjs");
const split = require("./split");
require("@tensorflow/tfjs-node");

async function main() {
  const adam = tf.train.adam(0.01);
  const model = tf.sequential();
  let loadedModel = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 10,
      activation: "relu",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
      inputShape: [35],
    })
  );
  model.add(
    tf.layers.dense({
      units: 20,
      activation: "relu",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
    })
  );
  model.add(
    tf.layers.dense({
      units: 30,
      activation: "relu",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
    })
  );
  model.add(
    tf.layers.dense({
      units: 6,
      activation: "softmax",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
    })
  );
  model.compile({ optimizer: adam, loss: "categoricalCrossentropy" });

  loadedModel.add(
    tf.layers.dense({
      units: 10,
      activation: "relu",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
      inputShape: [35],
    })
  );
  loadedModel.add(
    tf.layers.dense({
      units: 20,
      activation: "relu",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
    })
  );
  loadedModel.add(
    tf.layers.dense({
      units: 30,
      activation: "relu",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
    })
  );
  loadedModel.add(
    tf.layers.dense({
      units: 6,
      activation: "softmax",
      kernelInitializer: "randomUniform",
      biasInitializer: "zeros",
    })
  );
  loadedModel.compile({ optimizer: adam, loss: "categoricalCrossentropy" });

  const data = await split("C:/Users/park ji seong/Desktop/데이터셋/acde.csv");
  const test_data = await split(
    "C:/Users/park ji seong/Desktop/데이터셋/a_12.csv"
  );

  // console.log(test_data.length);

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

  await model.fit(x_tmp, y_tmp, {
    epochs: 500,
    callbacks: {
      onEpochEnd: (epoch, log) =>
        console.log(`Epoch ${epoch}: loss = ${log.loss.toString()}`),
    },
  });
  try {
    const saveResults = await model.save("file://./model/");
    console.log(saveResults);
  } catch (e) {
    console.log("저장 실패");
  }
  console.log("===================저장 전 비교===========================");
  model.predict(x_tmp_test).argMax(1).print();
  y_tmp_test.argMax(1).print();
  console.log("==========================================================");

  try {
    loadedModel = await tf.loadLayersModel("file://./model/model.json");
  } catch (e) {
    console.log("불러오기 실패");
  }

  console.log("===================저장 후 비교===========================");
  loadedModel.predict(x_tmp_test).argMax(1).print();
  y_tmp_test.argMax(1).print();
  var correct = 0;
  for (i in Range(y_tmp_test.argMax(1))) {
    if (y_tmp_test.argMax(1) == loadedModel.predict(x_tmp_test).argMax(1)) {
      correct = correct + 1;
    }
  }

  console.log("==========================================================");

  // const model_ = await tf.loadLayersModel("file://./model/jyp1/model.json");
  // model_.predict(x_tmp_test).argMax(1).print();
}

main();
