const BASE_URL = `http://localhost:8080/news`;
let form = document.querySelector("form");
let title = document.querySelector("#title");
let main = document.querySelector("#main");
let price = document.querySelector("#number");
let photoInput = document.querySelector("#photo");

async function addNew() {
  let obj = {
    title: title.value,
    main: main.value,
    price: price.value,
    photo: `../images/${photoInput.value.split("\\")[2]}`,
  };
  axios.post(BASE_URL, obj);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addNew();
  window.location.href = "index.html";
});
