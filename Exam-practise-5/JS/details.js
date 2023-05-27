let BASE_URL = `http://localhost:8080/tips`;
let detail = document.querySelector("#detail");
let id = new URLSearchParams(window.location.search).get("id");

async function detailData() {
  let res = await axios(`${BASE_URL}/${id}`);
  let element = await res.data;
  detail.innerHTML = `
    <div class="product-info">
      <img src="${element.photo}" alt="Product Image" class="mb-4"/>
      <h1>Name: <em>${element.name}</em></h1>
      <p><strong>Description:</strong> ${element.description}</p>
      <div class="btns">
        <button class="btn btn-danger delbtn m-1" onclick="deleteCard(${element.id})">Delete</button>
        <button class="btn btn-primary m-1" onclick="addBasket(${element.id})">Add Basket</button>
        <a href="add&edit.html?id=${element.id}" class="btn btn-success m-1">Edit</a>
      </div>
    </div>
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
