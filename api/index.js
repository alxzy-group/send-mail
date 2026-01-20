const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send', async (req, res) => {
    const { auth_email, auth_pass, to, subject, message } = req.body;

    if (!auth_email || !auth_pass || !to) {
        return res.status(400).json({ success: false });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: auth_email,
            pass: auth_pass
        }
    });

    try {
        await transporter.sendMail({
            from: auth_email,
            to: to,
            subject: subject || "",
            text: message || ""
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send("API Active");
});

module.exports = app;
