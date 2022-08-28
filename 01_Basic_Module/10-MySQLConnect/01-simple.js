/** (1) mysql 모듈 불러오기 */
// npm install mysql2 --save
import mysql from 'mysql2';

/** (2) mysql 모듈 객체 생성 및 접속 정보 설정 */
const dbcon = mysql.createConnection({
    host: 'localhost',      // mysql서버주소 (다른PC인경우 IP주소).
    port: 3306,             // mysql포트번호.(처음에 설정해 줌)
    user: 'myschool',       // mysql의 로그인 할 수 있는 계정 이름
    password: '123qwe!@#',  // 비밀번호
    database: 'myschool'    // 사용하고자 하는 데이터베이스 이름
})

/** (3) 데이터베이스 접속 */
dbcon.connect((error) => {
    if (error) {
        console.error("데이터베이스 접속에 실패했습니다");
        console.error("error");
        return;
    }
    // 백엔드 개발자의 실력은 SQL의 능숙도.
    /** (4) INSERT, UPDATE, DELETE 쿼리 생성하기 */
    // 실행할 SQL구문
    // Node의 변수로 치환될 부분(주로 저장, 수정될 값)은 ?로 지정
    // 문자열이더라도 홑따옴표 사용 안함.(SQL문과 겹쳐서)
    const sql =   "INSERT INTO department (dname, loc) VALUES (?, ?)";
    // SQL문의 '?'를 치환할 배열 --> ? 군서대로 값을 지정한다.
    const input_data = ['Node학과', '공학관'];

    // 여기서 나는 에러는 db에관한 에러라서 node가 뻗지 않음.
    // 꼼꼼하게 해야 함.
    /** (5) SQL 실행하기 */
    dbcon.query(sql, input_data, (error, result) => {
        if (error) {
            console.log('SQL문 실행에 실패했습니다');
            console.log(error);
            dbcon.end(); //데이터베이스 접속 해제(종료)
            return;
        }

        // 저장결과 확인
        console.log('반영된 데이터의 수: ' + result.affectedRows);
        // UPDATE, DELETE 쿼리의 경우 사용할 수 없는 값임.
        console.log('생성된 PK값: ' + result.insertId);
        // 데이터베이스 접속 해제(중요)
        dbcon.end();
    });

})
