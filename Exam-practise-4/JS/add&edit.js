let BASE_URL = `http://localhost:8080/robots`;
let nameInput = document.querySelector("#nameinput");
let desInput = document.querySelector("#desinput");
let photoInput = document.querySelector("#photoinput");
let form = document.querySelector("form");
let topTitle = document.querySelector(".toptitle");
let btn = document.querySelector(".submit");
let id = new URLSearchParams(window.location.search).get("id");

async function datas() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  nameInput.value = data.robotName;
  desInput.value = data.description;
}
if (id) {
  topTitle.innerHTML = "Edit";
  btn.innerHTML = "Edit";
  datas();
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    robotName: nameInput.value,
    description: desInput.value,
    photo: `../images/${photoInput.value.split("\\")[2]}`,
  };
  if (nameInput.value != "" && desInput.value != "") {
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
