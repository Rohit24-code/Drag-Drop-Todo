import React, { useState } from 'react'
import "./column.css"
// import Task from './Task';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import Task from './Task';
import classNames from 'classnames';

type AppProps={
  state:string;
}



const Column = ({state}:AppProps) => {
  const [text,setText] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false);
  const [drop,setDrop]=useState(false);

  //shallow checks if there is some change in the array than re render
  const tasks = useStore((store:any)=>store?.tasks?.filter((task:any)=>task.state===state),shallow)
  const addTask = useStore((store:any)=>store.addTask);
  const setDraggedTask= useStore((store:any)=>store.setDraggedTask)
  const draggedTask= useStore((store:any)=>store.draggedTask)
  const moveTask= useStore((store:any)=>store.moveTask)
  return (
    <div className={classNames('column',{drop:drop})} 
    onDragOver={(e:any)=>{
      setDrop(true)
      e.preventDefault()
    }}
    onDragLeave={
      (e:any)=>{
        setDrop(false)
        e.preventDefault()
      }
    }
    onDrop={(e:any)=>
     { 
      setDrop(false)
      setDraggedTask(null)
      moveTask(draggedTask,state)
      // e.preventDefault()
      // console.log("draggedTask",draggedTask)
    }
    }
    >
      <div className="titleWrapper">
      <p>{state}</p>
      <button onClick={()=>setOpen(true)}>Add</button>
      </div>
     
      {
        tasks?.map((item:any)=>{
         return <Task title={item.title} key={item.title} status={state}/>
        })
      }

     {open && <div className="modal">
        <div className="modalContent">
          <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
          <button onClick={()=>{
            addTask(text,state);
            setText('');
            setOpen(false);
          }}>Submit</button>
        </div>
      </div>}
      
      </div>
  )
}

export default Column