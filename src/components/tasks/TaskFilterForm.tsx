import TasksContext from '@/context/task/TaskContext';
import moment from 'moment';
import { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import { TASK_OPT } from './const';
import { ITask, ITaskFilter, initialTaskFilter } from './taskSchema';

interface IProps {
  formData: ITaskFilter;
  setFormData: (data: ITaskFilter) => void;
}

const TaskFilterForm = ({ formData, setFormData }: IProps) => {

  const { tasksList, setFilteredTasksList
  } = useContext(TasksContext);

  function handleChange(value: number | string | boolean | Date, name: string) {
    setFormData({ ...formData, [name]: value });
  }

  function handleTaskFilterSubmit() {
    let filteredTL: Array<ITask> = [];

    if (formData?.dueDate && formData?.status) {
      const filteredByBoth = tasksList.filter((item) => {
        if ((moment(item.dueDate).format('YYYY-MM-DD') == moment(formData.dueDate).format('YYYY-MM-DD')) &&
          (item.status && formData.status && item.status.value == formData.status.value)
        )
          return item
      })
      setFilteredTasksList(filteredByBoth);
      return;
    }

    if (formData?.dueDate || formData?.status) {
      if (formData?.dueDate) {
        const filteredByDD = tasksList.filter((item) => {
          if (moment(item.dueDate).format('YYYY-MM-DD') == moment(formData.dueDate).format('YYYY-MM-DD'))
            return item
        })
        filteredTL = [...filteredTL, ...filteredByDD]
      } if (formData?.status) {
        const filteredByStatus = tasksList.filter((item) => {
          if (item.status && formData.status && item.status.value == formData.status.value)
            return item
        })
        filteredTL = [...filteredTL, ...filteredByStatus]
      }
      setFilteredTasksList(filteredTL);
    }
    else {
      setFilteredTasksList(tasksList)
    }
  }

  function handleResetFilter() {
    setFilteredTasksList(tasksList)
    setFormData(initialTaskFilter)
  }

  return (
    <form className="h-100 p-3" onSubmit={(e) => {
      e.preventDefault();
      handleTaskFilterSubmit();
    }}>
      <div className="d-flex justify-content-around align-items-center">
        <div>
          <label htmlFor='dueDate'>Due Date</label>
          <div>
            <ReactDatePicker
              placeholderText='Select Due Date...'
              className="form-control form-control-sm"
              selected={formData?.dueDate}
              onChange={(event: Date) => { handleChange(event, 'dueDate') }}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Task Status</label>
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
        </div>

        <div>
          <button
            className='btn btn-filter text-white me-2'
            type='submit'
          >
            Filter
          </button>
          <button
            className='btn btn-secondary text-white'
            type='button'
            onClick={() => handleResetFilter()}
          >
            Reset
          </button>
        </div>

      </div>
    </form>
  )
}

export default TaskFilterForm;
