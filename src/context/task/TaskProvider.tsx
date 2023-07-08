import { ITask, initialTask } from '@/components/tasks/taskSchema';
import { useState, ReactNode } from 'react';
import TasksContext from './TaskContext';
import useToggleBoolean from '@/hooks/useToggle';

interface ITaskProps {
  children: ReactNode;
}

export function TaskProvider(props: ITaskProps) {
  const [showModal, toggleModal] = useToggleBoolean(false);
  const [taskData, setTaskData] = useState<ITask>(initialTask);
  const [tasksList, setTasksList] = useState<Array<ITask>>([]);
  const [filteredTasksList, setFilteredTasksList] = useState<Array<ITask>>([]);

  return (
    <TasksContext.Provider
      value={{
        showModal,
        toggleModal,
        taskData, 
        setTaskData,
        tasksList,
        setTasksList, 
        filteredTasksList,
        setFilteredTasksList
      }}>
      {props.children}
    </TasksContext.Provider>
  );
}
