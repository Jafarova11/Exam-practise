let BASE_URL = `http://localhost:8080/products`;
let cards = document.querySelector(".cards");
let search = document.querySelector(".search");
let select = document.querySelector("#select");

let filtered = [];
let emptyArr = [];

async function getDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  cards.innerHTML = "";
  emptyArr = data;
  filtered = filtered.length || search.value ? filtered : data;
  filtered.forEach((el) => {
    cards.innerHTML += `
        <span class="col-12 col-md-6 col-lg-4 col-xl-3 pt-4">
            <div class="card">
              <img src="${el.photo}" alt="" class="w-100" />
              <div class="card-text text-center">
                <p class="type">${el.type}</p>
                <h5>${el.productName}</h5>
                <p class="price">$${el.price}</p>
                <div class="btns d-flex flex-column gap-1">
                  <button class="btn" onclick="deleteCard(${el.id})">Delete</button>
                  <a href="add&edit.html?id=${el.id}" class="btn">Edit</a>
                  <a href="details.html?id=${el.id}" class="btn">View Details</a>
                  <a  onclick="addFav(${el.id})" class="btn">Add Basket</a>
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

async function addFav(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/basket`, data);
}

search.addEventListener("input", async function (event) {
  filtered = filtered.filter((el) => {
    return `${el.productName}`
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase());
  });
  getDatas();
});

select.addEventListener("change", async function () {
  if (select.value == "asc") {
    filtered.sort((a, b) => a.price - b.price);
    getDatas();
  } else if (select.value == "desc") {
    filtered.sort((a, b) => b.price - a.price);
    getDatas();
  } else {
    let res = await axios(BASE_URL);
    let data = await res.data;
    filtered = data;
    getDatas();
  }
});
