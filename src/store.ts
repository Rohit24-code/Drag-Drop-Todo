import React from 'react'
import { create } from 'zustand';
import { devtools ,persist} from 'zustand/middleware';

const store = (set:any) => ({
 tasks:[],
 draggedTask:null,
 //whenever you need to manuplate the state use set
 addTask : (title:string,state:any)=> 
 set((store:any)=>({tasks:[...store.tasks,{title,state}]})
 ,false,
 'addTask'),
//addTask on line 12 is the label used for debugging and false is for wheater you want to manuplate the whole state or just manuplate the property we are giving.

 deleteTask : (title:string)=> 
 set((store:any)=>({tasks:store.tasks.filter((task:any)=>task.title!= title)})),

 setDraggedTask:(title:string)=>set({draggedTask:title}),

 moveTask:(title:string,state:any)=>set((store:any)=>({
    tasks: store.tasks.map((task:any)=> task.title===title ? {title,state} : task)
 }))

})
//persist is used to persist the state it takes two params one having name key;
export const useStore:any= create(persist(devtools(store),{name:"persistStore"}))