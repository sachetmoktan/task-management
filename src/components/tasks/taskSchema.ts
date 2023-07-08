  export interface ITask {
    id: string;
    taskName: string;
    description: string;
    dueDate: Date | undefined;
    status: string | {label: string, value: string};
  }

  export interface ITaskFilter {
    dueDate?: Date;
    status?: string | {label: string, value: string};
  }

  export const initialTask: ITask = {
    id: '',
    taskName: '',
    description: '',
    dueDate: undefined,
    status: ''
  }

  export const initialTaskFilter: ITaskFilter = {
    dueDate: undefined,
    status: ''
  }