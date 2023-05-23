let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
let allCards = document.querySelector(".row");

function listFavs() {
  allCards.innerHTML = "";
  favourites.forEach((el) => {
    allCards.innerHTML += `
    <span class="col-12 col-sm-6 col-lg-4 p-3">
    <div class="card p-0">
    <img src="${el.photo}" alt="" />
    <div class="card-inner p-4">
      <h3>${el.title}</h3>
      <p>
        ${el.main}
      </p>
      <p>${el.price}</p>
      <div class="btns mt-4">
        <button class="btn btn-primary" onclick="removeFromFavs(${el.id})">Remove</button>
      </div>
    </div>
  </div>
  </span>
          `;
  });
}
listFavs();

function removeFromFavs(id) {
  favourites = favourites.filter((el) => el.id != id);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  listFavs();
}
