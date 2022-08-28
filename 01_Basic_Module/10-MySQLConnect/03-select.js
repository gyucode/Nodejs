/** (1) mysql 모듈 불러오기 */
import mysql2 from 'mysql2/promise';
import config from '../helper/_config.js';


(async () => {
    let dbcon =null;

    try {
        /** (2) mysql 모듈 객체 생성 및 접속 정보 설정 및 접속 */
        dbcon = await mysql2.createConnection(config.databse);
        await dbcon.connect();

        /** (3) SQL 실행하기 */
        const sql = 'SELECT * FROM professor';
        const [result1] = await dbcon.query(sql);
        // console.log(result1);

        result1.map((v, i) => {
            console.log("%s%s\t\t 급여: %d만원\t\t 입사일: %d", v.name, v.position, v.sal, v.hiredate);
        });

        // 실제 resstful api를 구현할 경우에는 json을 응답결과로 전달하면 되므로
        // sql 조회 결과에 대해서 별도의 반복문을 처리하지는 않고 리턴받은 result1을 통째로 응답결과로 사용하면 된다.
    } catch (err) {
        console.log(err);
        return;
    } finally {
        console.log("~~~~~~~~ DB 접속 해제 ~~~~~~~~~");
        if (dbcon) {
            dbcon.end();
        }
    }
})();