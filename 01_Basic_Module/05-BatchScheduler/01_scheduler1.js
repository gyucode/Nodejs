/** 1. 필요한 패키지 참조하기 */
import logger from '../helper/LogHelper.js';
import dayjs from 'dayjs';
import schedule from 'node-schedule';

/** 2. 예약작업이 실행될 시간 */
// 현재시각
const atTime = dayjs();
logger.debug(atTime.format('HH:mm:ss'));

// 5초 후 시각
const afTime = dayjs();
logger.debug(atTime.format('HH:mm:ss'));

/** 3. 5초 후에 자동으로 실행되는 예약 작업을 생성 */
// js의 Date객체를 추출
const jsDate = afTime.toDate();
schedule.scheduleJob(jsDate, ()=> {
    logger.debug('5초 후 예약된 작업이 수행되었습니다.');
});

logger.debug(afTime.format('HH:mm:ss') + ' 에 작업이 예약되었습니다.');