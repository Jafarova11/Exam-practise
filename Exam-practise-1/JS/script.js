const BASE_URL = `http://localhost:8080/news`;
let cards = document.querySelector(".cards");
let sort = document.querySelector("select");
let searchInput = document.querySelector(".search");
let addNew = document.querySelector(".addnew");
let number = document.querySelectorAll(".number1");
let number1000 = document.querySelector(".number2");
let number1200 = document.querySelector(".number3");
let menuBar = document.querySelector(".fa-bars");
let ul = document.querySelector(".header");

menuBar.addEventListener("click", function () {
  ul.classList.toggle("show");
});

async function getDatas(arr) {
  let res = await axios(BASE_URL);
  let data = await res.data;
  cards.innerHTML = "";
  (arr || data).forEach((el) => {
    cards.innerHTML += `
    <span class="col-12 col-sm-6 col-lg-4 p-2">
    <div class="card m-0 p-0">
            <img src="${el.photo}" alt="" />
            <div class="card-inner p-3">
              <h3>${el.title}</h3>
              <p>
                ${el.main}
              </p>
              <p>${el.price}</p>
              <div class="btns mt-4 d-flex justify-content-between align-items-center">
                <i class="fa-solid fa-trash btn btn-danger" onclick="deleteCard(${el.id})"></i>
                <button class="btn btn-primary" onclick="addFav(${el.id})">Add Favourites</button>
              </div>
            </div>
          </div>
          </span>
    `;
  });
}
getDatas();

let delBtn = document.querySelector(".fa-trash");
async function deleteCard(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  delBtn.closest("span").remove();
}

let sortedArr;
sort.addEventListener("change", async function () {
  if (sort.value == "asc") {
    let res = await axios.get(BASE_URL);
    let data = res.data;
    sortedArr = data.sort((a, b) => +a.price - +b.price);
    getDatas(sortedArr);
  } else if (sort.value == "desc") {
    let res = await axios.get(BASE_URL);
    let data = res.data;
    sortedArr = data.sort((a, b) => +b.price - +a.price);
    getDatas(sortedArr);
  } else {
    let res = await axios.get(BASE_URL);
    let data = res.data;
    sortedArr = undefined;
    getDatas(data);
  }
});

searchInput.addEventListener("input", async function (event) {
  let res = await axios(BASE_URL);
  let searched = res.data.filter((el) => {
    return `${el.title}`
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase());
  });
  getDatas(searched);
});

let counter = 0;
let counter1 = 0;
let counter2 = 0;
window.onload = function () {
  {
    setInterval(() => {
      if (counter >= 1172) {
        counter = 1172;
        clearInterval();
      } else {
        counter += 100;
      }
      number[0].innerText = counter;
      number[1].innerText = counter;
    }, 40);
  }
  {
    setInterval(() => {
      if (counter1 >= 1000) {
        counter1 = 1000;
        clearInterval();
      } else {
        counter1 += 100;
      }
      number1000.innerText = counter1;
    }, 40);
  }
  {
    setInterval(() => {
      if (counter2 >= 1200) {
        counter2 = 1200;
        clearInterval();
      } else {
        counter2 += 100;
      }
      number1200.innerText = counter2;
    }, 40);
  }
};

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
async function addFav(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = res.data;
  let isAdded = favourites.find((item) => item.id === data.id);
  if (!isAdded) {
    favourites.push(data);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    console.log(favourites);
  } else {
    alert("Added already this!");
  }
}
