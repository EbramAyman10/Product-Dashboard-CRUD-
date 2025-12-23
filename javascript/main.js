let products = JSON.parse(localStorage.getItem("products")) || [];

const addBtn = document.querySelector(".js-add");
let imgsrc = "";

const img = document.getElementById("img");
img.addEventListener("change", (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    imgsrc = reader.result;
  };
  reader.readAsDataURL(file);
});

addBtn.addEventListener("click", () => {
  const productName = document.getElementById("name");
  const price = document.getElementById("price");
  const category = document.getElementById("category");
  const desc = document.getElementById("desc");

  if (
    !productName.value ||
    !price.value ||
    !category.value ||
    !desc.value ||
    !imgsrc
  )
    return;

  products.push({
    productName: productName.value,
    price: price.value,
    category: category.value,
    desc: desc.value,
    img: imgsrc,
  });
  saveData();
  renderData();
  productName.value = "";
  price.value = "";
  category.value = "";
  desc.value = "";
  img.value = "";
  imgsrc = "";
});

function renderData(value = "") {
  value = value.toLowerCase();

  const filterProduct = products.filter((p) => {
    return p.productName.toLowerCase().includes(value);
  });

  let tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = "";
  filterProduct.forEach((product, index) => {
    tableBody.innerHTML += `
           <tr>
          <td>${product.productName}</td>
          <td>${product.price}</td>
          <td>${product.category}</td>
          <td>${product.desc}</td>
          <td><img src="${product.img}" /></td>
          <td><button class="js-delete" onClick="deleteProduct(${index})">Delete</button></td>
        </tr>
    `;
  });
}

function deleteProduct(index) {
  products = products.splice(index, 1);
  saveData();
  renderData();
}

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
}
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  renderData(searchInput.value);
});
renderData();
