const abbreviate = (release_title, artists) => {
  const abr1 = release_title.slice(0, 3).toUpperCase();
  const abr2 = artists[0].slice(0, 3).toUpperCase();
  return abr1 + abr2;
};

const describe = (release_title, artists, format, label) => {
  const artist_string = artists.join(", ");
  return `${release_title}, ${artist_string}, ${format}, ${label}.`;
};
module.exports = { abbreviate, describe };
