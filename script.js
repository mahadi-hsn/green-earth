
const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await response.json();
    console.log(data.categories);
    
    data.categories.forEach(category => {
        const categoryContainer = document.getElementById('categoryContainer');
        // categoryContainer.innerHTML = '';

        const categoryBtn = document.createElement('div');
        categoryBtn.className = 'btn btn-soft btn-success w-full';
        categoryBtn.innerHTML = category.category_name;

        categoryContainer.append(categoryBtn);
        console.log(category.category_name);
    });
};
loadCategories();