const categoryContainer = document.getElementById("categoryContainer");
const treeContainer = document.getElementById("treeContainer");
const LoadingSpinner = document.getElementById("LoadingSpinner");
const plantModal = document.getElementById("plantModal");
let cart = [];

const showLoading = () => {
  LoadingSpinner.classList.remove("hidden");
};

const hideLoading = () => {
  LoadingSpinner.classList.add("hidden");
};

const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await response.json();

  data.categories.forEach((category) => {
    const categoryBtn = document.createElement("div");
    categoryBtn.className = `btn btn-soft btn-success w-full active`;
    categoryBtn.innerHTML = category.category_name;
    categoryContainer.append(categoryBtn);

    categoryBtn.onclick = () => selectCategory(category.id, categoryBtn);
  });
};
loadCategories();

const selectCategory = async (categoryId, btns) => {
  showLoading();

  const allBtn = document.querySelectorAll("#categoryContainer .active");

  allBtn.forEach((btn) => {
    btn.classList.remove("btn-success", "btn-soft");
    btn.classList.add("btn-outline", "btn-success");
  });
  btns.classList.add("btn-success", "btn-soft");
  btns.classList.remove("btn-outline", "btn-success");

  response = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await response.json();
  displayAllPlants(data.plants);
  hideLoading();
};

const loadAllPlants = async () => {
  showLoading();
  const response = await fetch(
    "https://openapi.programming-hero.com/api/plants",
  );
  hideLoading();
  const data = await response.json();
  displayAllPlants(data.plants);
};
loadAllPlants();

const loadPlantData = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/plant/${id}`,
  );
  const data = await response.json();
  displayPlantData(data.plants);
};

const displayPlantData = (plants) => {
  console.log(plants.name);
  plantModal.innerHTML = `
                          <div class="modal-box bg-slate-950 space-y-3">
                              <h3 class="text-2xl text-center font-bold text-green-400">Tree Details</h3>
                              <img class="rounded-md w-full h-72 object-cover" src="${plants.image}" alt="${plants.name}">
                              <h3 class="text-lg font-bold text-green-400">${plants.name}</h3>
                              <p class="text-white">${plants.description}</p>
                              <p class="text-lg font-bold text-green-400">Category: <span class="text-base font-bold text-white">${plants.category}</span> </p>
                              <div class="flex justify-between items-center">
                              <h3 class="text-lg font-bold text-green-400">Price: $${plants.price}</h3>
                              <button onclick="addToCart(${plants.id} , '${plants.name}' , ${plants.price})" class="btn btn-success text-white rounded-full">Add to Cart</button>
                              </div>
                          </div>
                          <form method="dialog" class="modal-backdrop">
                              <button>close</button>
                          </form>
            `;
  plantModal.showModal();
};

const displayAllPlants = (plants) => {
  treeContainer.innerHTML = " ";

  plants.forEach((plant) => {
    // console.log(plant.id);
    const plantCard = document.createElement("div");
    plantCard.className = "card bg-base-100 shadow-sm";
    plantCard.innerHTML = `
              <div class="card bg-base-100 shadow-sm">
                  <figure>
                      <img onclick="loadPlantData(${plant.id})" class="h-72 w-full object-cover cursor-pointer" src="${plant.image}" alt="${plant.name}" />
                  </figure>
                  <div class="card-body space-y-1">
                      <h2 onclick="loadPlantData(${plant.id})" class="card-title cursor-pointer">${plant.name}</h2>
                      <p onclick="loadPlantData(${plant.id})" class="line-clamp-2 cursor-pointer">${plant.description}</p>
                      <div class="flex justify-between items-center">
                          <div class="badge badge-success text-black rounded-full">${plant.category}</div>
                              <p class="grow-0 font-bold text-xl">$${plant.price}</p>
                          </div>
                          <div class="card-actions justify-center">
                              <button onclick="addToCart(${plant.id} , '${plant.name}' , ${plant.price})" class="btn btn-success w-full text-white rounded-full">Add to Cart</button>
                          </div>
                  </div>
              </div>
              `;

    treeContainer.append(plantCard);
  });
};

const addToCart = (id, name, price) => {
  console.log(id, name, price);
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }
  updateCart();
};

const cartContainer = document.getElementById("cartContainer");
const updateCart = () => {
  cartContainer.innerHTML = "";
  
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity
    const cartItem = document.createElement("div");
    cartItem.className = "card card-body shadow-lg bg-slate-400 space-y-4";
    cartItem.innerHTML = `
              <div class="flex justify-between items-center">
                  <div>
                      <h2>${item.name}</h2>
                      <p>${item.price} x ${item.quantity}</p>
                  </div>
                  <button onclick="removeCart(${item.id})" class="btn btn-ghost">X</button>
              </div>
              <p class="text-right">${item.price * item.quantity}</p>
              `;
    cartContainer.append(cartItem);
  });
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.innerText = `$${total}`;
};

const removeCart = (plantID) => {
  console.log(plantID);
  const removedElement = cart.filter((item) => item.id != plantID);
  cart = removedElement;
  updateCart();
};
