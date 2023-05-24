const BASE_URL = `http://localhost:8080/children`;
let cards = document.querySelector(".cards");
let id = new URLSearchParams(window.location.search).get("id");
let nameInput = document.querySelector("#nameinput");
let ageInput = document.querySelector("#ageinput");
let photoInput = document.querySelector("#photoinput");
let form = document.querySelector("form");
let submit = document.querySelector(".submit");
let topText = document.querySelector("h3");

async function datas() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  nameInput.value = data.name;
  ageInput.value = data.age;
  submit.innerHTML = "Edit";
  topText.innerHTML = "Edit";
}
if (id) {
  datas();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let obj = {
    photo: `../images/${photoInput.value.split("\\")[2]}`,
    name: nameInput.value,
    age: ageInput.value,
  };
  if (
    nameInput.value !== "" &&
    ageInput.value !== "" &&
    photoInput.value != ""
  ) {
    if (!id) {
      await axios.post(BASE_URL, obj);
      window.location.href = "index.html";
    } else {
      await axios.patch(`${BASE_URL}/${id}`, obj);
      window.location.href = "index.html";
    }
  } else {
    alert("Empty value!");
  }
});
