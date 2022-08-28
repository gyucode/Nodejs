import config from '../../helper/_config.js';
import logger from '../../helper/Loghelper.js';
import express from 'express';
import nodemailer from 'nodemailer';

/** 백엔드 기능들을 정의한 함수를 내보냄 */
export default () =>{
    /** 라우터(URL 분배기) 객체 설정 --> 맨 마지막에 설정 */
    const router = express.Router();

    // public/06_mail.html
    router.post('/send_mail', async (req, res, next) => {
        /** 1) 프론트엔드에서 전달한 사용자 입력값 */
        const writer_name = req.body.writer_name;
        let writer_email = req.body.writer_email;
        const receiver_name =req.body.receiver_name;
        let receiver_email = req.body.recevier_email;
        const subject = req.body.subject;
        const content = req.body.content;

        /** 2) 보내는 사람, 받는 사람의 메일주소와 이름 */
        // 보내는 사람의 이름과 주소
        // --> 외부 SMTP연동시 주의사항- 발신주소가 로그인 계정과 다를 경우 발송이 거부됨
        if (writer_name) {
            // ex 이광호 <leekh4232@gmail.com>
            writer_email = writer_name + ' <' + writer_email + '>';
        }

        // 받는 사람의 이름과 주소
        if (receiver_name) {
            receiver_email = receiver_name + ' <' + receiver_email + '>';
        }

        /** 3) 메일 발송정보 구성 */
        const send_info ={
            from: writer_email,
            to: receiver_email, 
            subject: subject,
            html: content
        };
        
        /** 4) 발송에 필요한 서버 정보를 사용하여 발송객체 생성 */
        // const smtp = nodemailer.createTransport({
        //     host: 'smtp.gmail.com', //SMTP 서버명 : smtp.gmail.com
        //     port: 465,              //SMTP 포트 : 465
        //     secure: true,           //보안연결(SSL)필요
        //     auth: {
        //         user: '자신의_Gmail주소',
        //         pass: '자신의_앱비번',
        //     }
        // });
        const smtp = nodemailer.createTransport(config.sendmail_info);

        /** 메일 발송 요청 */
        let rt = 200;
        let rtMsg = "OK";

        try {
            await smtp.sendMail(send_info);
        } catch (err) {
            rt = 500;
            rtMsg =err.message;
        }

        res.status(rt).send(rtMsg);

    });
    return router;
}