import axios from 'axios'
import * as cheerio from 'cheerio';
import express from 'express'

const port = process.env.PORT || 8000;
const app = express();

const newspapers = [
    {
        name: 'nytimes',
        address: 'https://www.nytimes.com/',
        base_url: ''
    },
    {
        name: 'theguardian',
        address: 'https://www.theguardian.com/international',
        base_url: ''
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.com/news',
        base_url: 'https://www.bbc.com'
    },
]

const articles: any = []

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', async (req, res) => {
    try {
        const newspaperId = req.params.newspaperId
        const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
        const newspaperBaseUrl = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base_url

        const response = await axios.get(newspaperAddress);
        const data = response.data
        const $ = cheerio.load(data)
        const specificArticles: any = []

        $('a:contains("Ukraine")', data).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            specificArticles.push({
                title,
                url: newspaperBaseUrl + url,
                source: newspaperId
            })
        })
        res.json(specificArticles)
    } catch (e) {
        res.status(404)
        console.log(e)
    }
})

newspapers.forEach(async newspaper => {
    const response = await axios.get(newspaper.address);
    const data = response.data

    const $ = cheerio.load(data)
    $('a:contains("Ukraine")', data).each(function () {
        const title = $(this).text()
        const url = $(this).attr('href')

        articles.push({
            title,
            url: newspaper.base_url + url,
            source: newspaper.name
        })
    })
})