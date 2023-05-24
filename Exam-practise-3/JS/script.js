const BASE_URL = `http://localhost:8080/news`;
let cards = document.querySelector(".cards");
let select = document.querySelector("#select");
let searchInput = document.querySelector(".search");
let copyArr = [];
let filtered = [];

async function getDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  copyArr = data;
  cards.innerHTML = "";
  filtered = filtered.length || searchInput.value ? filtered : data;
  filtered.forEach((el) => {
    cards.innerHTML += `
    <span class="col-12 col-sm-6 col-md-4 col-lg-3 p-1">
            <div class="content">
              <img src="${el.photo}" alt="" class="w-50" />
              <h5>${el.title}</h5>
              <p>${el.main}</p>
              <p>${el.price}</p>
              <div class="btns">
              <button  onclick="addFav(${el.id})" class="addfav">Add favourites</button>
              <div>
              <button onclick="delData(${el.id})">Delete</button>
              <a href="../HTML/add&edit.html?id=${el.id}">Edit</a>
              </div>
              </div>
            </div>
          </span>
    `;
  });
}
getDatas();

async function delData(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

select.addEventListener("change", async function () {
  if (select.value == "asc") {
    filtered.sort((a, b) => a.price - b.price);
    getDatas();
  } else if (select.value == "desc") {
    filtered.sort((a, b) => b.price - a.price);
    getDatas();
  } else {
    filtered = copyArr;
    getDatas();
  }
});

searchInput.addEventListener("input", async function (event) {
  filtered = copyArr;
  filtered = filtered.filter((el) => {
    return `${el.title}`
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase());
  });
  getDatas();
});

let FAV_URL = `http://localhost:8080/favs`;
async function addFav(id) {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(FAV_URL, data);
}
