import { statSync } from 'fs'
const pace = require('pace')

export default class DonwloadIndicator {

    constructor(apkFilePath, request) {
        this.apkFilePath = apkFilePath
        this.fileSize = statSync(apkFilePath).size / 1024;
        this.request = request
        this.show()
    }

    show() {
        let progress = 0
        let progressBar = pace(this.fileSize)

        this.request.on('drain', () => {
            progress = this.request.req.connection.bytesWritten / 1024
            progressBar.op(progress)
        });
    }
}