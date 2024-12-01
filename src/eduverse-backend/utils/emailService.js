// Tiện ích xử lý gửi email.

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Hoặc dịch vụ email khác
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const sendEmail = async (to, subject, template, context) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        html: getTemplate(template, context)
    };

    await transporter.sendMail(mailOptions);
};

const getTemplate = (template, context) => {
    // Logic để lấy template và thay thế các biến trong context
    // Ví dụ: return compiledTemplateString;
};

module.exports = { sendEmail };