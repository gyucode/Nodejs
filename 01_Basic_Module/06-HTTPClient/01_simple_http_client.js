/** 1 모듈 참조 */
import http from  'http'; // <-- node내장 모듈이므로 추가 설치 안함.

/** 2 접속할 서버의 호스트 이름과 요청정보(path) 설정 */
const url ='http://itpaper.co.kr/data/simple_text.txt';

/** 3. Get방식으로 접속하기 위한 객체 생성 */
var req = http.get(url, function (res) {
    // 응답이 수신되는 경우 (수신 데이터의 용량에 따라서 여러번 호출될 수 있다.)
    var resData ='';
    res.on('data', function (chunk) {
        resData += chunk;
    });

    // 응답수신이 종료된 경우 (읽은 데이터를 처리한다.)
    res.on('end', function () {
        console.debug(resData);
    });
});

/** 4. 접속 객체에 error 이벤트 리스너 설정 */
req.on('error', function (err) {
    console.error(err);
    console.error('에러 발생 : ' + err.message );
});
