/** 1. 모듈 참조 */
import fs from 'fs';

/** 2. 필요한 변수 생성 */
var target = './output_promise.txt'; // 읽어들일 파일의 경로

/** 3. 파일을 비동기식으로 파일 읽기 */
if (fs.existsSync(target)) {
    fs.promises
        .readFile(target, 'utf8')
        .then((data) => {
            //읽은 결과를 받기 위한 콜백
            console.debug('파일읽기 완료');
            console.debug(data);
        })
        .catch((err) => {
            // 에러 발생시 호출되는 콜백
            console.error(err);
            console.error('파일읽기 실패');
        });
    console.log(target + ' 파일을 읽도록 요청했습니다.');
} else {
    console.log(target + '파일이 존재하지 않습니다.');
}

