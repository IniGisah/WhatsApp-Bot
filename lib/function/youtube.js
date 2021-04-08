const { Client } = require("youtubei");
const scrape = new Client();

const { fetchJson, fetchText } = require('../../util/fetcher')

const ytmp3 = require('youtube-mp3-downloader');
const path = require('path');
const fs = require('fs');

const youtubeMusic = async (title) => {
  return new Promise(async (resolve, reject) => {
      console.log(`Getting video music from search title (${title})...`);
      const scraping = await scrape.search(title, { type: 'video', limit: 5 });
      const video = scraping.filter((vid) => vid.duration < 600)[0];
      if (!video) return resolve(false);
      const regex = /[|']/g;

      const thumb = video.thumbnails.best;

      const videoid = video.id;
      const videourl = `https://www.youtube.com/watch?v=${videoid}`;

      console.log(videourl);

      await fetchJson(`https://michaelbelgium.me/ytconverter/convert.php?youtubelink=${videourl}`)
          .then((res) => resolve({
            result : res,
            thumbnail : thumb}))
          .catch((err) => reject(err))
  });
};

const youtubeMusicURL = async (url) => {
  return new Promise(async (resolve, reject) => {
      console.log(`Getting video music from url (${url})...`);
      console.log(url);

      await fetchJson(`https://michaelbelgium.me/ytconverter/convert.php?youtubelink=${url}`)
          .then((result) => resolve(result))
          .catch((err) => reject(err))
  });
}

module.exports = {
  youtubeMusic,
  youtubeMusicURL
};

// (async function () {
//   const link = await youtubeMusic("hasbi rabbi sami yusuf");
//   console.log(link);
// })();
