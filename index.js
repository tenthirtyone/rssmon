const Parser = require('rss-parser');
const fs = require('fs');
const colors = require('colors');
const player = require('play-sound')(opts = {});

const parser = new Parser();
const colorList = [
  'brightRed',
  'brightGreen',
  'brightYellow',
  'brightBlue',
  'brightMagenta',
  'brightCyan',
  'brightWhite',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
];
const stories = {};

async function parseFeeds() {
  const urls = fs.readFileSync('./feeds').toString().split('\n');
  urls.forEach(async (url) => {
    try {
      const feed = await parser.parseURL(url);

      feed.items.slice(5).forEach((item) => {
        const number = Math.round((Math.random() * 100) % (colorList.length - 1));

        if (!stories[item.title]) {
          stories[item.title] = true;
          player.play('./alert.wav');
          console.log(`${feed.title.bold} - ${colors[colorList[number]](`${item.title}   `)}`);
          console.log(colors[colorList[number]](`(${item.link})\n`));
        }
      });
    } catch (e) {
      // console.log(`error in url: ${url}`);
    }
  });
}

setInterval(() => {
  parseFeeds();
}, 10000);
