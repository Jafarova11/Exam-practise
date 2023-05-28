let BASE_URL = `http://localhost:8080/robots`;
let detail = document.querySelector("#detail");
let id = new URLSearchParams(window.location.search).get("id");

async function detailData() {
  let res = await axios(`${BASE_URL}/${id}`);
  let el = await res.data;
  detail.innerHTML = `
  <span class="col-12">
  <div class="card p-4">
    <div class="img-div mb-4">
      <img src="${el.photo}" alt=""/>
    </div>
    <div class="card-bottom">
      <h5>${el.robotName}</h5>
      <p>${el.description}</p>
      <div class="btns d-flex justify-content-between gap-2 mt-4">
      <button onclick="deleteCard(${el.id})">DELETE</button>
      <a href="add&edit.html?id=${el.id}">EDIT</a>
      <button onclick="addFav(${el.id})">ADD FAVOURITES</button>
      </div>
      </div>
    </div>
  </div>
</span>
  `;
}

if (id) {
  detailData();
}

async function deleteCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

async function addBasket(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/basket`, data);
}
