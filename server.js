const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const oauthSignature = require('oauth-signature')
const { generateTimestamp, generateNonce } = require('./util/generate')
app.use(express.json())
require('dotenv').config({ path: './.env' })

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

app.post('/register-customer', async (req, res) => {
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
    url = process.env.USERS_URL,
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
        res.send().status(data.response.data.message)
    })
    .catch(error => {
        console.log(error.response.status)
        res.send(error.response.data.message).status(error.response.status)

    })

})

app.post('/create-order', async (req, res) => {
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
    const product_id = req.body.databaseId
    const UnixTimestamp = generateTimestamp()

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
    url = process.env.ORDERS_URL,
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

    res.send('ok')
})

const PORT = 5000;

app.listen(PORT, () => console.log(`App started on PORT ${ PORT }`))