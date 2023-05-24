const BASE_URL = `http://localhost:8080/news`;
let titleInput = document.querySelector("#titleinput");
let mainInput = document.querySelector("#maininput");
let photoInput = document.querySelector("#photoinput");
let priceInput = document.querySelector("#priceinput");
let form = document.querySelector("form");
let topTitle = document.querySelector("h3");
let btn = document.querySelector(".btn");
let id = new URLSearchParams(window.location.search).get("id");

async function datas() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  titleInput.value = data.title;
  mainInput.value = data.main;
  photoInput.value = data.photo;
  priceInput.value = data.price;
}
if (id) {
  topTitle.innerHTML = "Edit card";
  btn.innerHTML = "Edit";
  datas();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let obj = {
    title: titleInput.value,
    main: mainInput.value,
    photo: `../images/${photoInput.value.split("\\")[2]}`,
    price: priceInput.value,
  };
  if (
    titleInput.value != "" &&
    mainInput.value != "" &&
    photoInput.value != "" &&
    priceInput.value != ""
  ) {
    if (!id) {
      await axios.post(BASE_URL, obj);
      window.location = "index.html";
    } else {
      await axios.patch(`${BASE_URL}/${id}`, obj);
      window.location = "index.html";
    }
  } else {
    alert("Empty values!");
  }
});
