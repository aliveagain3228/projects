import Button from '@/components/Button/index.js'
import '@/styles/constructor.scss'
import '@/styles/ui-elements.scss'
import logicRaw from './logic.js?raw';


export default function constructorRecipe () {
  return (
    <div className="calculator-container">
    <div>
      <label>
        Название рецепта
        <input type="text" id="recipe-title" />
      </label>
    </div>
      <fieldset>
        <legend>Новый ингредиент</legend>
        <label>
          Что добавляем?
          <input type="text" id="ing-name" />
        </label>
        <label>
          Сколько?
          <input type="number" id="ing-amount" />
        </label>
        <label>
          Eдиница измерения
        <select name="" id="ing-unit">
          <option value="g">г</option>
          <option value="kg">кг</option>
          <option value="ml">мл</option>
          <option value="l">л</option>
          <option value="tl">ч.л</option>
          <option value="sl">с.л</option>
        </select>
        </label>
        <Button className="add-btn">Добавить</Button>
      </fieldset>
      <ul id="ing-list"></ul>
      <Button className="save-btn">Сохранить рецепт</Button>
      <script dangerouslySetInnerHTML={{ __html: logicRaw }} />
    </div>
  )
}