export interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

export enum ActiveFilterName {
  ALL = "All",
  CHECKED = "Checked",
  UNCHECKED = "Unchecked"
}

export interface TodoState {
  todos: Todo[];
  activeFilter: ActiveFilterName;
  editedTodoId: number | null;
}

export interface UpdateTodoInfo {
  todoId: number;
  setNewTodo: (findedTodo: Todo) => Todo;
}
