/** 1. 모듈 참조 */
import fs from 'fs';

/** 2. 필요한 변수 생성 */
const target = './output_async.txt'; // 저장할 파일의 경로()
const content = 'Hello World'; // 저장할 내용
const isExists = fs.existsSync(target); // 파일의 존재 여부 검사.

/** 3. 파일을 비동기식으로 파일 쓰기, 삭제 */
if (!isExists) {
    // 절대경로 지정, 비동기식 파일 저장
    fs.writeFile(target, content, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.debug(target + '에 데이터 쓰기 완료. ');

        // 퍼미션 설정
        fs.chmod(target, '0766', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.debug(target + '의 퍼미션 설정 완료');
        });
        console.debug(target + '의 퍼미션 설정을 요청했습니다.');
    });
    console.debug(target + '의 파일저장을 요청했습니다');
} else {
    fs.unlink(target, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.debug(target + '의 파일 삭제 완료');
    });
    console.debug(target + '의 파일 삭제를 요청했습니다.');
}

