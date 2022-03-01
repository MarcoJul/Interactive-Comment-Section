"use strict";

console.log("Begin");

const fetchData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();
  console.log(data);
};

fetchData();
