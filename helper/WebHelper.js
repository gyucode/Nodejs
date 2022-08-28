import multer from 'multer';
import logger from './LogHelper.js';

const WebHelper = () =>{
    return (req, res, next) => {
        /** Express의 req, res의 기능을 확장 */
        // req.foo = () => { ... };
        // res.bar = () => { ... };

        /** GET, URL, POST, PUT, DELETE, 파라미터를 수신하여 값을 리턴하는 함수 */
        req._getParam = (method, key, def = null) => {
            // 파라미터를 HTTP전송방식에 따라 받는다.
            let value = null;

            // 1) undefined인 경우 def값으로 대체
            // --> 파라미터를 받지만 빈 문자열이거나 공백으로만 구성된 경우는 걸러내지 못한다.
            if(method.toUpperCase() === 'GET' ) {
                value = req.query[key] || req.params[key] || def;
            } else {
                value = req.body[key] || def;
            }

            if (value === undefined) {
                value = def;
            }

            if (value === underfined) {
                value = def;
            }

            // 2) 빈 문자열이거나 공백인 경우 걸러내기
            if (value !== null && typeof value == 'string'){
                value = value.trim();

                if (value.length === 0){
                    value = def;
                }
            }
            logger.debug('[HTTP %s Params] %s=%s', method, key, value);
            return value;
        };

        /** get 파라미터 수신 함수 --> _get_param 함수를 호출한다 */
        req.get = function(key, def) {
            return this._getParam('GET',key, def);
        };

        /** post 파라미터 수신 함수 --> _get_param 함수를 호출한다 */
        req.post = function(key, def) {
            return this._getParam('POST',key, def);
        };

        /** put 파라미터 수신 함수 --> _get_param 함수를 호출한다 */
        req.put = function(key, def) {
            return this._getParam('PUT',key, def);
        };

        /** delete 파라미터 수신 함수 --> _get_param 함수를 호출한다 */
        req.delete = function(key, def) {
            return this._getParam('DELETE',key, def);
        };

        /** 프론트엔드에게 JSON결과를 출력하는 기능 */
        res._sendResult = (statusCode, data) => {
            res.status(statusCode).send(data);
        };

        /** 결과가 200(OK)인 경우에 대한 JSON출력 */
        res.sendResult = (data) => {
            res._sendResult(200, data);
        };

        /** 에러처리 출력 */
        res.sendError = (error) =>{
            logger.error(error.name);
            logger.error(error.message);
            logger.error(error.stack);

            if(error.statusCode == undefined) {
                error.statusCode = 500;
            }

            res._sendResult(error.statusCode, error.message);
        };

        /** 메일 발송 */
        res.sendMail = async (receiver, subject, content) => {
            /** 발송에 필요한 서버 정보를 사용하여 발송 객체생성 */
            const smtp = nodemailer.createTransport(config.sendmail_info);

            /** 메일발송 요청 */
            try {
                await smtp.sendMail({
                    // Node 관리자 <leekh4232@gmail.com>
                    from: '${config.sendmail_info.auto.name} < ${config.sendmail_info.auto.user}>',
                    to: receiver,
                    subject: subject,
                    html: content
                });
            } catch (err) {
                // 이 함수(res.senMail)를 호출한 곳으로 에러를 전달
                throw err;
            }
        };

        /** 업로드 초기화 */
        req.getMultipart = () => {
            const multipart =multer({
                /** 저장될 디렉토리 경로 및 파일이름 */
                storage: multer.diskStorage({
                    /** 업로드 될 파일이 저장될 디렉토리 설정 */
                    destination: (req, file, callback) => {
                        //폴더 생성
                        fileHelper.mkdirs(config.upload.dir);
                        fileHelper.mkdirs(config.thumbnail.dir);

                        // 업로드 정보에 백엔드의 업로드 파일 저장 폴더 위치 추가한다.
                        file.dir = config.upload.dir.replace(/\\/gi,'/');

                        // Multer 객체에게 업로드 경로를 전달
                        callback(null, config.upload.dir);
                    },
                    filename: (req, file, callback) =>{
                        // 파일 확장자만 추출 --> .png
                        const extName = path.extname(file.originalname);
                        //파일이 저장될 이름(현재시각)
                        const saveName = new Date().getTime().toString() + extName.toLowerCase();

                        // 업로드 정보에 백엔드의 업로드 파일 이름을 추가한다.
                        file.savename =saveName;
                        file.path = path.join(file.dir, saveName);

                        //업로드 정보에 파일에 접근할 수 있는 URL값 추가
                        file.url =path.join('/upload', savename).replace(/\\/gi,'/');
                        // 구성된 정보를 req 객체에게 추가
                        if (req.file instanceof Array){
                            req.file.push(file);
                        } else{
                            req.file = file;
                        }
                        callback(null, saveName);
                    },
                }),
                /** 용량 최대 업로드 파일 수 제한 설정 */
                limits: {
                    files:5,
                    fileSize: 1024*1024*20,
                },
                /** 업로드 될 파일의 확장자 제한 */
                fileFilter: (req, file, callback) => {
                    // 파일의 종류 얻기
                    var mimetype =file.mimetype;

                    // 파일 종류 문자열에 "image/"가 포함되어 있지 않은 경우
                    if (mimetype.indexOf('image/') == -1){
                        const err = new Error();
                        err.result_code = 500;
                        err.result_msg = '이미지 파일만 업로드 가능합니다';
                        return callback(err);
                    }
                    callback(null, true);
                }
            });

            return multipart;
        };

        // express의 그 다음 처리 단계로 넘어간다.
        next();
    }
}

export default WebHelper;