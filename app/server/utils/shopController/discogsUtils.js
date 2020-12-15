const { Discogs } = require("../discogsConfig");

//HELPERS
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const processRaw = (raw) => {
  const {
    id,
    year,
    artists,
    artists_sort,
    title,
    released,
    genres,
    styles,
    tracklist,
    images,
  } = raw.data;
  return {
    id,
    year,
    artists,
    artists_sort,
    title,
    released,
    genres,
    styles,
    tracklist,
    images,
  };
};

const splitBatches = (array) => {
  // Discogs rate limits requests to 60 per minute
  const size = 2;
  let [...arr] = array;
  const res = [];
  while (arr.length) {
    res.push(arr.splice(0, size));
  }
  return res;
};

const processBatch = async (batch) => {
  const promises = [];
  batch.forEach((item) => {
    promises.push(Discogs.get(`/releases/${item.release_id}`));
  });
  const resolved = await Promise.all(promises);
  const processed = resolved.map((item) => processRaw(item));

  processed.map((item, i) => {
    item.price = batch[i].price;
    item.description = batch[i].description;
    item.review = batch[i].review;
    batch[i].preloved ? (item.preloved = true) : (item.preloved = false);
  });

  return processed;
};

//EXPORTS

const getReleaseInfo = async (release_id) => {
  const raw = await Discogs.get(`/releases/${release_id}`);
  data = processRaw(raw);
  return data;
};

const batchGetInfo = async (items) => {
  // Discogs rate limits requests to 60 per minute
  const batches = splitBatches(items);
  const promises = [];
  const delay = 10 * 1000;
  let prom = Promise.resolve();

  batches.forEach((b) => {
    prom = prom.then(() => {
      promises.push(processBatch(b));
      return new Promise((resolve) => {
        console.log(`waiting ${delay / 1000} secs to cool off rate limit...`);

        setTimeout(resolve, delay);
      });
    });
  });

  await prom;
  const completed = await Promise.all(promises);
  console.log(completed.flat());
  console.log(`completed ${completed.length} batches`);

  return completed.flat();
};

module.exports = { getReleaseInfo, batchGetInfo };
