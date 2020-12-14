const { Discogs } = require("../discogsConfig");

const getReleaseInfo = async (release_id) => {
  const raw = await Discogs.get(`/releases/${release_id}`);
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

module.exports = { getReleaseInfo };
