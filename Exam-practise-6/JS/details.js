let BASE_URL = `http://localhost:8080/products`;
let cardDiv = document.querySelector(".detail");
let id = new URLSearchParams(window.location.search).get("id");

async function detailData() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  cardDiv.innerHTML += `
    <span class="col-12">
            <div class="card p-4">
              <div class="img-div d-flex justify-content-center">
                <img src="${data.photo}" alt="" class="w-25" />
              </div>
              <div class="card-text d-flex flex-column align-items-flex-start pt-4">
                <h5><strong>Product name:</strong> <em>${data.productName}</em></h5>
                <p class="type"><strong>Type:</strong> <em>${data.type}</em></p>
                <p class="price"><strong>Price:</strong><em>$${data.price}</em></p>
                <div class="btns pt-3">
                  <button class="btn" onclick="deleteCard(${data.id})">Delete</button>
                  <a href="add&edit.html?id=${data.id}" class="btn">Edit</a>
                  <a  onclick="addFav(${data.id})" class="btn">Add Basket</a>
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
  window.location = "index.html";
  btn.closest("span").remove();
}

async function addFav(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/basket`, data);
}
