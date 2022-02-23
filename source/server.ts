import axios from 'axios'
import * as cheerio from 'cheerio';

import app from './routes'

app.use((req, res, next) => {
    next()
})

const newspapers = [
    {
        name: 'The New York Times',
        address: 'https://www.nytimes.com/'
    },
    {
        name: 'The Guardian',
        address: 'https://www.theguardian.com/international'
    },
    {
        name: 'The Guardian Europe News',
        address: 'https://www.theguardian.com/world/europe-news'
    },
    {
        name: 'BBC General News',
        address: 'https://www.bbc.com/news'
    },
    {
        name: 'BBC Europe',
        address: 'https://www.bbc.com/news/world/europe'
    },
]

const articles: any = []

newspapers.forEach(async newspaper => {
    const response = await axios.get(newspaper.address);
    const data = response.data

    const $ = cheerio.load(data)
    $('a:contains("Ukraine")', data).each(function() {
        const title = $(this).text()
        const url = $(this).attr('href')

        articles.push({
            title,
            url,
            source: newspaper.name
        })
    })
})

export default {articles}