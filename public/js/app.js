const log = console.log;
console.log("Client side JS file loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

if (message1 && message2) {
  message1.textContent = "";
  message2.textContent = " ";
}

if (weatherForm) {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    message1.textContent = "Loading...";
    message2.textContent = "";
    fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      });
    });

    log(location);
  });
}
