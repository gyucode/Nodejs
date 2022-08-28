// import logger from '../../helper/LogHelper.js'
import express from 'express';


// 이 파일에서 내보낼 백엔드 기능들을 정의할 함수.
export default (app) =>{

    // 라우터(URL 분배기) 객체 설정 --> 맨 마지막에 설정
    const router =express.Router();
    
    router.route('/page1').get((req, res, next) => {
        /** 방법(1) - router 기능을 사용 (권장) */
        // 브라우저에게 전달할 응답 내용
        let html = '<h1>Page1</h1>';
        html += '<h2>Express로 구현한 Node.js 백엔드 페이지</h2>';
    
        // 브라우저에게 전달할 결과코드
        res.status(200).send(html);
    });
    
    router.route('/page2').get((req, res, next) => {
        /** 방법(2) - express 기능을 사용 */
        // 브라우저에게 전달할 응답 내용
        let html = '<h1>Page2</h1>';
        html += '<h2>Node.js Backend Page</h2>';
    
        res.writeHead(200);
        res.write(html);
        res.end();
    });
    
    router.route('/page3').get((req, res, next) => {
        // 페이지 강제 이동
        res.redirect('https://www.naver.com');
    });

    return router;
};
