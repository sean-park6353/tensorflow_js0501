// const promise1 = (param) => {
//   return new Promise((resolve, reject) => {
//     if (param) {
//       resolve("바보");
//     } else {
//       reject("아닌데");
//     }
//   });
// };

// promise1(false).then(
//   (result) => {
//     console.log(result);
//   },
//   (err) => console.log(err)
// );

function add(a, b) {
  setTimeout(() => {}, 5000);
  result = a * b * a;
  return new Promise((resolve, reject) => {
    if (resolve) {
      resolve("성공");
    } else {
      reject("실팽");
    }
  });
}

console.log(add(10, 20));

// plus = (a, b, callback) => {
//   callback(a + b);
// };

// plus(10, 20, (result) => console.log(result));
