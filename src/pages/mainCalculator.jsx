
export default function PivchikiPage() {


  return (
    <div className="container">
      <h1 style={{ marginBottom: '20px' }}>Калькулятор</h1>
      <select id="recipe-select"></select>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Коэффициент. То есть если у вас 500г мяса - пишите 0.5
        </label>

        <input
          type="number"
          defaultValue="1"
          id="weight-input"
          style={{ padding: '10px', fontSize: '16px', color: 'black' }}
        />

        <div style={{ marginTop: '30px' }}>
          <h3>Результат: <span id="weight-display"></span></h3>
          <ul id="ingredients-list"></ul>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        const allRecipes = JSON.parse(localStorage.getItem('myAllRecipes')) || []
        
        function init() {
        const recipeSelect = document.getElementById('recipe-select')
        const ingredientsList = document.getElementById('ingredients-list')
        const input = document.getElementById('weight-input');
        const display = document.getElementById('weight-display');
        
        if(allRecipes.length === 0) {
         if (recipeSelect.length === 0) {
         if (recipeSelect) recipeSelect.style.display = 'none'
         return
         }
        }
         
         allRecipes.forEach((recipe) => {
        const option = document.createElement('option')
        option.value = recipe.id
        option.textContent = recipe.name
        recipeSelect.appendChild(option)
        })
         
         function updateRecipe() {
        const selectedId = recipeSelect.value
            const chosenRecipe = allRecipes.find( r => r.id == selectedId )
            
            if (!chosenRecipe) return
            
            
            ingredientsList.innerHTML = ''
            
            chosenRecipe.list.forEach( ing => {
            const li = document.createElement('li')
            li.setAttribute('data-amount', ing.amount)
            li.innerHTML = '<strong>' + ing.name + ':</strong> <span class="val">' + ing.amount + '</span> ' + ing.unit;
        ingredientsList.appendChild(li);
            })
        }
         
         recipeSelect.addEventListener('change', updateRecipe);
         
         input.addEventListener('input', (e) => {
          const items = document.querySelectorAll('#ingredients-list li');
            const weight = parseFloat(e.target.value) || 0;
            display.textContent = weight;
            items.forEach(li => {
              const baseAmount = parseFloat(li.getAttribute('data-amount'));
              const valSpan = li.querySelector('.val');
              if (valSpan) {
              valSpan.textContent = (baseAmount * weight).toFixed(1);
              }
            });
          });
          updateRecipe();
          }
          
          setTimeout(init, 50)
        `
      }} />
    </div>
  )
}