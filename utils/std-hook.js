const fs = require('fs');
const path = require('path');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');

const defaults = {
    maxLogSize: 10485760
};

class StdHook {

    constructor(filePath, std, settings = {}) {
        this.filePath = filePath;
        this.std = std;
        this.settings = settings;
        this.promise = null;
        this.defaultWrite = null;
    }

    register() {

        let hook = this;
        hook.defaultWrite = hook.std.write;
        this.std.write = (function (write) {
            return function (string, encoding, fileDescriptor) {
                write.call(hook.std, string, encoding, fileDescriptor);
                hook.process(string);
            }
        })(hook.std.write);

        return hook;
    }

    unregister() {
        this.std.write = this.defaultWrite;
        return this;
    }

    process(string) {

        let message = new Message({
            maxLogSize: this.settings.maxLogSize || defaults.maxLogSize,
            filePath: this.filePath,
            std: this.std,
            prev: this.promise
        });

        message.log(string);
        this.promise = message.promise;
    }
}

class Message {

    constructor(settings) {
        this.std = settings.std;
        this.prev = settings.prev;
        this.promise = _defer();
        this.maxLogSize = settings.maxLogSize;
        this.filePath = settings.filePath;
    }

    async log(string) {

        try {

            if (this.prev) {
                await this.prev;
            }

            let filepath = this.filePath;
            if (!await _fileExists(filepath)) {
                await _fileWrite(filepath, '');
            }

            if (Math.random() > 0.95) {
                /* In order to get performance, do the archive check randomly with a small chance instead checking on every single log */

                const stats = await _fileStat(filepath);
                const fileSizeInBytes = stats.size;
                const archiveTriggerSize = this.maxLogSize;

                if (fileSizeInBytes > archiveTriggerSize) {
                    const dateArchive = _formatDateYYYYMMDDHHMMSS(new Date(), true);
                    const logName = path.basename(filepath);
                    const archiveName = logName.substring(0, logName.lastIndexOf('.')) + dateArchive + '.log.gz';
                    await _fileArchive(filepath, filepath.replace(logName, archiveName));
                    await _fileWrite(filepath, '');
                }
            }

            const dateLog = _formatDateYYYYMMDDHHMMSS(new Date(), false);
            await _fileAppend(filepath, `${string === '' ? '' : '[' + dateLog + '] ' + string}`);

        } catch (e) {
            console.error(e.message);
            console.error(e.stack);
        }

        this.promise.resolve(true);
    }
}


module.exports = StdHook;


function _fileWrite(filepath, content, opts = 'utf8') {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filepath, content, opts, (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

function _fileAppend(filepath, content, opts = 'utf8') {
    return new Promise(function (resolve, reject) {
        fs.appendFile(filepath, content, opts, (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

function _fileExists(path) {
    return new Promise(function (resolve, reject) {
        fs.access(path, fs.constants.F_OK, (err) => {
            resolve(!err);
        });
    });
}

function _fileStat(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, (err, stat) => {
            err ? reject(err) : resolve(stat);
        });
    });
}

function _fileArchive(oldpath, newpath) {
    return new Promise(function (resolve, reject) {

        const gzip = createGzip();
        const source = fs.createReadStream(oldpath);
        const destination = fs.createWriteStream(newpath);

        pipeline(source, gzip, destination, err => err ? reject(err) : resolve(true));
    });
}

function _defer() {
    let res, rej;

    let promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });

    promise.resolve = res;
    promise.reject = rej;

    return promise;
}

function _formatDateYYYYMMDDHHMMSS(date, forFileName) {
    let sep1 = forFileName ? '' : '-';
    let sep2 = forFileName ? '' : ' ';
    let sep3 = forFileName ? '' : ':';
    return date.getFullYear() + sep1 +
        _addZ(date.getMonth() + 1) + sep1 +
        _addZ(date.getDate()) + sep2 +
        _addZ(date.getHours()) + sep3 +
        _addZ(date.getMinutes()) + sep3 +
        _addZ(date.getSeconds());
}

function _addZ(n) {
    return ('0' + n).slice(-2);
}
