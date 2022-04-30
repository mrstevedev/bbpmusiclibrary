const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const oauthSignature = require('oauth-signature')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const { generatePassword, generateTimestamp, generateNonce } = require('./util/generate')
app.use(express.json())
require('dotenv').config({ path: './.env' })

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

// initialize nodemailer
let transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
  }
  
let transporter = nodemailer.createTransport(transport)

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./email/purchase/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./email/purchase/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

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
            // 'Authorization': authorizationHeader
            'Authorization': 'Bearer ' + process.env.JWT_TOKEN
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

app.post('/create-customer', async (req, res) => {
    const body = req.body
    const name = req.body.description
    const email_address = req.body.email_address
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const username = req.body.email_address
    const password = generatePassword()
    const price = req.body.price
    const admin_area_1 = req.body.admin_area_1
    const admin_area_2 = req.body.admin_area_2
    const address_line_1 = req.body.address_line_1
    const postal_code = req.body.postal_code
    const country_code = req.body.country_code
    const phone = req.body.phone
    const product_id = req.body.databaseId

    const orders_url = process.env.ORDERS_URL
    const users_url = process.env.USERS_URL
    const search_url = process.env.SEARCH_URL

    const users_json = JSON.stringify({
        first_name,
        last_name,
        username,
        password,
        email_address
    })

    const mailOptions = {
        from: first_name,
        to: email_address, // list of receivers
        subject: 'Welcome!',
        template: 'purchase', // the name of the template file i.e purchase.handlebars
        context:{
            name: "Adebola", // replace {{name}} with Adebola
            company: 'My Company', // replace {{company}} with My Company
            link: 'download link'
        }
    };

    axios.get(`${search_url}${email_address}`)
        .then(res => {

        if(res.data.length > 0) {

            // get user id from response and append as customer_id
            const arr_val = res.data.map(user => [user.id])
            const [user_id] = arr_val

            const orders_json = {
                "payment_method": body.payment_method,
                "payment_method_title": body.payment_method,
                "set_paid": true,
                "status": "completed",
                "customer_id": user_id,
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

            // if we return a user then just create an order
            axios.post(orders_url, orders_json, {
                headers: {
                    'Authorization': 'Bearer ' + process.env.JWT_TOKEN
                }
            }).then(res => {
                // console.log(res)
                // Send Email
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        res.json({
                            status: 'fail'
                        })
                    } else {
                        res.json({
                            status: 'success'
                        })
                    }
                })
                res.send('success');
            }).catch(err => console.log(err))
        } else {

            // Else create a customer then create an order
            axios.post(users_url, users_json, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + proces.env.JWT_TOKEN
                }
            }).then(res => {
                // console.log(res)

                // Create an order here
                axios.post(orders_url, orders_json, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + proces.env.JWT_TOKEN
                    }
                })
            }).catch(err => console.log(err))
        }
    }).catch(res => console.log(res))

    res.send('ok')
})

const PORT = 5000;

app.listen(PORT, () => console.log(`App started on PORT ${ PORT }`))