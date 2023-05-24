const BASE_URL = `http://localhost:8080/children`;
let cards = document.querySelector(".cards");
let search = document.querySelector(".search");
let select = document.querySelector("#select");

async function getDatas(arr) {
  let res = await axios(BASE_URL);
  let data = await res.data;
  // console.log(data);
  cards.innerHTML = "";
  (arr || data).forEach((el) => {
    cards.innerHTML += `
    <span class="col-12 col-sm-6 col-md-4 p-2">
    <div class="card">
              <img src="${el.photo}" class="w-100" alt="" />
              <div class="bottom">
                <div class="d-flex align-center gap-2">
                  <h4>${el.name},</h4>
                  <p>${el.age} yrs. old</p>
                </div>
                <div class="btns">
                  <button class="btn btn-danger delbtn" onclick="deleteCard(${el.id})">Delete</button>
                  <a href="add&edit.html?id=${el.id}" class="btn btn-success" onclick="editCard(${el.id})">Edit</a>
                  <a class="btn btn-primary" onclick="addFav(${el.id})">Add favourites</a>
                </div>
              </div>
              </div>
            </span>
    `;
  });
}
getDatas();

let delBtn = document.querySelector(".delbtn");
async function deleteCard(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  delBtn.closest("span").remove();
}

search.addEventListener("input", async function (event) {
  let res = await axios(BASE_URL);
  let searched = res.data.filter((el) => {
    return `${el.name}`
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase());
  });
  getDatas(searched);
});

select.addEventListener("change", async function () {
  if (select.value == "asc") {
    let res = await axios(BASE_URL);
    let searched = res.data.sort((a, b) => a.age - b.age);
    getDatas(searched);
  } else if (select.value == "desc") {
    let res = await axios(BASE_URL);
    let searched = res.data.sort((a, b) => b.age - a.age);
    getDatas(searched);
  } else {
    let res = await axios(BASE_URL);
    let data = res.data;
    getDatas(data);
  }
});

// let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
// async function addFav() {
//   let res = await axios(`${BASE_URL}/${id}`);
//   let data = res.data;
//   let isAdded = favourites.find((item) => item.id === data.id);
//   if (!isAdded) {
//     favourites.push(data);
//     localStorage.setItem("favourites", JSON.stringify(favourites));
//     console.log(favourites);
//   } else {
//     alert("Added already this!");
//   }
// }
async function addFav(id) {
  const res = await axios(`${BASE_URL}/${id}`);
  const data = await res.data;
  await axios.post(`http://localhost:8080/fav`, data);
}
