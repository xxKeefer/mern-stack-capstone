export const parseLabelData = (labels) => {
  if (!labels.length) {
    return "";
  } else {
    return labels[0].name;
  }
};

export const abbreviateTitle = (title, length) => {
  let newTitle = title.split(" (")[0];
  if (newTitle.length > length) {
    const abbreviated = title.slice(0, length);
    return `${abbreviated}...`;
  } else {
    return newTitle;
  }
};
