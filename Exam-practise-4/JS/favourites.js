let BASE_URL = `http://localhost:8080/favs`;
let cards = document.querySelector(".cards");
let id = new URLSearchParams(window.location.search).get("id");

async function getFavs() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  cards.innerHTML = "";
  data.forEach((el) => {
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
                <button onclick="removeFav(${el.id})">DELETE</button>
                <a href="add&edit.html?id=${el.id}">EDIT</a>
                </div>
              </div>
            </div>
          </span>
    `;
  });
}
getFavs();

async function removeFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove;
}
