_**This project is no longer maintained and [will stop working](https://github.com/jeduan/playup/issues/37) on December 1, 2019. Please use [apkup](https://www.npmjs.com/package/apkup) instead.**_

<br>

# playup [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![npm][npm-image]][npm-url] [![js-standard-style][standard-image]][standard-url]

[travis-image]: https://travis-ci.org/jeduan/playup.svg?branch=master
[travis-url]: https://travis-ci.org/jeduan/playup
[coveralls-image]: https://coveralls.io/repos/jeduan/playup/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/jeduan/playup?branch=master
[npm-image]: https://img.shields.io/npm/v/playup.svg?style=flat
[npm-url]: https://npmjs.org/package/playup
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard

 > Upload APKs to Google Play

This package offers a streamlined way to publish packages in the Google Play Store


## Install

```
npm install -g playup
```

## Usage

Use the CLI

```bash
playup \
  --auth api.json \
  --recent-changes "en-US='lorem ipsum dolor'" \
  /path/to/Package.apk \
  /path/to/Expansion.obb \  # optional
  /path/to/Expansion2.obb   # optional
```

or the JavaScript API

```javascript
var publisher = require('playup')({
  client_email: '',
  private_key: '',
})

publisher.upload('/path/to/apk', {
  obbs: [  // optional expansion files (max 2)
    '/path/to/somefile.obb'
  ],
  recentChanges: {
    'en-US': 'lorem ipsum dolor'
  },
}).then(function (data) {
  console.log(' > %s version %d is up!', data.packageName, data.versionCode)
})
```

## Authentication

First you have to create a Google Play API Access. To do that go to the
[Google Play Developer Console](https://play.google.com/apps/publish) and then
with the account owner go to Settings -> API access and create a Google Play
Android Developer project.

After that follow the instructions to create a Service Account.
When you click Create Client ID, choose Service Account. You will get a JSON file
with a public key and the service email.

## gulp support

The `upload` method returns a `Promise` so this package can be used in conjunction with gulp with no extra plugins needed

```javascript
gulp.task(upload, function () {
  return publisher.upload(apk, params)
})
```

## CLI

### playup --auth auth --recent-changes "recent changes" APK [[OBB], OBB]

#### auth

*Required*
Type: `File`

a JSON file with the [Authentication information](#authentication)

#### recent-changes
*Required*
Type: `string`

A string with the format `lang=changes` where lang is the language code and changes the string that specifies the changes of this

#### track
Type: `string`

Specify track for this release. Can be alpha, beta, production or rollout. Default: alpha

#### APK

The path to the APK

#### OBB

The path to 1 or more expansion files

## API

### Playup = require('playup')

Playup is a constructor that can be called with or without `new`

### publisher = new Playup(auth)

The instance of Playup has the `auth` option

#### auth

*Required*
Type: `object`

The object with Authentication information. This object will have the following keys
 - `client_email`
 - `private_key`

### publisher.upload(apk[, params[, callback]])

Upload specified APK. If no callback is specified, returns a `Promise`

#### apk

*Required*
Type: `string`

The path to the APK to upload

#### params

*Optional*
Type: `object`

The params object will add aditional information to this release. Currently, it can have these keys

##### track

 Type: string
 Default: `'alpha'`

 Specify track for this release. Can be alpha, beta, production or rollout.

##### recentChanges

 Type: object
 Default: `{}`

 An `object` that specifies changes in this version. Has the language code as key and the changes as value.

##### obbs

 Type: Array
 Default: `[]`

 An array that specifies the paths to the expansion files (OBBs) for this release

#### callback

 A function to be called when the process finishes. It receives two params:

##### err

The error if the upload was not succesful

##### data

An object with the following properties

 - `packageName`
 - `versionCode`
