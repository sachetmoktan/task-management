import TasksContext from "@/context/task/TaskContext";
import { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ITask } from "./taskSchema";

const TasksList2 = () => {
  const { filteredTasksList } = useContext(TasksContext);

  const [arrData, setArrData] = useState<any>()

  useEffect(() => {
    alert("Task List 2 is not Completed!")
  }, [])

  useEffect(() => {
    const list = convertArrayToObj(filteredTasksList);
    setArrData(list)
  }, [filteredTasksList])

  function convertArrayToObj (filteredTasksList: ITask[]) {
    let supermanUsers: any = [];
    let batmanUsers: any = [];
    filteredTasksList && filteredTasksList.forEach((item) => {
      if(item.user?.value == "SUPERMAN")
        supermanUsers.push(item)
      else if(item.user?.value == "BATMAN")
        batmanUsers.push(item)
    })
    return {
      "SUPERMAN": supermanUsers,
      "BATMAN": batmanUsers
    }
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    const itemsHere = reorder(
      arrData,
      result.source,
      result.destination
      );

    setArrData(itemsHere)
    const k = Object.values(itemsHere)
    debugger
  }

function reorder (list: any, startIndex: any, endIndex: any) {
  const result = Object.assign(list, {});
  let arrHere = {...list};

  Object.entries(result).forEach(([keyName, value]: Array<any>) => {
    if(startIndex.droppableId === keyName) {
    const filteredSource = value.filter((item: ITask) => {
      return item.id != startIndex.index});
    arrHere[keyName] = filteredSource;
    }
    if(endIndex.droppableId === keyName) {
      const findData = result[startIndex.droppableId].find((item: any) => item.id == startIndex.index)
      arrHere[keyName] = [...value, findData]
    }
  });

  return arrHere;
};

function getItemStyle (isDragging: boolean, draggableStyle: any) {
    return ({
    userSelect: "none",
    padding: 16,
    margin: `0 0 8px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
    })
};

function getListStyle (isDraggingOver: boolean) {
    return ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250,
    margin: "0 8px 0 8px"
    })
}; 

  return (
    <>
      <div className="d-flex justify-content-center h-100">
      <DragDropContext onDragEnd={onDragEnd}>
          {
            arrData && Object.entries(arrData).map(([id, column]: Array<any>) => {
              return (
              <div className="d-flex flex-column h-100">
              <h4>{id}</h4>
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {column && column.map((item: ITask, index: number) => (
                      <Draggable key={item?.id} draggableId={item?.id} index={Number(item?.id)}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                              <div className="d-flex flex-column align-items-start justify-content-around">
                              <h5 className='fw-bold'>{item?.taskName}</h5>
                              <p className=''><span className='fw-bold'>Description: </span>{item?.description}</p>
                              <p className=''><span className='fw-bold'>Due Date: </span>{item.dueDate?.toDateString()}</p>
                              <p className=''><span className='fw-bold'>Status: </span>{item.status && item.status?.value}</p>
                              </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              </div>
            )})
      }
      </DragDropContext>
      </div>
    </>
  )
}

export default TasksList2
