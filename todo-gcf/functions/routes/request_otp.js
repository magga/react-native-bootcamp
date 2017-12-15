const admin = require('firebase-admin');
const axios = require('axios');

module.exports = (req, res) => {
    if (!req.body.phone) {
        return res.status(422).send({ message: 'Bad Input. Please provide a phone number' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    admin.auth().getUser(phone)
        .then((user) => {
            sendOTP(phone, res);
        })
        .catch((error) => {
            createUser(phone, res);
        });
};

const createUser = (phone, res) => {
    admin.auth().createUser({ uid: phone })
        .then((user) => {
            sendOTP(phone, res);
        })
        .catch((error) => {
            return res.status(422).send({ 
                message: "Create User Error",
                errorMessage: error.message,
                error: error
            });
        });
}

const sendOTP = (phone, res) => {
    const code = Math.floor(Math.random() * 8999 + 1000);

    var body = {
        destination: [phone],
        text: `Kode OTP anda adalah : ${code}`,
    }
    var headers = {
        'client-id': "YXpRKz1F",
        'client-secret': "QZEhXDhS",
        'content-type': "application/json"
    }
    axios({
        method: "POST",
        url: "https://mesabot.com/api/v2/send",
        data: body,
        headers: headers
    })
    .then(() => {
        saveOTPToDatabase(phone, code, res);
        return res.status(200).send({ message: "OTP sent" });
    }).catch((error) => {
        // res.status(422).send(err);
        return res.status(422).send({ 
            message: "Send Message Error",
            errorMessage: error.message,
            error: error
        });
    })
}

const saveOTPToDatabase = (phone, code, res) => {
    admin.database().ref('users/' + phone).update({ code: code, valid: true })
        .then(() => {
            res.status(200).send({ message: `OTP berhasil dikirim ke ${phone}` });
        })
        .catch((error) => {
            return res.status(422).send({ 
                message: "Save OTP Error",
                errorMessage: error.message,
                error: error
            });
        });
}
