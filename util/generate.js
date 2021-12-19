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

function generatePassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const passwordLength = 12
    let password = ""

    for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber +1)
    }
    return password
}

module.exports = {
    generatePassword,
    generateTimestamp,
    generateNonce
}