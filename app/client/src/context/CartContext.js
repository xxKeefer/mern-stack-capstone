import React, { createContext, useEffect } from "react";
import placeholderImage from "../images/placeholderImage.png";
import { publicFetch } from "../util/fetch";


// useEffect(() => {
//   const updateCart = async () => {
//      await publicFetch.put("/api/cart/add", cart);
//   };
// }, [cart]);

export default createContext({
  records: [
    {
      id: 1,
      artistName: "First Artist",
      recordTitle: "First Title",
      recordPrice: 80,
      recordLabel: "First Label",
      releaseYear: "1988",
      genres: ["techno", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
    {
      id: 2,
      artistName: "Second Artist",
      recordTitle: "Second Title",
      recordPrice: 60,
      recordLabel: "Second Label",
      releaseYear: "1988",
      genres: ["techno", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
    {
      id: 3,
      artistName: "Third Artist",
      recordTitle: "Third Title",
      recordPrice: 20,
      recordLabel: "Third Label",
      releaseYear: "1988",
      genres: ["techno", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
    {
      id: 4,
      artistName: "Fourth Artist",
      recordTitle: "Fourth Title",
      recordPrice: 33,
      recordLabel: "Fourth Label",
      releaseYear: "1988",
      genres: ["acid", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
  ],
  cart: [],
  addToCart: (record) => {},
  removeFromCart: (recordId) => {},
});
