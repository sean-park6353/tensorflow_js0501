# tensorflow_js0501
tensorflow.js
사용방법: cmd에 node test.js 실행

data 변수에 학습데이터 경로설정,
test_data 변수에 테스트데이터 경로 설정,

=========저장 전 비교========== 은 모델의 save,load 가 잘 되는지 테스트하기 위해 저장 전에 테스트 한 결과를 출력한것이고
=========저장 후 비교==========   const saveResults = await model.save("file://./model/jyp1"); 실행 후 데이터를 로드 한 후 테스트 한 결과를
출력한 내용이다. 두 개의 출력문이 같다면 데이터의 save와 load가 문제없이 일어난 것이다.

