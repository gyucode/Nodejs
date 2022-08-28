import fs from 'fs'
import {join} from 'path'
// var fs = require('fs');		// FileSystem 모듈
// var path = require('path');	// 경로문자열 제어 모듈

/**
 * 디렉토리를 순환적으로 생성한다.
 * @param  {String} target     생성할 경로 문자열
 * @param  {int} 	permission 부여할 퍼미션
 * @return {void}   
 */
const mkdirs = (target, permission='0755') =>{
    // 경로가 없다면 수행하지 않는다.
    if (target == undefined || target == null) { return; }

    // 윈도우의 경우 '\'를 '/'로 변환.
    target = target.replace(/\\/gi, "/");

    // 주어진 경로값을 "/"단위로 자른다.
    const target_list = target.split("/");
    // 한 단계씩 생성되는 폴더 깊이를 누적할 변수
    let dir = '';

    // 주어진 경로가 절대경로 형식이라면 경로를 누적할 변수를 "/"부터 시작한다.
    if (target.substring(0, 1) == "/") {
        dir = "/";
    }

    // 윈도우의 경우 하드디스크 문자열을 구분하기 위해 ":"이 포함되어 있다.
    if (target_list[0].indexOf(":") > -1) {
        target_list[0] += "/"
    }

    // 잘라낸 단계만큼 반복한다.
    for (let i=0; i<target_list.length; i++) {
        // 현재 위치의 폴더 이름을 누적값에 덧붙임
        dir = join(dir, target_list[i]);

        // 현재 폴더를 의미한다면 증감식으로 이동
        if (target_list[i] == ".") {
            continue;
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.chmodSync(dir, permission);
        }
    }
};

export {mkdirs}