const { google } = require('googleapis');
const fs = require('fs');
const config = require('./config');


var oauth2Client = new google.auth.OAuth2(config.YOUR_CLIENT_ID, config.YOUR_CLIENT_SECRET, config.YOUR_REDIRECT_URL);
oauth2Client.credentials = {
    refresh_token: config.REFRESH_TOKEN
};

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});
async function main() {
    const res = await drive.files.create({
        requestBody: {
            name: 'name.pdf',
            mimeType: 'application/pdf'
        },
        media: {
            mimeType: 'application/pdf',
            body: fs.createReadStream('name.pdf')
        }
    })
    console.log(res.data.id);
    return res.data.id;
};

main();