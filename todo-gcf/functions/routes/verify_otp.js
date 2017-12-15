const admin = require('firebase-admin');

module.exports = (req, res) => {
    if (!req.body.phone || !req.body.code) {
        return res.status(422).send({ message: 'Bad Input. Please provide a phone number and code' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);

    admin.auth().getUser(phone)
        .then((userRecord) => {
            const ref = admin.database().ref('users/' + phone);

            ref.on('value', (snapshot) => {
                ref.off();

                const user = snapshot.val();

                if (user.code !== code) {
                    return res.status(422).send({ message: 'Code is not valid' });
                }

                if (!user.valid) {
                    return res.status(422).send({ message: 'Code is already been used' });
                }

                ref.update({ valid: false });
                
                admin.auth().createCustomToken(phone)
                    .then((token) => {
                        res.send({ token: token});
                    });
            });
        })
        .catch((error) => {
            return res.status(422).send(error);
        });
};