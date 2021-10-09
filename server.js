const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const oauthSignature = require('oauth-signature')
app.use(express.json())
require('dotenv').config({ path: './.env' })

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

function generateNonce() {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 11; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function generateTimestamp() {
    return Math.round(new Date().getTime() / 1000).toString()
}

app.post('/create-user', async (req, res) => {
    // console.log(req.body)
    const first_name = req.body.firstName
    const last_name = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const UnixTimestamp = generateTimestamp()

    const json = JSON.stringify({
        first_name,
        last_name,
        username,
        password,
        email
    })

    const httpMethod = 'POST',
    url = 'http://localhost:10028/wp-json/wp/v2/users',
    requestParams = { 
        oauth_consumer_key : process.env.CONSUMER_KEY,
        oauth_token : process.env.TOKEN,
        oauth_nonce : generateNonce(),
        oauth_timestamp : UnixTimestamp,
        oauth_signature_method : 'HMAC-SHA1'
    }

    const consumerSecret = process.env.CONSUMER_SECRET;
    const tokenSecret = process.env.TOKEN_SECRET;

    const encodedSignature = oauthSignature.generate( httpMethod, url, requestParams, consumerSecret, tokenSecret, { 
        encodeSignature: true } )

    const authorizationHeader = 
    'OAuth oauth_consumer_key="' + requestParams.oauth_consumer_key
    + '",oauth_nonce="' + requestParams.oauth_nonce
    + '",oauth_signature_method="' + requestParams.oauth_signature_method
    + '",oauth_timestamp="' + requestParams.oauth_timestamp
    + '",oauth_token="' + requestParams.oauth_token
    + '",oauth_signature="' + encodedSignature + '"'

    axios.post(url, json, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
        }
    })
    .then(data => {
        console.log("data::::::", data)
        res.send().status(data.response.data.message)
    })
    .catch(error => {
        // console.log(error.response.status)
        // console.log(error.response.data.message)
        // console.log(error)
        // res.status(error.response.status)
        console.log(error.response.status)
        res.send(error.response.data.message).status(error.response.status)

    })

})

app.post('/create-order', async (req, res) => {
    // const file = req.body.file
    // const payment_method = req.body.payment_method

    const body = req.body
    const id = req.body.id
    const name = req.body.description
    const email_address = req.body.email_address
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const price = req.body.price
    const admin_area_1 = req.body.admin_area_1
    const admin_area_2 = req.body.admin_area_2
    const address_line_1 = req.body.address_line_1
    const postal_code = req.body.postal_code
    const country_code = req.body.country_code
    const phone = req.body.phone
    const product_id = req.body.productId
    const UnixTimestamp = generateTimestamp()
    
    // Create an order with Woocommerce API orders endpoint

    const json = {
        "payment_method": body.payment_details.payment_method,
        "payment_method_title": body.payment_details.payment_method,
        "set_paid": true,
        "status": "completed",
        "billing": {
            "first_name": first_name,
            "last_name": last_name,
            "address_1": address_line_1,
            "city": admin_area_2,
            "state": admin_area_1,
            "postcode": postal_code,
            "country": country_code,
            "email": email_address,
            "phone": phone
        },
        "line_items": [
            {
            "product_id": product_id,
            "quantity": 1,
            "name": name,
            "total": price
            }
        ],
        "shipping_lines": [
            {
              "method_id": "flat_rate",
              "method_title": "Flat Rate",
              "total": "0"
            }
        ]
    }

    const httpMethod = 'POST',
    url = 'http://localhost:10028/wp-json/wc/v3/orders',
    requestParams = { 
        oauth_consumer_key : process.env.CONSUMER_KEY,
        oauth_token : process.env.TOKEN,
        oauth_nonce : generateNonce(),
        oauth_timestamp : UnixTimestamp,
        oauth_signature_method : 'HMAC-SHA1'
    }

    const consumerSecret = process.env.CONSUMER_SECRET;
    const tokenSecret = process.env.TOKEN_SECRET;

    const encodedSignature = oauthSignature.generate( httpMethod, url, requestParams, consumerSecret, tokenSecret, { 
        encodeSignature: true } )

    const authorizationHeader = 
          'OAuth oauth_consumer_key="' + requestParams.oauth_consumer_key
          + '",oauth_nonce="' + requestParams.oauth_nonce
          + '",oauth_signature_method="' + requestParams.oauth_signature_method
          + '",oauth_timestamp="' + requestParams.oauth_timestamp
          + '",oauth_token="' + requestParams.oauth_token
          + '",oauth_signature="' + encodedSignature + '"'

    axios.post(url, json, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
        }
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))

    // Email file with Nodemailer 
    res.send('ok')
})

const PORT = 5000;

app.listen(PORT, () => console.log(`App started on PORT ${ PORT }`))