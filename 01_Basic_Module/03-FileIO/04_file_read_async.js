/** 1. 모듈 참조 */
import fs from 'fs';

/** 2. 필요한 변수 생성 */
const target = './output_async.txt'; // 읽어들일 파일의 경로

/** 3. 파일을 비동기식으로 파일 읽기 */
if (fs.existsSync(target)) {
    fs.readFileSync(target, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.debug(data); // 읽어들인 데이터 출력
    })
    console.debug(target + ' 파일을 읽도록 요청했습니다.');
} else {
    console.debug(target + '파일이 존재하지 않습니다.');
}