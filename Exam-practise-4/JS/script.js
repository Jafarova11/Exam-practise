let BASE_URL = `http://localhost:8080/robots`;
let cards = document.querySelector(".cards");
let search = document.querySelector(".search");
let select = document.querySelector("#select");
let filtered = [];
let emptyArr = [];

async function getDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  emptyArr = data;
  cards.innerHTML = "";
  filtered = filtered.length || search.value ? filtered : data;
  filtered.forEach((el) => {
    cards.innerHTML += `
        <span class="col-12 col-md-6 col-lg-3 p-2">
            <div class="card">
              <div class="img-div">
                <img src="${el.photo}" alt="" class="w-100" />
              </div>
              <div class="card-bottom">
                <h5>${el.robotName}</h5>
                <p>${el.description}</p>
                <div class="btns d-flex flex-column gap-2">
                <a href="details.html?id=${el.id}" >VIEW DETAILS</a>
                <button onclick="deleteCard(${el.id})">DELETE</button>
                <a href="add&edit.html?id=${el.id}">EDIT</a>
                <button onclick="addFav(${el.id})">ADD FAVOURITES</button>
                </div>
              </div>
            </div>
          </span>
        `;
  });
}
getDatas();

async function deleteCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

select.addEventListener("change", async function () {
  if (select.value == "asc") {
    filtered = filtered.sort((a, b) => a.id - b.id);
    getDatas();
  } else if (select.value == "desc") {
    filtered = filtered.sort((a, b) => b.id - a.id);
    getDatas();
  } else {
    let res = await axios(BASE_URL);
    let data = await res.data;
    filtered = data;
    console.log(filtered);
    getDatas();
  }
});

search.addEventListener("input", async function (event) {
  filtered = filtered.filter((el) => {
    return `${el.robotName}`.toLocaleLowerCase().includes(event.target.value);
  });
  getDatas();
});

async function addFav(id) {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/favs`, data);
}
