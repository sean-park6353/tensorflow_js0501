const tf = require("@tensorflow/tfjs");
const split = require("./split");
require("@tensorflow/tfjs-node");

module.exports = () => {
  const adam = tf.train.adam(0.01);
  let loadedModel = tf.sequential();
  const model = tf.sequential();
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

  return model;
};
