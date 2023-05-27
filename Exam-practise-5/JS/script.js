let BASE_URL = `http://localhost:8080/tips`;
let cards = document.querySelector(".cards");
let select = document.querySelector("#select");
let search = document.querySelector(".search");
let mobileMenu = document.querySelector(".mobile-menu");
let menuBar = document.querySelector(".fa-bars");
let closeBtn = document.querySelector(".fa-xmark");
let filtered = [];
let emptyArr = [];

menuBar.addEventListener("click", function () {
  mobileMenu.style.display = "block";
  closeBtn.style.display = "block";
  this.style.display = "none";
});
closeBtn.addEventListener("click", function () {
  mobileMenu.style.display = "none";
  menuBar.style.display = "block";
  this.style.display = "none";
});

async function getDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  emptyArr = data;
  filtered = filtered.length || search.value ? filtered : data;
  cards.innerHTML = "";
  filtered.forEach((el) => {
    cards.innerHTML += `
    <span class="col-12 col-lg-4">
            <div class="card">
              <img src="${el.photo}" alt="" />
              <h5>${el.name}</h5>
              <p>${el.description}</p>
              <div class="btns">
                <button class="delbtn m-1" onclick="deleteCard(${el.id})">Delete</button>
                <a href="details.html?id=${el.id}" class="btn btn-secondary m-1">Details</a>
                <button class="btn btn-primary m-1" onclick="addBasket(${el.id})">Add Basket</button>
                <a href="add&edit.html?id=${el.id}" class="btn btn-success m-1">Edit</a>
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

async function addBasket(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/basket`, data);
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
    getDatas();
  }
});

search.addEventListener("input", async function (event) {
  filtered = filtered.filter((el) => {
    return `${el.name}`
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase());
  });
  getDatas();
});

