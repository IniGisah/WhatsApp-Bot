const { Client } = require("youtubei");
const scrape = new Client();

const { fetchJson, fetchText } = require('../../util/fetcher')

const youtubeMusic = async (title) => {
  return new Promise(async (resolve, reject) => {
      console.log(`Getting video music from (${title})...`);
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

const youtubeVideo = async (url) => {
  return new Promise(async (resolve, reject) => {
    console.log(`Getting video from (${title})...`);
    const scraping = await scrape.search(title, { type: 'video', limit: 5 });
    const video = scraping.filter((vid) => vid.duration < 600)[0];
    if (!video) return resolve(false);
    const regex = /[|']/g;

    const thumb = video.thumbnails.best;

    const videoid = video.id;
    const videourl = `https://www.youtube.com/watch?v=${videoid}`;

    console.log(videourl);

    await fetchJson(`https://michaelbelgium.me/ytconverter/convert.php?youtubelink=${videourl}&format=mp4`)
        .then((res) => resolve({
          result : res,
          thumbnail : thumb}))
        .catch((err) => reject(err))
  });
}

module.exports = {
  youtubeMusic,
  youtubeVideo
};

// (async function () {
//   const link = await youtubeMusic("hasbi rabbi sami yusuf");
//   console.log(link);
// })();
