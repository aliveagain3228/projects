let ingredientList = JSON.parse(localStorage.getItem('myIngredients')) || [];
let allRecipes = JSON.parse(localStorage.getItem('myAllRecipes')) || [];
let listUl;
let currentEditId = null;

const saveToStorage = () => {
  localStorage.setItem('myIngredients', JSON.stringify(ingredientList));
};

const saveLibrary = () => {
  localStorage.setItem('myAllRecipes', JSON.stringify(allRecipes));
};

function renderList () {
  if (!listUl) return;

  listUl.innerHTML = '';

  ingredientList.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.amount} ${item.unit}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';

    delBtn.onclick = () => {
      ingredientList = ingredientList.filter((element) => element.id !== item.id);
      saveToStorage();
      renderList();
    };

    li.appendChild(delBtn);
    listUl.append(li);
  });
}

window.onload = () => {
  const btnAdd = document.querySelector('.add-btn');
  listUl = document.getElementById('ing-list');

  const editId = localStorage.getItem('editRecipeId');

  if (editId) {
    const idToFind = JSON.parse(editId);
    const recipeToEdit = allRecipes.find( r => r.id === idToFind);

    if (recipeToEdit) {
      document.getElementById('recipe-title').value = recipeToEdit.name;
      ingredientList = [...recipeToEdit.list];
      currentEditId = recipeToEdit.id;
      renderList();
    }

    localStorage.removeItem('editRecipeId');
  } else {
    renderList();
  }

  btnAdd.addEventListener('click', () => {
    const nameInput = document.getElementById('ing-name');
    const amountInput = document.getElementById('ing-amount');
    const unitInput = document.getElementById('ing-unit');

    if (nameInput.value && amountInput.value) {
      const newIngredient = {
        id: Date.now(),
        name: nameInput.value,
        amount: amountInput.value,
        unit: unitInput.value,
      };
      ingredientList.push(newIngredient);
      saveToStorage();
      renderList();

      nameInput.value = '';
      amountInput.value = '';
    }
  });

  const btnSave = document.querySelector('.save-btn');

  btnSave.addEventListener('click', () => {
    const nameInput = document.getElementById('recipe-title');

    if (currentEditId) {
      const foundIndex = allRecipes.findIndex(r => r.id === currentEditId);
      if (foundIndex !== -1) {
        allRecipes[foundIndex] = {
          id: currentEditId,
          name: nameInput.value,
          list: [...ingredientList],
        };
      }
    } else {
      const recipeObj = {
        id: Date.now(),
        name: nameInput.value,
        list: [...ingredientList],
      };
      allRecipes.push(recipeObj);
    }

    saveLibrary();

    ingredientList = [];
    saveToStorage();
    nameInput.value = '';
    currentEditId = null;

    renderList();
    window.location.href = '/';
  });
};
