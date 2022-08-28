/** 1. url 모듈 내에서 URL 클래스만 참조하기 */
import {URL} from 'url';

/** 2. 주소 문자열을 URL객체로 만들기 */
const myurl = 'http://www.itpaper.co.kr:8765/hello/world.html?a=123&b=456#home';

// URL의 각 성분을 분해 --> javascript의 location객체와 동일한 기능
const location = new URL(myurl);

console.group("URL 성분 정보 확인");
console.debug(location);
console.debug('href: ' + location.href);
console.debug('protocol: ' + location.protocol);
console.debug('port: ' + location.port);
console.debug('host: ' + location.host);
console.debug('hostname: ' + location.hostname);
console.debug('path: ' + location.path);
console.debug('pathname: ' + location.pathname);
console.debug('search: ' + location.search);
console.debug('query: ' + location.query);
console.debug('hash: ' + location.hash);
console.groupEnd();