import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../util/fetch";

export default function Labels() {
  const [labelsList, setLabelsList] = useState([]);

  const { data: labels, status: labelsStatus } = useQuery(
    "labels",
    async () => {
      const { data } = await API.post("/records/query", {
        category: "labels",
      });
      console.log(data);
      labelsStatus === "success" && setLabelsList(labels);
    }
  );

  //   useEffect(() => {
  //     const getLabels = async () => {
  //       try {
  //         const { data } = await API.get("/records/search");
  //         console.log(data);
  //         const labelsGrep = data.filter((obj) => {
  //           return obj.group === "Labels";
  //         });
  //         setLabelsList(labelsGrep);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getLabels();
  //   }, []);

  return <div></div>;
}
