// Tiện ích xử lý gửi email.

/*const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, template, context) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: `Click vào liên kết để đặt lại mật khẩu: ${context.RESET_LINK}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };*/


const transporter = require('../config/emailConfig');

const sendEmail = async (to, subject, template, context) => {
    try {
        const htmlTemplate = getTemplate(template, context); // Hàm này tạo template HTML từ file template
        const mailOptions = {
            from: 'your-email@gmail.com',
            to,
            subject,
            html: htmlTemplate
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Lỗi khi gửi email: ', error);
        throw new Error('Không thể gửi email');
    }
};

const getTemplate = (templateName, context) => {
    // Ví dụ về việc lấy template HTML từ file. Bạn có thể sử dụng các thư viện template như Handlebars.
    return `<html><body>${context.RESET_LINK}</body></html>`;
};

module.exports = sendEmail;