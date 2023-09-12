import React from 'react'
import './task.css'
import classNames from 'classnames';
import { useStore } from '../store';

type AppProps={
    title:string;
    status:any;
}



const Task = ({title,status}:AppProps) => {

  const task=useStore((store:any)=>store.tasks.find((task:any)=>task.title===title))
 
  const deleteTask=useStore((store:any)=>store.deleteTask);

  const setDraggedTask= useStore((store:any)=>store.setDraggedTask)

  return (
    <div className='task' draggable onDragStart={()=>setDraggedTask(task.title)}>
      <div>{task?.title}</div>
    
      <div className='bottomWrapper'>
        <div onClick={()=>deleteTask(task?.title)}>
          Delete
        </div>
        <div className={classNames('status',status)}>{task?.state}</div>
      </div>

      </div>
  )
}

export default Task;