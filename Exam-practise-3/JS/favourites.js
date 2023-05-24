let FAV_URL = `http://localhost:8080/favs`;
let cards = document.querySelector(".cards");
let id = new URLSearchParams(window.location.search).get("id");

async function getFavs() {
  let res = await axios(FAV_URL);
  let data = await res.data;
  cards.innerHTML = "";
  data.forEach((el) => {
    cards.innerHTML += `
    <span class="col-12 col-sm-6 col-md-4 col-lg-3 p-1">
            <div class="content">
              <img src="${el.photo}" alt="" class="w-50" />
              <h5>${el.title}</h5>
              <p>${el.main}</p>
              <p>${el.price}</p>
              <div class="btns">
              <button  onclick="remove(${el.id})">Remove</button>
              </div>
            </div>
          </span>
    `;
  });
}
getFavs();

async function remove(id, btn) {
  await axios.delete(`${FAV_URL}/${id}`);
  btn.closest("span").remove();
}
