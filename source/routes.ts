import express from 'express'
import articles from './server'

const port = 8000;
const app = express();

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.get('/', (req, res) => {
    res.json(articles)
})

export = app