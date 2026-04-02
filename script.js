const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await response.json();

  data.categories.forEach((category) => {
    const categoryContainer = document.getElementById("categoryContainer");

    const categoryBtn = document.createElement("div");
    categoryBtn.className = "btn btn-soft btn-success w-full";
    categoryBtn.innerHTML = category.category_name;

    categoryContainer.append(categoryBtn);
  });
};
loadCategories();


const loadAllPlants = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/plants",
  );
  const data = await response.json();
  displayAllPlants(data.plants);
};
loadAllPlants();

const displayAllPlants = (plants) => {
  const treeContainer = document.getElementById("treeContainer");
  treeContainer.innerHTML = " ";

  plants.forEach((plant) => {
    const plantCard = document.createElement("div");
    plantCard.className = "card bg-base-100 shadow-sm";
    plantCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
        <figure>
            <img class="h-72 w-full object-cover" src="${plant.image}"alt="Shoes" />
         </figure>
        <div class="card-body space-y-1">
            <h2 class="card-title">${plant.name}</h2>
            <p class="line-clamp-2">${plant.description}</p>
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

