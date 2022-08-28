/** 1. 모듈 참조 */
import path from 'path';

/** 2. 경로 합치기 */
const currentPath = path.join('C:/Users/hello/world','myphoto', '../photo.jpg');
console.group("path.join");
console.debug(currentPath);
console.groupEnd();

/** 3. 경로에서 디렉토리, 파일명, 확장자 구분하기 */
const dirname = path.dirname(currentPath);
const basename = path.basename(currentPath);
const extname =  path.extname(currentPath);
console.group("경로 분할하기");
console.debug('디렉토리 : %s', dirname);
console.debug('파일 이름 : %s',basename);
console.debug('확정자 : %s', extname);
console.groupEnd();

/** 4. 경로정보 파싱*/
const parse = path.parse(currentPath);
console.group("경로정보 파싱");
console.debug("%o", parse);
console.debug("root: " + parse.root);
console.debug("dir: " + parse.dir);
console.debug("name: " + parse.name);
console.debug("ext: " + parse.ext);
console.groupEnd();
