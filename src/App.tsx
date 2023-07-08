import '@/assets/scss/main.scss';
import Tasks from '@/components/tasks';
import Title from '@/components/title';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskProvider } from './context/task/TaskProvider';

function App() {
  return (
    <div className='wrapper'>
      <Title />
      <TaskProvider>
        <Tasks />
      </TaskProvider>
      <ToastContainer pauseOnHover position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default App
