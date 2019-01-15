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
async function main(fileName) {
    const res = await drive.files.create({
        requestBody: {
            name: fileName,
            mimeType: 'application/pdf'
        },
        media: {
            mimeType: 'application/pdf',
            body: fs.createReadStream(fileName)
        }
    })
    console.log(res.data.id);
    return res.data.id;
};


var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
    next();
});

app.post('/fileupload', upload.single('streamfile'),async function (req, res) {
    // let stream = fs.createReadStream(req.file)
    var as = req.body; // request infor text
    console.log(as);
    var a = await main(req.file.path) //request infor file
    console.log('req.file', a);

  res.end('success');
})

// Connect to Web Server
var port = '3000';
app.listen(port, () => {
    console.log('[Express] fileupload started at %d port', port)});