let FAV_URL = `http://localhost:8080/basket`;
let favs = document.querySelector(".row");
let id = new URLSearchParams(window.location.search).get("id");

async function basketDatas() {
  let res = await axios(FAV_URL);
  let data = await res.data;
  favs.innerHTML = "";
  data.forEach((el) => {
    favs.innerHTML += `
    <span class="col-12 col-lg-4">
            <div class="card">
              <img src="${el.photo}" alt="" width="50px"/>
              <h5>${el.name}</h5>
              <p>${el.description}</p>
              <div class="btns d-flex gap-1 justify-content-center">
                <button class="delbtn" onclick="removeFav(${el.id})">Remove</button>
                <a href="" class="btn btn-secondary ">Details</a>
                <a href="add&edit.html?id=${el.id}" class="btn btn-success">Edit</a>
              </div>
            </div>
          </span>
        `;
  });
}
basketDatas();

async function removeFav(id) {
  await axios.delete(`${FAV_URL}/${id}`);
  btn.closest("span").remove();
}
