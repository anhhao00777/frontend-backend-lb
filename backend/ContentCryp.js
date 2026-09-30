const crypto = require("crypto");

class ContentCryp {
    constructor() {

    }

    encrypt(rawContent) {
        let base = btoa(rawContent);
        return base;
    }
    decrypt(content) {
        let data = atob(content);
        return data;
    }
    // updateKey(key, contents = []) {
    //     return new Promise(async (resolve, reject) => {

    //         const list = contents.map(async (str) => {
    //             const old = await this.decrypt(str);
    //             return (await this.encrypt(old));
    //         });
    //         const newList = await Promise.all(list);
    //         this.key = key;
    //         resolve(newList);
    //     });

    // }

    stringToArrayBuffer(str = "none") {
        const buff = new ArrayBuffer(str.length * 2);
        const buffView = new Uint16Array(buff);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            buffView[i] = str.charCodeAt(i);
        }
        return buff;
    }
    arrayBufferToString(buff) {
        return String.fromCharCode.apply(null, new Uint16Array(buff));
    }
}

module.exports = ContentCryp;