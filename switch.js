module.exports = (x) => {
  switch (x) {
    case 0:
      x = "올바른 자세";
      break;
    case 1:
      x = "걸터앉은 자세";
      break;
    case 2:
      x = "둔부를 앞으로 한 자세";
      break;
    case 3:
      x = "오른쪽으로 무게가 치우친 자세";
      break;
    case 4:
      x = "왼쪽으로 무게가 치우친 자세";
      break;
    case 5:
      x = "등을 대지 않은 자세";
      break;

    default:
      break;
  }

  return x;
};
