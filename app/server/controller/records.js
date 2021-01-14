const Vinyl = require("../models/vinyl");

const query = async (req, res) => {
  const { category, query } = req.params;
  const findQuery = {};
  findQuery[`${category}`] = query;

  try {
    const results = await Vinyl.find(findQuery).collation({
      locale: "en",
      strength: 2,
    });
    console.log(res);
    res.status(200).json(results);
  } catch (e) {
    res.status(400).json(e.message);
    console.log(res);
  }
};

const complexQuery = async (req, res) => {};

const sendCompactDB = async (req, res) => {
  const compactDB = [];
  try {
    const titles = await Vinyl.distinct("release_title");
    titles.forEach((i) => compactDB.push({ group: "Records", title: i }));
    const artists = await Vinyl.distinct("artists_sort");
    artists.forEach((i) => compactDB.push({ group: "Artists", title: i }));
    const genres = await Vinyl.distinct("genres");
    genres.forEach((i) => compactDB.push({ group: "Genres", title: i }));
    const styles = await Vinyl.distinct("styles");
    styles.forEach((i) => compactDB.push({ group: "Styles", title: i }));
    const formats = await Vinyl.distinct("format");
    formats.forEach((i) => compactDB.push({ group: "Format", title: i }));

    res.status(200).json(compactDB);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = { query, complexQuery, sendCompactDB };
