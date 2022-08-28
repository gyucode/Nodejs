/** 1. 모듈 참조 */
import fs from 'fs';

/** 2. 필요한 변수 생성 */
var target ='./docs';

if (!fs.existsSync(target)) {
    // 파라미터 --> 경로, 퍼미션, 콜백함수
    fs.mkdir(target, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        fs.chmodSync(target, '0777');
        console.log('새로운 %s 폴더를 만들었습니다.', target);
    });
    console.log('%s 폴더의 생성을 요청했습니다.', target);
} else {
    // 파일 삭제 --> 비어있지 않은 폴더는 삭제 못함.
    fs.rmdir(target, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('%s 폴더를 삭제했습니다.', target);
    });
    console.log('%s 폴더의 삭제를 요청했습니다.', target );
}
