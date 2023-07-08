import { ITask } from '@/components/tasks/taskSchema';
import { createContext } from 'react';

export interface ITaskContext {
  showModal: boolean;
  toggleModal: () => void;
  taskData: ITask;
  setTaskData: (taskData: ITask) => void;
  tasksList: Array<ITask>;
  setTasksList: (taskList: Array<ITask>) => void;
  filteredTasksList: Array<ITask>;
  setFilteredTasksList: (taskList: Array<ITask>) => void;
}

export const TasksContext = createContext<ITaskContext>({} as ITaskContext);
export default TasksContext;