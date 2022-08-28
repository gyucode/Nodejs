import{networkInterfaces} from 'os';

// OS모듈안의 Networkinterface기능을 가져와서 내 IP주소를 확인하는 기능

const myip = () => {
    const ipAddress = [];
    const nets = networkInterfaces();

    for (const attr in nets){
        const item = nets[attr];

        item.map((v, i) => {
            if (v.family == 'IPv4' && v.address != '127.0.0.1'){
                ipAddress.push(v.address);
            } 
        } );
    }
    return ipAddress;
};

const urlFormat = (urlObject) =>String(Object.assign(new URL("http://a.com"), urlObject));

const pagenation = (totalCount=0, nowPage=1, listCount=10, groupCount=5) => {
    // 전달된 파라미터가 정수 타입이 아니라면 정수로 변환
    totalCount =isNaN(totalcount) ? 0 : parseInt(totalCount);
    nowPage =isNaN(nowPage) ? 1 : parseInt(nowPage);
    listCount = isNaN(listCount) ? 10 : parseInt(listCount);
    groupCount = isNaN(groupCount) ? 5 : parseInt(groupCount);

    // 전체 페이지 수
    var totalPage = parseInt(((totalCount - 1)/listCount)) + 1;

    // 전체 그룹수
    var totalGroup = parseInt(((totalPage) - 1)/ (groupCount)) + 1;
    
    // 현재 페이지가 속한 그룹
    var nowGroup = parseInt(((nowPage -1)/ groupCount)) + 1;

    // 현재 그룹의 시작 페이지 번호
    var groupStart = parseInt(((nowGroup - 1) * groupCount)) + 1;

    // 현재 그룹의 마지막 페이지 번호
    var groupEnd = Math.min(totalPage, nowGroup * groupCount);

    // 이전 그룹의 마지막 페이지 번호
    var prevGroupLastPage = 0;
    if (groupStart > groupCount) { prevGroupLastPage = groupStart - 1; }

    // 다음 그룹의 시작 페이지 번호
    var nextGroupFirstPage = 0;
    if (groupend <totalPage) { nextGroupFirstPage = groupEnd + 1;}

    // LIMIT절에서 사용할 데이터 시작 위치
    var offset = (nowPage - 1) * listCount;

    // 리턴할 데이터들을 객체로 묶기
    return {
        nowPage : nowPage,
        totalCount : totalCount,
        listCount :  listCount,
        totalPage :totalPage,
        groupCount : groupCount,
        totalGroup : totalGroup,
        nowGroup :nowGroup,
        groupStart : groupStart,
        groupEnd : groupEnd,
        prevGroupLastPage : prevGroupLastPage,
        nextGroupFirstPage : nextGroupfirstPage,
        offset : offset
    };
};

export { myip, urlFormat, pagenation };