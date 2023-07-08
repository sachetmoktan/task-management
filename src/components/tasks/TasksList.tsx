import TasksContext from '@/context/task/TaskContext';
import { useContext } from 'react';
import {BsPencilFill, BsTrashFill} from 'react-icons/bs';
import { ITask } from './taskSchema';

const TasksList = () => {
    const { tasksList, filteredTasksList, setFilteredTasksList, setTasksList, toggleModal, setTaskData } = useContext(TasksContext);

    function handleEditClick (task: ITask) {
        toggleModal();
        setTaskData(task)
    }
    function handleDeleteClick (task: ITask) {
    const tasks = [...tasksList];
    const remainingTask = tasks.filter((t) => t.id !== task.id);
    setTasksList(remainingTask);
    const filteredTasks = [...filteredTasksList]
    const remainingFilteredTask = filteredTasks.filter((t) => t.id !== task.id);
    setFilteredTasksList(remainingFilteredTask)
    }

  return (
    <>
        {filteredTasksList.length > 0 ?
        filteredTasksList.map((task) => (
            <div className='listCard'>
                <div className="d-flex flex-column align-items-start justify-content-around">
                <h5 className='fw-bold'>{task.taskName}</h5>
                <p className=''><span className='fw-bold'>Description: </span>{task.description}</p>
                <p className=''><span className='fw-bold'>Due Date: </span>{task.dueDate?.toDateString()}</p>
                <p className=''><span className='fw-bold'>Status: </span>{task.status && typeof task.status === "object" && task.status?.value}</p>
                </div>
                <ul className="tableList tableList-action">
                    <li>
                    <button
                        className="btn btn-xs tableList-action-edit"
                        onClick={() => {
                        handleEditClick(task);
                        }}
                    >
                        <BsPencilFill />
                    </button>
                    </li>
                    <li>
                        <button
                        className="btn btn-xs tableList-action-delete"
                        type="button"
                        onClick={() => handleDeleteClick(task)}
                        >
                        <BsTrashFill />
                        </button>
                    </li>
                </ul>
            </div>
        )) : <h4 className='text-center'>No Task to show. Create new task</h4>}
      
    </>
  )
}

export default TasksList
