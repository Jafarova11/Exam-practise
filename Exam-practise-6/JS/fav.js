let BASE_URL = `http://localhost:8080/basket`;
let favCards = document.querySelector(".fav-cards");

async function favDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  favCards.innerHTML = "";
  data.forEach((el) => {
    favCards.innerHTML += `
    <span class="col-12 col-md-6 col-lg-4 col-xl-3 pt-4">
            <div class="card">
              <img src="${el.photo}" alt="" class="w-100" />
              <div class="card-text text-center">
                <p class="type">${el.type}</p>
                <h5>${el.productName}</h5>
                <p class="price">$${el.price}</p>
                <div class="btns d-flex flex-column gap-1">
                  <button class="btn" onclick="removeCard(${el.id})">Delete</button>
                  <a href="add&edit.html?id=${el.id}" class="btn">Edit</a>
                  <a href="details.html?id=${el.id}" class="btn">View Details</a>
                  </div>
              </div>
            </div>
          </span>
    `;
  });
}
favDatas();

async function removeCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
