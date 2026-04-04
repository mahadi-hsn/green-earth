const categoryContainer = document.getElementById("categoryContainer");
const treeContainer = document.getElementById("treeContainer");
const LoadingSpinner = document.getElementById("LoadingSpinner");
const plantModal = document.getElementById('plantModal');

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


// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }
const displayPlantData = (plants) =>{
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
                    <button class="btn btn-success text-white rounded-full">Add to Cart</button>
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
  `
  plantModal.showModal();
}

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
                     <button class="btn btn-success w-full text-white rounded-full">Add to Cart</button>
                </div>
        </div>
    </div>
    `;

    treeContainer.append(plantCard);
  });
};
