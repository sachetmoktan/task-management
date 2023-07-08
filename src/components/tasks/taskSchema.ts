  export interface ITask {
    id: string;
    taskName: string;
    description: string;
    dueDate: Date | null;
    status: null | {label: string, value: string};
    user: {label: string, value: string} | null;
  }

  export interface ITaskFilter {
    dueDate?: Date | null;
    status?: null | {label: string, value: string};
  }

  export const initialTask: ITask = {
    id: '',
    taskName: '',
    description: '',
    dueDate: null,
    status: null,
    user: null
  }

  export const initialTaskFilter: ITaskFilter = {
    dueDate: null,
    status: null
  }