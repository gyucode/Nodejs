import {join, resolve} from 'path';
// const path = require('path');

const __dirname = resolve();

export default {
    /** 로그 파일이 저장될 경로 및 출력 레벨 */
    log: {
        // 개발자가 필요에 의해 기록하는 정보들을 저장할 파일
        debug: {
            path: join(__dirname, '../_files/_logs'),
            level: 'debug',
        },
        // 시스템에 심각한 문제가 발생했을 때의 정보를 저장할 파일
        error: {
            path: join(__dirname, '../_files/_logs'),
            level: 'error',
        },
    },

    /**웹서버 포트번호 */
    server_port: 3000,

    /** public 디렉토리 경로 */
    public_path: join(__dirname, '/public'),

    /** favicon 경로 */
    favicon_path: join(__dirname, '/public/favicon.png'),

    /** 쿠키 저장시 사용할 도메인 */
    // 1) localhost인 경우 공백으로 설정
    // 2) 도메인이 itpaper.co.kr인 경우 앞에 점을 붙여서 명시 -->".itpaper.co.kr"
    cookie_domain: '',

    /** 보안키 (암호화 키) */
    secure: {
        cookie_encrypt_key:'1234567890',
        session_encrypt_key:'1234567890'
    },

    /** 메일 발송 정보 */
    sendmail_info: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'leekh4232@gmail.com',
            pass: 'jdkknqarxodbbadr'
        },
    },

    /** 업로드 경로 */
    upload:{
        path: '/upload',
        dir: join(__dirname, '/_files/upload'),
        max_size: 1024*1024*20,
        max_count:10,
    },

    /** 썸네일 이미지 생성 경로 */
    thumbnail:{
        path:'/thumb',
        sizes: [480, 640, 720, 1080],
        dir: join(__dirname, '/_files/thumb'),
    },

    // /** 데이터베이스 연동 정보 */
    // database: {
    //     host: 'localhost',      // mysql서버주소 (다른PC인경우 IP주소).
    //     port: 3306,             // mysql포트번호.(처음에 설정해 줌)
    //     user: 'myschool',       // mysql의 로그인 할 수 있는 계정 이름
    //     password: '123qwe!@#',  // 비밀번호
    //     database: 'myschool'    // 사용하고자 하는 데이터베이스 이름
    // }
    /** 데이터베이스 연동 정보 */
    database: {
        host: 'localhost',          // MYSQL 서버 주소 (다른 PC인 경우 IP주소)
        port: 3306,                 // MySQL 설치시 기본값 3306
        user: 'myschool',           // 접근 권한 아이디 (root=관리자)
        password: '123qwe!@#',      // 설치시 입력한 비밀번호
        database: 'myschool',       // 사용할 데이터베이스 이름
        connectionLimit: 10,        // 최대 커넥션 수
        connectTimeout: 2000,       // 커넥션 타임아웃
        waitForConnections: true,   // 커넥션 풀이 다 찬 경우 처리

        // ----------- DB세션을 활용하기 위한 설정 -------
        // 세션 만료시간.(지정된 시간동안 페이지 이동이 없을 경우 로그아웃)
        checkExpirationinterval : 900000,
        // 최대 유효 세션수 (최대 동접자 수)
        createDatabaseTable: true,
        // DB 테이블 구조
        schema:{
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }
};