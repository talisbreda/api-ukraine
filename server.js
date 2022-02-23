import express from 'express'
import axios from 'axios';
import cheerio from 'cheerio';

const port = 8000;
const app = express();

const articles = []

app.get('/aaa', async (req, res) => {
    axios.get('https://www.theguardian.com/world/europe-news')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("ukraine")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title, url
                })
            })
            res.json(articles)
        }).catch((e) => console.log(e))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log('asdfasdfa')
})