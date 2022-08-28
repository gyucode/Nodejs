import logger from '../../helper/LogHelper.js';
import pool from '../../helper/DBPool.js';
import regexHelper from '../../helper/RegexHelper.js';
import express from 'express';
import BadRequestException from '../../exceptions/BadRequestException.js';

/** 백엔드 기능들을 정의한 함수를 내보냄 */
export default () => {
    /** 라우터(URL 분배기) 객체 설정 --> 맨 마지막에 설정 */
    const router = express.Router();

    /**
     * 에러처리 테스트를 위한 임시
     */
    router.get('/error_test', (req, res, next) =>{
        const e = new BadRequestException('개발자가 직접 생성한 에러가 발생하였습니다.');

        // app.js에 명시되어 있는 다음번 app.use()를 호출한다.
        // 단 app.use()는 에러객체를 파라미터로 받는 콜백이 연결되어 있어야 한다.
        next(e);
    });

    /**
     * 에러처리 테스트를 위한 임시
     */
    router.get('/result_test', (req, res, next) => {
        let num1 = req.get("num1");
        let num2 = req.get("num2");

        try{
            regexHelper.value(num1, "num1의 값이 없습니다.");
            regexHelper.num(num1, "num1은 숫자 형식만 가능합니다.");
            regexHelper.value(num2, "num2의 값이 없습니다.");
            regexHelper.num(num2, "num2은 숫자 형식만 가능합니다.");
        } catch (err) {
            return next(err);
        }

        num1 = parseInt(num1);
        num2 = parseInt(num2);
        logger.debug("num1+num2=%d", num1 + num2);

        res.sendResult({ params1:num1, params2: num2, resultL: num3});
    });


    /** 전체 목록 조회(페이지 번호 구현 --> Read(SELECT)) */
    router.get("/department", async (req, res, next) => {
        // 검색어 파라미터 받기 ->검색어가 없을 경우 전체 목록 조회이므로 유효성 검사 안함.
        const query = req.get('query');

        // 현재 페이지 번호 받기 (기본값은 1)
        const page = req.get('page', 1);

        // 한 페이지에 보여질 목록 수 받기 (기본값은 10, 최소 10, 최대 30)
        const rows = req.get('rows',10);

        // 데이터 조회 결과가 저장될 빈 변수
        let json = null;
        let dbcon = null;

        // 에러가 발생하거나 사용이 종료된 경우 반드시 임대한 접속객체를 반납해야 한다.
        try {
            dbcon =await pool.getConnection();

            // 데이터 조회
            let sql = 'SELECT deptno, dname, loc FROM department';

            // SQL문에 설정할 치환값
            let args = [];

            if (query != null) {
                sql += "WHERE dname LIKE concat('%', ? , '%')";
                args.push(query);
            }

            const [result] = await dbcon.query(sql, args);

            // 조회 결과를 미리 준비한 변수에 저장함.
            json = result;
        } catch (err) {
            return next(err);
        } finally {
            if (dbcon) { dbcon.release();}
        }

        res.sendResult(json);
    });

    /** 데이터 추가 --> create(INSERT) */

    /** 데이터 수정 */
    let json =null;

    // try {
        // dbcon = awiat poo
    // }

    // return router;
};