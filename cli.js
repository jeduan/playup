#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage: $0 [options]')
  .demand(1)
  .option('t', {
    alias: 'track',
    type: 'string',
    default: 'alpha'
  })
  .option('a', {
    alias: 'auth',
    describe: 'JSON file that contains private key and client email',
    demand: true
  })
  .option('r', {
    alias: 'recent-changes',
    type: 'string'
  })
  .help('h')
  .argv

var fs = require('fs')
var assert = require('assert')

var authJSON = JSON.parse(fs.readFileSync(argv.auth)) // assume a JSON
var options = {
  track: argv.track,
  obbs: argv._.slice(1)
}

if (argv.recentChanges) {
  options.recentChanges = {}
  argv.recentChanges.forEach(function (change) {
    assert.notEqual(change.indexOf('='), -1, 'Unable to parse recent changes')

    var parts = change.split('=')
    assert.equal(parts.length, 2, 'Unable to parse recent changes')

    options.recentChanges[parts[0]] = parts[1]
  })
}

var publisher = require('./lib')(authJSON)
publisher.upload(argv._[0], options)
.catch(function (err) {
  console.error(err.stack)
  process.exit(1)
})
