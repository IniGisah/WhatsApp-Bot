const { decryptMedia } = require('@open-wa/wa-automate');
const { fetchJson, fetchText } = require('../../util/fetcher')
const fbdown = require('fb-video-downloader');
const axios = require('axios');
const voiceUrl = require('./voice');
const quran = require('./quran');
const makequote = require('./makequote');
const translate = require('./translate')
const brainly = require('./brainly');
const youtube = require('./youtube')
const cekResi = require('./cekResi')
const moment = require('moment-timezone')
//const { facebook, twitter, instagram } = require('./socialmedia');
const lirik = require('./lyrics');
const wiki = require('./wikipedia');
const weeaboo = require('./weeaboo');
const misc = require('./misc')
const polling = require('./poll');
const reminder = require('./reminder')
const { twitter } = require('video-url-link')
const { promisify } = require('util')
const twtGetInfo = promisify(twitter.getInfo)

const bucin = async () => {
  const fetch = await axios.get('https://api-neraka.vercel.app/api/bucin');
  const data = fetch.data.result;
  return data.kata;
};

/**
 * Get Twitter media from URL.
 * @param {string} url 
 * @returns {Promise<object>} 
 */
 const tweet = (url) => new Promise((resolve, reject) => {
  console.log(`Get Twitter media from ${url}`)
  twtGetInfo(url, {}, (error, info) => {
      if (error) {
          reject(error)
      } else {
          resolve(info)
      }
  })
})

/**
 * Create shortlink.
 * @param {string} url
 * @returns {Promise<string>}
 */
 const short = (url) => new Promise((resolve, reject) => {
  console.log('Creating shortlink...')
  fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
      .then((text) => resolve(text))
      .catch((err) => reject(err))
})

const covid = async (country = null) => {
  const path = country ? `countries/${country}` : '';
  const APIURL = `https://covid19.mathdro.id/api/${path}`;
  const { data } = await axios.get(APIURL);
  if (data.error) return undefined;
  return `_🌏 Data Covid ${country ? country.toLowerCase() : 'Seluruh Dunia'}_\n\n_Terkonfirmasi : ${data.confirmed.value}_\n_Sembuh : ${data.recovered.value}_\n_Kematian : ${data.deaths.value}_\n\n_Keep safety use helmets!_`;
};

const cat = async () => {
  const APIURL = `https://api.thecatapi.com/v1/images/search`;
  const { data } = await axios.get(APIURL);
  const picUrl = data[0].url;
  if (!picUrl) return undefined;
  return picUrl;
};

const dog = async () => {
  const APIURL = `https://dog.ceo/api/breeds/image/random`;
  const { data } = await axios.get(APIURL);
  const picUrl = data.message;
  if (!picUrl) return undefined;
  return picUrl;
};

const meme = async () => {
  const APIURL = `https://meme-api.herokuapp.com/gimme`;
  const { data } = await axios.get(APIURL);
  const picUrl = data.url;
  if (!picUrl) return undefined;
  const ext = picUrl.replace(/(.*)\./g, '');
  return { picUrl, ext };
};

const animesearch = async (title) => {
  const APIURL = `https://api.jikan.moe/v3/search/anime?q=${title}`;
  const { data } = await axios.get(APIURL);
  const result = data.results[0];
  const picUrl = result.image_url.replace(/\?(.*)/g, '');
  const caption = `_*Judul* : ${result.title}_\n_*Sinopsis* : ${result.synopsis}_\n_*Rated* : ${result.rated}_\n_*Score* : ${result.score}_\n_*Link* : ${result.url}_`;
  return { picUrl, caption };
};

const tosticker = (arguments) => {
  const phrase = arguments.map((result, index) => `${result}${index !== 0 && (index + 1) % 3 === 0 ? '%0A' : '%20'}`).join('');
  const APIURL = `https://raterian.sirv.com/New%20Project.png?text.0.text=${phrase}&text.0.position.y=-50%25&text.0.color=000000&text.0.font.family=Poppins&text.0.font.weight=600&text.0.outline.color=ffffff&text.0.outline.width=5`;
  return APIURL;
};

const imgquote = async () => {
  const { data } = await axios.get('https://inspirobot.me/api?generate=true');
  return data;
};

const weather = async (city) => {
  const API_KEY = 'f70fc7b25b88688986ee23eef10b2ab9';
  const APIURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const { data } = await axios.get(APIURL);

  switch (parseInt(data.cod)) {
    case 404:
      return `_⚠️ Kota tidak ditemukan_`;
    case 200:
      return `_*Kota* : ${data.name}, ${data.sys.country}_\n_*Koordinat* -_\n_--- Latitude : ${data.coord.lat}_\n_--- Longitude : ${data.coord.lon}_\n_*Kecepatan angin* : ${data.wind.speed}m/s W_\n_*Cuaca : ${data.weather[0].main} | ${data.weather[0].description}*_\n_*Temperatur :* ${(data.main.temp - 273, 15)}_`;
    default:
      return `_Terdapat kesalahan pada server!_`;
  }
};

const movie = async (params) => {
  const API_KEY = 'e03a86fd';
  const APIURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${params}`;
  const { data } = await axios.get(APIURL);
  const response = data.Response === 'True';
  if (!response) return undefined;
  const moviePicture = data.Poster;
  const movieCaption = `_*Judul* : ${data.Title}_\n_*Tahun* : ${data.Year}_\n_*Rating* : ${data.Rated}_\n_*Rilis* : ${data.Released}_\n_*Durasi* : ${data.Runtime}_\n_*Genre* : ${data.Genre}_\n_*Sutradara* : ${data.Director}_\n_*Penulis* : ${data.Writer}_\n_*Aktor* : ${data.Actors}_\n_*Bahasa/Negara* : ${data.Language}/${data.Country}_\n_*Penghargaan* : ${data.Awards}_\n_*Website* : ${data.Website}_\n`;
  return { moviePicture, movieCaption };
};

const processTime = (timestamp, now) => {
  // timestamp => timestamp when message was received
  return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

const facebook = (url) => new Promise((resolve, reject) => {
  try{
    console.log(`Getting fb download link fron ${url}`)
    fbdown.getInfo(url).then(vid => {
    return resolve(vid);});
  } catch (exception) {
    return reject(exception);
  }
})

const tulis = async (teks) => new Promise((resolve, reject) => {
  axios.get(`https://arugaz.herokuapp.com/api/nulis?text=${encodeURIComponent(teks)}`)
  .then((res) => {
      resolve(`${res.data.result}`)
  })
  .catch((err) => {
      reject(err)
  })
})

module.exports = {
  voiceUrl,
  quran,
  makequote,
  brainly,
  bucin,
  youtube,
  facebook,
  lirik,
  short,
  covid,
  cat,
  dog,
  meme,
  animesearch,
  tosticker,
  wiki,
  imgquote,
  weather,
  movie,
  cekResi,
  translate,
  weeaboo,
  misc,
  reminder,
  processTime,
  polling,
  tweet,
  tulis,
};
