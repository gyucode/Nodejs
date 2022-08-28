/*---------------------------------------------------------
 * 로그 처리 모듈
 *---------------------------------------------------------*/

/** 1) 패키지 참조 */
import config from './_config.js';
import {mkdirs} from './FileHelper.js';
import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'

/** 2) 로그가 저장될 폴더 생성 */
mkdirs(config.log.debug.path);
mkdirs(config.log.error.path);

/** 3) 로그가 출력될 형식 지정 함수 참조 */
const { combine, timestamp, printf, splat, simple } = winston.format;

/** 4) winston 객체 만들기 */
const logger = winston.createLogger({
    // 로그의 전반적인 형식
    format: combine(
        timestamp({
            // 날짜 출력형식은 https://day.js.org/docs/en/display/format 참고 
            //format: 'YYYY-MM-DD HH:mm:ss',
            format: 'YY/MM/DD HH:mm:ss.SSS',
        }),
        printf((info) => {
            return `${info.timestamp} [${info.level}] ${info.message}`;
        }),
        splat()
    ),
    // 일반 로그 규칙 정의
    transports: [
        // 하루에 하나씩 파일 형태로 기록하기 위한 설정
        new winstonDaily({
            name: 'debug-file',
            level: config.log.debug.level,  // 출력할 로그의 수준. 저정된 수준보다 중요도 높은 값만 출력
            datePattern: 'YYMMDD',          // 파일 이름에 표시될 날짜형식
            dirname: config.log.debug.path, // 파일이 저장될 위치
            filename: 'log_%DATE%.log',     // 파일이름 형식. %DATE%는 datePattern의 값
            maxsize: 50000000,
            maxFiles: 50,
            zippedArchive: true,
        }),

        // 하루에 하나씩 파일 형태로 기록하기 위한 설정
        new winstonDaily({
            name: 'error-file',
            level: config.log.error.level,
            datePattern: 'YYMMDD', // 날짜형식
            dirname: config.log.debug.path,
            filename: 'error_%DATE%.log',
            maxsize: 50000000,
            maxFiles: 50,
            zippedArchive: true,
        }),
    ],
});

/** 5) 콘솔 설정 */
// 프로덕션 버전(=상용화 버전)이 아니라면?
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            prettyPrint: true,
            showLevel: true,
            level: config.log.debug.level,
            format: combine(
                winston.format.colorize({
                    all:true
                })
            )
        })
    );
}

/** 6) 모듈 내보내기 */
export default logger;