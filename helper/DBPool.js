/** (1) mysql 모듈 불러오기 */
import mysql from 'mysql2/promise';
import config from './_config.js';
import logger from './LogHelper.js';

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

// 프로그램 종료시 발생되는 이벤트
process.on('exit', function(){
    pool.end();     // pool의 데이터베이스 접속 해제
    logger.debug(" >> 모든 DATABASE 접속이 해제됨")
});

export default pool;