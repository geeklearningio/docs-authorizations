const https = require("follow-redirects").https;
const unzipper = require("unzipper");
const q = require("q");
const fs = require("fs-extra");
const path = require("path");

function downloadFile(url, dest) {
    let deferal = q.defer();
    let file = fs.createWriteStream(dest);
    let request = https.get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
            deferal.resolve();
        });
    }).on("error", (err) => {
        deferal.reject(err);
    });

    return deferal.promise;
}

async function run() {
    await downloadFile('https://github.com/geeklearningio/gl-docs-theme/releases/download/0.1.0/gl-template.zip',
        './gl-template.zip');

    fs.ensureDirSync('./docfx_project/gl-template');

    await fs.createReadStream('./gl-template.zip')
        .pipe(unzipper.Extract({ path: path.join(__dirname, './docfx_project/gl-template') })).promise()
        .then((ok) => console.log('ok'), (err) => console.log('ko', err));
}

run();