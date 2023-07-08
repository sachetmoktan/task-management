import TasksContext from '@/context/task/TaskContext';
import { useContext, useState } from 'react';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { ITask } from './taskSchema';
import ViewModal from '../modal/Modal';
import useToggleBoolean from '@/hooks/useToggle';

const TasksList = () => {
    const { tasksList, filteredTasksList, setFilteredTasksList, setTasksList, toggleModal, setTaskData } = useContext(TasksContext);
    const [showDeleteModal, toggleDeleteModal] = useToggleBoolean(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    function handleEditClick (task: ITask) {
        toggleModal();
        setTaskData(task)
    }

    function handleDeleteClick () {
    const tasks = [...tasksList];
    const remainingTask = tasks.filter((item) => item.id !== deleteId);
    setTasksList(remainingTask);
    const filteredTasks = [...filteredTasksList]
    const remainingFilteredTask = filteredTasks.filter((item) => item.id !== deleteId);
    setFilteredTasksList(remainingFilteredTask)
    }

  return (
    <>
        <ViewModal
        isOpenModal={showDeleteModal}
        toggleModal={toggleDeleteModal}
        modalTitle={"Delete Task"}
        >
            <div className='my-4'>
            <h4 className='text-center'>Are you sure you want to delete parmanently?</h4>
            <div className='text-center'>
            <button className='btn btn-sm btn-danger text-white me-2'
            type='button'
            onClick={() => {handleDeleteClick(); toggleDeleteModal();}}
            >
            Delete
            </button>
            <button className='btn btn-sm btn-secondary text-white'
            type='button'
            onClick={() => toggleDeleteModal()}
            >
                Cancel
            </button>
            </div>
            </div>
        </ViewModal>
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
                        onClick={() => {toggleDeleteModal(); setDeleteId(task?.id);}
                            // handleDeleteClick(task)
                        }
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
