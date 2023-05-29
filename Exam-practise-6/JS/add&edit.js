let BASE_URL = `http://localhost:8080/products`;
let form = document.querySelector("form");
let nameInput = document.querySelector("#textinput");
let typeInput = document.querySelector("#typeinput");
let priceInput = document.querySelector("#priceinput");
let photoInput = document.querySelector("#photoinput");
let title = document.querySelector("title");
let topTitle = document.querySelector(".toptitle");
let btn = document.querySelector(".submit");
let id = new URLSearchParams(window.location.search).get("id");

async function allDatas() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  nameInput.value = data.productName;
  typeInput.value = data.type;
  priceInput.value = data.price;
}
if (id) {
  allDatas();
  title.innerHTML = "Edit page";
  topTitle.innerHTML = "Edit";
  btn.innerHTML = "Edit";
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    productName: nameInput.value,
    type: typeInput.value,
    price: priceInput.value,
    photo: `../images/${photoInput.value.split("\\")[2]}`,
  };
  if (
    nameInput.value != "" &&
    typeInput.value != "" &&
    priceInput.value != "" &&
    photoInput.value != ""
  ) {
    if (!id) {
      await axios.post(BASE_URL, obj);
      window.location = "index.html";
    } else {
      await axios.patch(`${BASE_URL}/${id}`, obj);
      window.location = "index.html";
    }
  } else alert("Empty values!");
});
