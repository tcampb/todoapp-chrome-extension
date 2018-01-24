const async = require('async');
const express = require('express');
const userModel = require('../models/table/user')
const router = express.Router();
const jsforce = require('jsforce');
const config = require('../config/config.json');
const oauth2 = new jsforce.OAuth2({
    loginUrl : 'https://login.salesforce.com',
    clientId : config.clientIdSalesforce,
    clientSecret :  config.clientSecretSalesforce,
    redirectUri : 'http://localhost:3000/integrations/auth/salesforce/redirect'
  });


router.get('/', (req, res) => {
    res.render('integrations', {
        img: res.locals.user.picture,
        document: "integrations"
    });
})
//Handle salesforce connection
.get('/auth/salesforce', (req, res) => {
    res.redirect(oauth2.getAuthorizationUrl({ scope : 'api web refresh_token offline_access' }));
})
.get('/auth/salesforce/redirect', (req, res) => {
    const conn = new jsforce.Connection({ oauth2 : oauth2 });
    const code = req.param('code');
    conn.authorize(code, function(err, userInfo) {
    console.log(userInfo.id);
    if (err) { return console.error(err); }
    userModel.update({
        sf_token: conn.accessToken,
        sf_refresh_token: conn.refreshToken,
        sf_instance: conn.instanceUrl,
        sf_userId: userInfo.id
    }, {where: {id: res.locals.user.id}, returning: true})
    .then(res.redirect('/integrations'))
    .catch((err) => {console.log(err)})
})
})




module.exports = router;