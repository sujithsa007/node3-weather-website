const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#m1");
const messageTwo = document.querySelector("#m2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(searchElement.value);
  messageOne.textContent = "Loading weather...";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + searchElement.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = "";
          messageTwo.textContent = data.error;
          return;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      });
    }
  );
});
