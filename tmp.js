const tf = require("@tensorflow/tfjs");

// Optional Load the binding:
// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
require("@tensorflow/tfjs-node");

async function print() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("아이유"), 5000);
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
  console.log(result);
}

// Train a simple model:

async function func() {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 100, activation: "relu", inputShape: [10] })
  );
  model.add(tf.layers.dense({ units: 1, activation: "linear" }));
  model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

  const xs = tf.randomNormal([100, 10]);
  const ys = tf.randomNormal([100, 1]);

  model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
      // onEpochEnd: (epoch, log) =>
      //   console.log(`Epoch ${epoch}:  loss = ${log.loss}`),
      print: () => {},
    },
  });

  // print();
  model.predict(xs);
  const save_result = await model.save("file://./model");

  const model_ = await tf.loadLayersModel("file://./model/model.json");

  model_.predict(xs).print();
}

func();
