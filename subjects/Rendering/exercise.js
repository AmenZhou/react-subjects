////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import sortBy from 'sort-by'

//TODO TWO ERRORS
//warning.js:45 Warning: Each child in an array or iterator should have a unique "key" prop.
//ReactDOMSelect.js:183 Uncaught TypeError: Cannot set property 'pendingUpdate' of null
const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'mushy peas', type: 'english' },
    { id: 5, name: 'fish and chips', type: 'english' },
    { id: 6, name: 'black pudding', type: 'english' }
  ]
}

function Menu() {
  const items = DATA.items.
    filter((item) => item.type == 'mexican').
    sort(sortBy('name')).
    map((item) => <li>{item.name}</li>)

  return (
    <div>
      <h1>{DATA.title}</h1>
      Open the console, you have failing tests.
      <DropDown />
      <ul>
        {items}
      </ul>
    </div>
  )
}

function updateThePage(type) {
  const items = DATA.items.
    filter((item) => item.type == type).
    sort(sortBy('name')).
    map((item) => <li>{item.name}</li>)

  render ((
    <div>
      <h1>{DATA.title}</h1>
      Open the console, you have failing tests.
      <DropDown />
      <ul>
        {items}
      </ul>
    </div>
  ), document.getElementById('app'))
}

function dropDownHandler(event) {
  console.log('dropDownHandler')
  updateThePage(event.target.value)
}

function DropDown() {
  const types = DATA.items.map(item => <option value={item.type}>{item.type}</option>)

  return (
    <div>
    Please Select Type
    <select onChange={dropDownHandler}>
      {types}
    </select>
    </div>
  )
}

render(<Menu />, document.getElementById('app'), () => {
  require('./tests').run()
})
