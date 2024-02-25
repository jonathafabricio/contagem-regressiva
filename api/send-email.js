const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
    try {
        const { recipient, subject, message } = req.body;

        const msg = {
            to: recipient,
            from: process.env.EMAIL_FROM,
            subject: subject,
            text: message,
        };

        await sgMail.send(msg);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).json({ error: 'Error sending email', details: error.toString() });
    }
};