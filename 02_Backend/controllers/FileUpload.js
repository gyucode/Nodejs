import multer from "multer";
import config from "../../helper/_config.js";
import { mkdirs } from "../../helper/FileHelper";

import path from 'path';
import express from 'express';
import multer from "multer";
import thumbnail from 'node-thumbnail';

/**백엔드 기능들을 정의한 함수를 내보냄 */
export default () => {
    /** 라우터(URL 분배기) 객체 설정 --> 맨 마지막에 설정*/
    const router = express.Router();

    /** multer 객체 생성 --> 파일 제한 5개, 20M */
    const multipart =multer({
        /** 저장될 디렉토리 경로 및 파일이름 */
        storage: multer.diskStorage({
            /**업로드 된 파일이 저장될 디렉토리 설정 */
            // req는 요청정보, file은 최종적으로 업로드 된 결과 데이터가 저장되어 있을 객체
            destination: (req, file, callback) =>{
                /** */
                console.group('destination');
                console.debug(file);
                console.groupEnd();

                //폴더 생성
                mkdirs(config.upload.dir);
                mkdirs(config.thumbnail.dir);

                file.dir =config.upload.dir.replace(/\\/gi,'/');

                callback(null, config.upload.dir);
            },
            filename: (req, file, callback) => {
                console.group('filename');
                console.debug(file);
                console.groupEnd();

                // 파일의 확장자만 추출 --> .png
                const extName = path.extname(file.originalname);
                
                const saveName = new Date().getTime().toString() + extName.toLowerCase();

                //  업로드 정보에 백엔드의 업로드 파일 이름을 추가한다.
                file.saveName = saveName;
                file.path = path.join(file.dir, saveName);
                // 업로드 정보에 파일에 접근할 수 있는 URL값 추가
                file.url = path.join('/upload',saveName).replace(/\\/gi,'/');
                // 구성된 정보를 req객체에게 추가
                if (req.file instanceof Array) {
                    req.file.push(file);
                } else{
                    req.file =file;
                }

                callback(null, saveName);
            },
        }),
        /**용량 최대 업로드 파일 수 제한 설정 */
        limits: {
            files: config.upload.max_count,
            fileSize: config.upload.max_size,
        }
    })
}