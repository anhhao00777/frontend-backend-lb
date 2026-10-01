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

}

module.exports = ContentCryp;