import create from "zustand";
import produce from "immer";
import {v4 as uuid} from 'uuid'

export const useTodoStore = create((set) => ({
  todos : [
    {name: 'drink milk', id: uuid(), index: 0},
    {name: 'go shopping', id: uuid(), index: 1},
    {name: 'buy another milk', id: uuid(), index: 2},
  ],
  addTodo : (todoName) => set(
    produce((state) => {
      const newTodo = {name : todoName, id : uuid(), index : state.todos.length};
      state.todos.push(newTodo);
    })),
    
  removeTodo : (todoId, todoIdx) => set(
    produce((state) => {
      state.todos.forEach((todo) => {
        if(todo.index > todoIdx) {todo.index -= 1}
      })
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
      console.log(state.todos);
    })),

  updateTodo : (todoId, todoName) => set(
    produce((state) => {
      state.todos.forEach((todo) => {
        if(todo.id === todoId) {
          todo.name = todoName;
        }})
  })),
  changePosition : (dragIdx, targetIdx) => set(
    produce((state) => {
      console.log(dragIdx, targetIdx);
      const dragItem = state.todos.splice(dragIdx, 1)[0];
      state.todos.splice(targetIdx, 0, dragItem);
      
      if(dragIdx < targetIdx) {
        state.todos[dragIdx].index = dragIdx;
        state.todos[targetIdx].index = targetIdx;
        for(let i = dragIdx + 1; i < targetIdx; i++) {
          state.todos[i].index = i;
        }
      } else {
        state.todos[dragIdx].index = dragIdx;
        state.todos[targetIdx].index = targetIdx;
        for(let i = targetIdx + 1; i < dragIdx; i++) {
          state.todos[i].index = i;
        }
      }
    })
  )
}))