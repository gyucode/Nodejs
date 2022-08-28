import {mkdirs} from '../helper/FileHelper.js';
import path from 'path';

// 상대 경로 방식으로 폴더 생성하기
// --> VS Code가 열고 있는 프로젝트 폴더 기준.
var target1 = './test/dir/make';
console.log(target1);
mkdirs(target1);

// 절대경로 방식으로 폴더 생성하기
// __dirname --> VSCode가 열고 있는 프로젝트 폴더
const __dirname = path.resolve();
var target2 = path.join(__dirname, 'hello/node/js');
console.log(target2);
mkdirs(target2);