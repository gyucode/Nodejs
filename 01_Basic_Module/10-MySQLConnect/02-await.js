/** (1) mysql 모듈 불러오기 */
// npm install --save mysql2
import mysql2 from 'mysql2/promise';
import config from '../helper/_config.js'

(async () => {
    let dbcon =null;

    try {
        dbcon = await mysql2.createConnection(config.database);
        await dbcon.connect();

        /** (3) SQL 실행하기 */
        let sql = 'INSERT INTO department (dname, loc) VALUES (?, ?)';
        let input_data = ['Node학과','공학관'];

        // insert의 결과는 반환되는 객체는 워소가 1개인 배열이다.
        const result1 = await dbcon.query(sql, input_data);
        console.log(result1[0].affectedRows);
        console.log(result1[0].insertId);
        const firstId = result1[0].insertId;

        // 그러므로 아래와 같이 비구조 문법 적용이 가능하다.
        input_data = ['SQL학과', '공학관'];
        const [result2] = await dbcon.query(sql, input_data);
        console.group("INSERT 처리 결과");
        console.log('저장된 데이터의 수: ' + result2.affectedRows);
        console.log('생성된 PK값: ' + result2.insertId);
        console.groupEnd();

        // 한번 더 비구조 문법을 적용할 수 도 있다.
        input_data = ['백엔드학과', '공학관'];
        const [{affectedRows, insertId}] = await dbcon.query(sql, input_data);
        console.group("INSERT 처리 결과");
        console.log('저장된 데이터의 수: ' + affectedRows);
        console.log('생성된 PK값: ' + insertId);
        console.groupEnd();

        // UPDATE절 수행 --> WHERE절의 지정이 중요하다.
        const [result3] = await dbcon.query('UPDATE department SET dname=? WHERE deptno >= ?', ["수정학과", firstId]);
        console.group("UPDATE 처리 결과");
        console.log('수정된 데이터의 수: ' + result3.affectedRows);
        console.groupEnd();    
    } catch (err){
        console.log(err);
        return;        
    } finally {
        console.log("~~~~~~~~~DB 접속 해제~~~~~~~~~~~");
        if (dbcon) {
            dbcon.end();
        }
    }
})();