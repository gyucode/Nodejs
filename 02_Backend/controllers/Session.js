import logger from '../../helper/LogHelper.js';
import express from 'express';

/** 백엔드 기능들을 정의한 함수를 내보냄 */
export default () => {
    /** 라우터(URL 분배기) 객체 설정 --> 맨 마지막에 설정 */
    const router =express.Router();

    // Insomnia로 테스트
    router
        .post('/session', (req, res, next) => {
            // POST로 전송된 변수값을 추출
            const username = req.body.username;
            const nickname = req.body.nickname;

            // 세션 저장
            req.session.username = username;
            req.session.nickname = nickname;

            // 결과 응답
            const json = { rt: 'ok'};
            res.status(200).send(json);
        })
        .get('/session', (req, res, next) => {
            // 저장되어 있는 모든 session값 탐색
            for (let key in req.session) {
                const str = '[session] ' + key + '=' + req.session[key];
                logger.debug(str);
            }

            // 세션 데이터를 JSON으로 구성후 클라이언트에게 응답으로 전송
            const my_data = {
                username: req.session.username,
                nickname: req.session.nickname,
            }

            res.status(200).send(my_data);
        })
        .delete('/session', async (req, res, next) =>{
            let result = 'ok';
            let code = 200;

            try{
                await req.session.destroy();
            } catch (e) {
                logger.error(e.message);
                result = e.message;
                code = 500;
            }

            const json ={ rt: result };
            res.status(code).send(json);
        });

    // 05_login.html
    router
        .post('/session/login', (req, res, next) =>{
            const id = req.body.userid;
            const pw = req.body.userpw;

            logger.debug('id=' + id);
            logger.debug('pw=' + pw);

            let login_ok =false;
            if (id == 'node' && pw == '1234' ){
                logger.debug('로그인 성공');
                login_ok = true;
            }

            let result_code =null;
            let result_msg = null;

            if (login_ok) {
                req.session.userid = id;
                req.session.userpw = pw;
                result_code = 200;
                result_msg = 'ok';
            } else {
                result_code = 403;
                result_msg = 'fail';
            }

            const json = { rt: result_msg };
            res.status(result_code).send(json);
        })
        .delete('/session/login', async (req, res, next) =>{
            let result ='ok';
            let code = 200;

            try {
                await req.session.destroy();
            } catch (e) {
                logger.error(e.message);
                result = e.message;
                code = 500;
            }

            const json = { rt: result };
            res.status(code).send(json);
        })
        .get('/session/login', (req, res, next) => {
            const id = req.session.userid;
            const pw = req.session.userpw;

            let result_code = null;
            let result_msg = null;

            if (id !== undefined && pw !== undefined) {
                logger.debug('현재 로그인중이 맞습니다');
                result_code = 200;
                result_msg = 'ok';
            }
            const json = { rt: result_msg }
            res.status(result_code).send(json);
        });

    return router;
}