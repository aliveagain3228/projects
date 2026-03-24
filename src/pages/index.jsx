import Button from '@/components/Button/index.js'
import '@/styles/library.scss'

export default () => {
  return (
    <>
      <div className="container">
        <h1 style={{marginBottom: '20px'}}>
          Калькулятор специй
        </h1>

        <div className="top-actions" style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
          <Button href="/mainCalculator.html">Рассчитать</Button>

          <Button href="/constructor.html ">
            + Создать новый рецепт
          </Button>
        </div>

        <p id="recipe-counter" style={{marginTop: '40px', marginBottom: '10px' }}></p>

        <div id="saved-recipe">

        </div>

        <Button id="clear-all-recipes">Очистить всё</Button>

        <script dangerouslySetInnerHTML={{
          __html:`
          let allRecipes = JSON.parse(localStorage.getItem('myAllRecipes')) || [];
          
          function renderLibrary () {
            const savedRecipe = document.getElementById('saved-recipe');
            const clearAllRecipes = document.getElementById('clear-all-recipes');
            const recipeCounter = document.getElementById('recipe-counter');
            
            if (clearAllRecipes) {
              clearAllRecipes.style.display = allRecipes.length === 0 ? 'none' : 'block';
            }
            
            if (recipeCounter ) {
              recipeCounter.textContent = "Всего рецептов : " + allRecipes.length;
            }
            
            if (allRecipes.length === 0) {
              if (savedRecipe) {
                savedRecipe.innerHTML = "У вас пока нет рецептов, нажмите кнопку выше чтобы создать свой первый рецепт :)";
              }
              return; 
            }
            
            
            if (savedRecipe) {
              savedRecipe.innerHTML = ''; // Очищаем контейнер перед отрисовкой
              
              allRecipes.forEach((recipe) => {
                const recipeCard  = document.createElement('div')
                recipeCard.className="recipe-item"
                
                const recipeName = document.createElement('span')
                recipeName.textContent = recipe.name
                
                const controlsContainer = document.createElement('div')
                controlsContainer.className='cnt-container'
                
                const deleteButton = document.createElement('button')
                deleteButton.className = 'btn-card'
                deleteButton.textContent = 'Удалить'
                
                const clearButton  = document.createElement('button')
                clearButton.className = "btn-card"
                clearButton.textContent = 'Изменить'
                
                controlsContainer.appendChild(deleteButton)
                controlsContainer.appendChild(clearButton)
                
                recipeCard.appendChild(recipeName)
                recipeCard.appendChild(controlsContainer)
                
                savedRecipe.appendChild(recipeCard)
                
                deleteButton.onclick = (event) => {
                  event.stopPropagation()
                  allRecipes = allRecipes.filter((item) => item.id !== recipe.id )
                  localStorage.setItem('myAllRecipes', JSON.stringify(allRecipes))
                  renderLibrary()
                }
                
                recipeCard.onclick = () => {
                  localStorage.setItem('editRecipeId', JSON.stringify(recipe.id))
                  window.location.href = '/constructor.html'
                }
              })
            }
          }
          
      
          const clearAllRecipesButton = document.getElementById('clear-all-recipes')
          if (clearAllRecipesButton) {
            clearAllRecipesButton.onclick = () => {
              allRecipes = []
              localStorage.setItem('myAllRecipes', JSON.stringify(allRecipes))
              renderLibrary()
            }
          }
          
   
          setTimeout(renderLibrary, 50);
          `
        }}/>
      </div>
    </>
  )
}
