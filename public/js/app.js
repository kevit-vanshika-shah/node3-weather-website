// console.log("client side javascript  file is loaded");
//const axios = require("axios");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     consosssle.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //telling browser to stop refreshing which is it's default behavior

  const location = search.value;

  // console.log(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  // fetch(`/weather?address=${location}`).then((response) => {
  //   response.json().then((data) => {
  //     if (data.error) {
  //       // console.log(data.error);
  //       messageOne.textContent = data.error;
  //     } else {
  //       messageOne.textContent = data.location;
  //       messageTwo.textContent = data.forecast;
  //       // console.log(data.location);
  //       // console.log(data.forecast);
  //     }
  //   });
  // });
  try {
    let url = `/weather?address=${location}`;
    const response = await axios.get(url);
    const data = response.data;
    if (data.error) {
      // console.log(data.error);
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      // console.log(data.location);
      // console.log(data.forecast);
    }
  } catch (error) {
    messageOne.textContent = error + " Please Check your Internet connection";
  }
});
//});
