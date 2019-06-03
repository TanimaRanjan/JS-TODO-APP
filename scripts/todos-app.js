'use strict'

// Calling getSavedTodos on todos-fuction 
const todos = getSavedTodos();

const filters = {
    searchText :'', 
    hideCompleted : false
}

renderTodos(todos, filters);

document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters)
})


document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    let newtodoEl = e.target.elements.newtodo.value;
    if(newtodoEl.trim().length > 0) {
        addNewTodo(newtodoEl)   
    }
    e.target.elements.newtodo.value = ''

})

document.querySelector('#hide-comp').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})


