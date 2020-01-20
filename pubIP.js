const publicIp = require('public-ip');
const internalIp = require('internal-ip');
const csvappend = require ('csv-append');
const fs = require('fs');
const date = require('date-and-time');

const now = new Date();
const RELATIVE_PATH_TO_CSV = `./log.csv`;
const { append, end } = csvappend.csvAppend(RELATIVE_PATH_TO_CSV, true);

(async () => {
    return Promise.all([publicIp.v4(),internalIp.v4()]).then(function([ext, int]) {
        async () => {
            append([{ Date: date.format(now, 'YYYY/MM/DD HH:mm:ss'), ExternalIP: ext, InternalIP: int} ]);
            await end();
            fs.readFileSync(RELATIVE_PATH_TO_CSV, { encoding: "utf8" });
        }; 
    })
})();