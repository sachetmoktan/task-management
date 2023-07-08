import ViewModal from '@/components/modal/Modal';
import useToggleBoolean from '@/hooks/useToggle';
import { Collapse } from 'reactstrap';
import TaskFilterForm from './TaskFilterForm';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
import { useContext, useState } from 'react';
import TasksContext from '@/context/task/TaskContext';
import { ITask, ITaskFilter, initialTask, initialTaskFilter } from './taskSchema';

const Tasks = () => {
  const { taskData, showModal, toggleModal, setTaskData, setFilteredTasksList, tasksList } = useContext(TasksContext);

  const [showFilterForm, toggleFilterForm] = useToggleBoolean(false);
  const [formData, setFormData] = useState<ITaskFilter>(taskData);

  const toggleFormModal = () => {
    toggleModal();
    setTaskData({...initialTask})
  }

  const toggleFilterFormModal = () => {
    toggleFilterForm();
    setFormData(initialTaskFilter)
    setFilteredTasksList(tasksList)
  }
  
  return (
    <>
    <ViewModal
      isOpenModal={showModal}
      toggleModal={toggleFormModal}
      modalTitle={taskData?.id ? "Update Task" : "Add Task"}
      >
        <TaskForm toggleModal={toggleFormModal} />
      </ViewModal>

      <div className='card card-top card-top-flex'>
        <h5 className='fw-bold'>
          Task Management
        </h5>
        <div>
          <button className='btn btn-sm btn-filter text-white me-2'
          type='button'
          onClick={toggleFilterFormModal}
          >
            {!showFilterForm ? "Filter Tasks" : "Close Filter Tasks"}
          </button>
          <button className='btn btn-sm btn-add text-white'
          type='button'
          onClick={toggleFormModal}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="card card-bottom flex-grow-1">
        <Collapse isOpen={showFilterForm} className="my-2">
          <div className={'filter-search p-4 mb-4'}>
            <TaskFilterForm formData={formData} setFormData={setFormData} />
          </div>
        </Collapse>
        <TasksList
        />
      </div>

    </>
  )
}

export default Tasks;
