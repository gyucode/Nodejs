/** (1) mysql 모듈 불러오기 */
import mysql from 'mysql2/promise';
import config from '../helper/_config.js';

/** (2) mysql 모듈 객체 ㅅ생성 및 접속 정보 설정 */
const pool = mysql.createPool(config.database);

/** (3) pool 객체가 지워하는 이벤트 정의 */
pool.on('connection', (connection) => {
    console.debug(' >> Database 접속됨 [threadId=%d]', connection.threadId);
});

pool.on('acquire', (connection) => {
    console.debug(' >> Connection 임대됨 [threadId=%d]', connection.threadId);
});

pool.on('enqueue', ()=> {
    console.debug(' >> 접속이 진행중이거나 모두 임대되어 반납을 기다리는 중...');
});

pool.on('release', (connection) => {
    console.debug(' >> Connection 반납됨 [threadId=%d]', connection.threadId);
});

(async () => {
    let dbcon =null;

    /** (4) 커넥션 풀에서 접속객체 하나를 임대함 */
    // 에러가 발생하거나 사용이 종료된 경우 반드시 임대한 접속객체를 반납해야 한다.
    try {
        dbcon = await pool.getConnection();
    } catch (err) {
        console.error("접속객체 임대에 실패했습니다.");
        console.error(err);
        // 임대한 자원이 있다면 반드시 반납해야 함.
        if (dbcon) { dbcon.release();}

        // Connection Pool 접속 해제 (실 시스템에서는 사용할 일 없음)
        pool.end();
        return;
    }

    /** (5) 정상 접속이 되었다면 SQL문 실행하기 */
    const sql = 'SELECT * FROM professor WHERE deptno=?';
    const input_data = ['101'];

    try {
        const [result] = await dbcon.query(sql, input_data);

        result.map((v, i) => {
            console.log("%s %s\t 급여: %d만원\t 입사일: %s", v.name, v.position, v.sal, v.hiredate);
        });        
    } catch (err) {
        console.error("SQL문 수행에 실패했습니다.");
        console.error(err);
        return;
    } finally{
        if (dbcon) { dbcon.release(); }

        // Connection Pool 접속 해제 (실시스템에서는 사용할 일 없음)
        pool.end();
    }
})();