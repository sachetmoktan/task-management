import TasksContext from '@/context/task/TaskContext';
import { useContext, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import { TASK_OPT } from './const';
import { ITask, initialTask } from './taskSchema';
import { toast } from 'react-toastify';

interface IProps {
  toggleModal: () => void;
}

const TaskForm = (props: IProps) => {

  const { toggleModal } = props;

  const { taskData, 
    setTaskData, setTasksList, setFilteredTasksList, tasksList
  } = useContext(TasksContext);

  const [formData, setFormData] = useState<ITask>(taskData);
  const [errors, setErrors] = useState<Array<string>>([]);

  function handleChange (value: number | string | boolean | Date, name: string) {
    const errorList = [...errors];
    setFormData({ ...formData, [name]: value });

    const filteredErrorList = errorList.filter(error => error !== name);
    setErrors(filteredErrorList);
  }

  function handleTaskSubmit () {
    const taskList = tasksList ? [...tasksList] : [];
    const err = [];
    let isValid = true;

    if (!formData?.taskName || formData?.taskName === '') {
      err.push('taskName');
      isValid = false;
    } if (!formData?.taskName || formData?.description === '') {
      err.push('description');
      isValid = false;
    } if (!formData?.dueDate) {
      err.push('dueDate');
      isValid = false;
    } if (!formData?.status) {
      err.push('status');
      isValid = false;
    }
    if (isValid) {
      if (formData.id) {
        const indexOfEditData = taskList.findIndex((item) => item.id === formData.id);
        if (indexOfEditData !== -1) {
          taskList[indexOfEditData] = formData;
        }
      } else {
        taskList.push({ ...formData, id: JSON.stringify(Date.now()) });
      }
      setTasksList([...taskList]);
      setFilteredTasksList([...taskList]);
      setTaskData({ ...initialTask });
      toggleModal();
      toast.success(`Successfully ${formData.id ? "updated" :"added"}!`)
    }
    setErrors(err);
  }

  return (
    <form className="form h-100 p-3" onSubmit={(e) => {
      e.preventDefault(); 
      handleTaskSubmit();
      }}>
        <div className="row">
          
          <div className="col-md-6 mt-3">
            <label htmlFor='taskName'>Task Name</label>
            <span className='text-danger'>*</span>
            <input 
            className="form-control form-control-sm" 
            placeholder="Enter Task Name..." 
            id="taskName" 
            name="taskName"
            value={formData?.taskName} 
            onChange={(e) => handleChange(e.target.value, e.target.name)} 
            />
            {errors.includes('taskName') && (
              <p className='text-danger fs-sm mt-1'>Task Name is Required!</p>
            )}
          </div>
          
          <div className="col-md-6 mt-3">
            <label htmlFor='dueDate'>Due Date</label>
            <span className='text-danger'>*</span>
            <div>
            <ReactDatePicker
              placeholderText='Select Due Date...' 
              className="form-control form-control-sm" 
              selected={formData?.dueDate} 
              onChange={(event: Date) => {handleChange(event, 'dueDate')}} 
            />
            </div>
            {errors.includes('dueDate') && (
              <p className='text-danger fs-sm mt-1'>Due Date is Required!</p>
            )}
          </div>

          <div className="col-12 mt-3">
            <label htmlFor='description'>Task Description</label>
            <span className='text-danger'>*</span>
            <textarea 
              className="form-control form-control-sm" 
              placeholder="Enter Task description..." 
              id="description" 
              name="description"
              value={formData?.description}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
              rows={8}
            />
            {errors.includes('description') && (
              <p className='text-danger fs-sm mt-1'>Description is Required!</p>
            )}
          </div>

          <div className="col-12 mt-3">
            <label htmlFor='description'>Task Status</label>
            <span className='text-danger'>*</span>
            <Select
              name="status"
              options={TASK_OPT}
              className="basic-multi-select"
              classNamePrefix="select"
              menuPosition="fixed"
              value={formData?.status}
              onChange={(event: any) => {
                handleChange(event, "status")
              }}
              isLoading={false}
              isMulti={false}
            />
            {errors.includes('status') && (
              <p className='text-danger fs-sm mt-1'>Task Status is Required!</p>
            )}
          </div>


          <div className="col-12 mt-3 d-flex justify-content-end">
            <button 
            className='btn btn-gradient text-white' 
            type='submit'
            >
              {formData?.id ? (
                "Edit"
              ) : (
                "Submit"
              )}
            </button>
          </div>

        </div>
    </form>
  )
}

export default TaskForm;
