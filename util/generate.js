function generateTimestamp() {
    return Math.round(new Date().getTime() / 1000).toString()
}

function generateNonce() {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 11; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

module.exports = {
    generateTimestamp,
    generateNonce
}