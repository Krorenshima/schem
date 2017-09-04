module.exports = (ev) => process.env[ev.toUpperCase()].replace(/\\/gi, '/')
