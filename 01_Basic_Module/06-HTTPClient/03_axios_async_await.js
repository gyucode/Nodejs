/** 1 */
import axios from 'axios';

/** 2 */
const url = 'https://www.naver.com/';

/** 3 */
(async () => {
    let result =null;

    try {
        const response = await axios.get(url);
        // 정상적으로 처리에 성공한 경우 promise 방식의 첫 번째 then 역할은 이 위치에서 자연스럽게 코드가 이어진다.
        // 첫 번째 then callback 함수에 전달되던 파라미터는 앞에서 리턴받은 response
        result = response.data;
    } catch (error) {
        // 에러발생시 실행되는 부분
        // promise 방식의 catch에 해당
        const errorMsg = "[" + error.response.status + "] " + error.response.statusText
        console.log("즉시 실행 함수 방식 - " + errorMsg);
        return;
    }

    // promise 방식의 마지막 then은 뒷부분에 일반 코드로 작성한다.
    console.log("Async-await 방식 - " + result);
})();

console.log("async/await + 즉시 실행 함수 방식으로 HTTP요청");
