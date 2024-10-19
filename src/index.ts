import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`) 
})
