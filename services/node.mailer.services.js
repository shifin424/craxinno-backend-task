import transporter from '../config/node.mailer.js'; 

const MailerService = async (userEmail, userId) => {
    console.log(process.env.MAILER_EMAIL,userEmail,userId);
    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: userEmail,
        subject: 'Confirmation Email',
        html: `
            <p>Thanks for your submission!</p>
            <p>Here is a link to check your submitted information:</p>
            <a href="https://craxinno-technology.netlify.app/user/${userId}">Check Information</a>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

export default MailerService;
