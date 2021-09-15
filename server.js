const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))  

app.post('/create-order', async (req, res) => {
    const file = req.file
    console.log('file:::::', file)
    res.send('ok')
})

const PORT = 5000;

app.listen(PORT, () => console.log(`App started on PORT ${ PORT }`))