/** 이벤트 핸들러 정의 부분 - 해당 이벤트가 발생하기 전까지는 호출되지 않는다 */
// 시스템 내장 이벤트 --> 프로세스가 종료하는 시점
process.on('exit', () => {
    console.debug('exit 이벤트 발생함.');
});

// 사용자 정의 이벤트
process.on('onSayHello', (a, b) => {
    console.debug('onsayHello 이벤트 발생함 : %s %s', a, b);
})

/** 프로그램 실행부 - 타이머로 2초 후에 동작할 기능을 예약 */
// 지정된 시간동안 대기 후, 콜백함수를 실행
setTimeout(()=>{
    console.debug('2초 후에 onSayHello 이벤트 전달 시도함.');
    // 개발자가 정의한 이벤트를 발생시키는 기능.
    process.emit('onSayHello', "Hello", "World");
}, 2000);

console.debug("------프로그램 흐름 종료-------");
