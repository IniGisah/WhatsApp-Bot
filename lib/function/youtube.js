const { Client } = require("youtubei");
const scrape = new Client();

const { fetchJson, fetchText } = require('../../util/fetcher')

const youtubeMusic = async (title) => {
  return new Promise(async (resolve, reject) => {
      console.log(`Getting video music from (${title}) with high quality...`);
      const scraping = await scrape.search(title, { type: 'video', limit: 5 });
      const video = scraping.filter((vid) => vid.duration < 900)[0];
      if (!video) return resolve(false);

      const thumb = video.thumbnails.best;
      const dur = video.duration;

      const videoid = video.id;
      const videourl = `https://www.youtube.com/watch?v=${videoid}`;

      console.log(videourl);

      await fetchJson(`https://michaelbelgium.me/ytconverter/convert.php?youtubelink=${videourl}`)
          .then((res) => resolve({
            result : res,
            duration : dur,
            thumbnail : thumb}))
          .catch((err) => reject(err))
  });
};

const youtubeVideo = async (title) => {
  return new Promise(async (resolve, reject) => {
    console.log(`Getting video from (${title})...`);
    const scraping = await scrape.search(title, { type: 'video', limit: 5 });
    const video = scraping.filter((vid) => vid.duration < 900)[0];
    if (!video) return resolve(false);

    const thumb = video.thumbnails.best;
    const duration = video.duration;

    const videoid = video.id;
    const videourl = `https://www.youtube.com/watch?v=${videoid}`;

    console.log(videourl);

    await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${videourl}`)
        .then((res) => resolve({
          result : res,
          dur : duration,
          thumbnail : thumb}))
        .catch((err) => reject(err))
  });
}

const youtubeMusic2 = async (title) => {
  return new Promise(async (resolve, reject) => {
      console.log(`Getting video music from (${title}) with medium quality...`);
      const scraping = await scrape.search(title, { type: 'video', limit: 5 });
      const video = scraping.filter((vid) => vid.duration < 900)[0];
      if (!video) return resolve(false);

      const thumb = video.thumbnails.best;
      const duration = video.duration;

      const videoid = video.id;
      const videourl = `https://www.youtube.com/watch?v=${videoid}`;

      console.log(videourl);

      await fetchJson(`https://st4rz.herokuapp.com/api/yta2?url=${videourl}`)
          .then((res) => resolve({
            result : res,
            dur : duration,
            thumbnail : thumb}))
          .catch((err) => reject(err))
  });
};

module.exports = {
  youtubeMusic,
  youtubeVideo,
  youtubeMusic2
};

// (async function () {
//   const link = await youtubeMusic("hasbi rabbi sami yusuf");
//   console.log(link);
// })();
