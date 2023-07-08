import ViewModal from '@/components/modal/Modal';
import TasksContext from '@/context/task/TaskContext';
import useToggleBoolean from '@/hooks/useToggle';
import { useContext, useState } from 'react';
import { Collapse } from 'reactstrap';
import TaskFilterForm from './TaskFilterForm';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
import { ITaskFilter, initialTask, initialTaskFilter } from './taskSchema';
import TasksList2 from './TaskList2';

const Tasks = () => {
  const { taskData, showModal, toggleModal, setTaskData, setFilteredTasksList, tasksList } = useContext(TasksContext);

  const [showFilterForm, toggleFilterForm] = useToggleBoolean(false);
  const [formData, setFormData] = useState<ITaskFilter>(taskData);
  const [switchView, setSwitchView] = useToggleBoolean(false);

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

      <div className='card card-top card-top-flex flex-row'>
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
        <div className='my-2'>
          <button className='btn btn-sm btn-tab text-white me-2'
          type='button'
          onClick={() => setSwitchView()}
          >
            {switchView ? "Show Task List 1" : "Show Task List 2"}
          </button>
        </div>
        {
        switchView ?
        <TasksList2/> :
        <TasksList/>}
      </div>

    </>
  )
}

export default Tasks;
