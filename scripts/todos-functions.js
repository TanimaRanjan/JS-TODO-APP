'use strict'

// Get saved Todos
const getSavedTodos = () => {
    // Get the todo that is saved either in DB or Local Storage 
    const todosJSON = localStorage.getItem('todos')
    try {
        // If some data is found the parse the JSON received to array using JSON.parse
        return todosJSON ? JSON.parse(todosJSON) : []    
    } catch (error) {
        return []
    }
}

// Save Todo to local storage or DB
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Generate DOM to display the todo
const generateTodoDOM = (todo, filter) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkEl = document.createElement('input');
    const textEl = document.createElement('span');
    const buttonEl = document.createElement('button');


    checkEl.setAttribute('type', 'checkbox')
    buttonEl.textContent = 'remove';
    //Add the class from css
    buttonEl.classList.add('button', 'button--text')

    checkEl.checked = todo.completed;

    if (todo.completed) {
        checkEl.setAttribute('checked', 'true')
    }
    containerEl.appendChild(checkEl);

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')

    buttonEl.addEventListener('click', (e) => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filter);
    })

    checkEl.addEventListener('change', (e) => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filter);
    })

    
    let temp = (todo.completed) ?  'Done' : 'Not Done'
    
    textEl.textContent = ` ${todo.title} - ${temp} `
    containerEl.appendChild(textEl);
    todoEl.appendChild(containerEl)
    todoEl.appendChild(buttonEl);

    return todoEl;
}

// Render the todos and use the filter text to filter out the todo displayed 
const renderTodos = (todos, filters) => {

    const todoEl = document.querySelector('#todos');
    const filteredTodo = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleteMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompleteMatch
    })

    todoEl.innerHTML = ''
    const incompletefilter = filteredTodo.filter((todo) => !todo.completed)

    getSummaryTodo(incompletefilter)

    if (filteredTodo.length > 0) {
        filteredTodo.forEach((note) => {
            todoEl.appendChild(generateTodoDOM(note, filters))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No To-do to show'
        todoEl.appendChild(messageEl)
    }
}

const getSummaryTodo = (incompletefilter) => {
    const summary = document.createElement('h2');
    summary.classList.add('list-title')
    let plural = incompletefilter.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompletefilter.length} todo${plural} left`
    document.querySelector('#todos').appendChild(summary)
}

const addNewTodo = (newTodoTitle) => {
    todos.push({
        id:uuidv4(),
        title: newTodoTitle,
        completed: false
    });
    saveTodos(todos);
    renderTodos(todos, filters)
}



const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id )

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if(todo) {
       todo.completed = !todo.completed;
    }
}