let BASE_URL = `http://localhost:8080/fav`;
let allCards = document.querySelector(".col-10");

async function drawFav(arr) {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  allCards.innerHTML = "";
  (data || arr).forEach((el) => {
    allCards.innerHTML += `
    <span class="col-12 col-sm-6 col-md-4 p-2">
      <div class="card">
        <img src="${el.photo}" class="w-100" alt="" />
          <div class="bottom">
          <div class="d-flex align-center gap-2">
          <h4>${el.name},</h4>
          <p>${el.age} yrs. old</p>
          </div>
          <button class="btn btn-danger" onclick="removeFav(${el.id})">Delete</button>
          </div>
          </div>
          </span>
          `;
  });
}
drawFav();

// let btn = document.querySelector(".btn-danger");
async function removeFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
