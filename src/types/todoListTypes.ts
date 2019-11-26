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

export interface State {
  todos: Todo[];
  activeFilter: ActiveFilterName;
  editedTodoId: number | null;
}
