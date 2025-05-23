import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { jsx } from "@emotion/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditForm from "./EditForm";


export default function Home(){
    const[entries,setEntries]= useState([]);
    const[editEntry,setEditEntry] = useState(null);
    

    //Getting Journal Entries on page initialization
    useEffect(()=>{                 
        axios.get("http://localhost:8081/journal/journal",
            {headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
                Accept : "application/json",
                "Content-Type" : "application/json"
            }}).then((response)=>{
                setEntries(response.data);
            }).catch(error=>console.log(error));
            greet();
    },[])

    const greet=()=>{
        axios.get("http://localhost:8081/journal/user",
            {headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }}).then((response)=>{
                 alert(response.data);
            }).catch(error=>console.log(error));
    }

   

    const deleteEntry=(id)=>{
        console.log("ID is",id);
        axios.delete(`http://localhost:8081/journal/journal/id/${id}`,
        {headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`            
        }}).then((response)=>{
            setEntries((prevEntry)=>prevEntry.filter((entry)=>entry.id!==id));
        }).catch(error=>console.log(error));
        console.log(entries);
    }
    
    const handleSave=(updatedEntry)=>{

        axios.put(`http://localhost:8081/journal/journal/id/${updatedEntry.id}`,updatedEntry,
        {
            headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`            
        }}).then((response)=>{
            setEntries(prev =>
                prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
            );
            setEditEntry(null);
        }).catch(error=>console.log(error));
    }

    // useEffect(()=>{
    //     console.log("Entries state updated", entries);
    // },[entries]);

    return(
        <div>
            {/* <Navbar/> */}
            <Header/>
            <div className="wrapper pt-30">
            <h1 className="text-5xl">Journal <span className="text-gradient">Entries</span> Dashboard</h1>
            <h2 className=""><a href="http://localhost:5173/journal/new">Add new entry</a></h2>
            <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
            <div>
                <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
                <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
            </div>
            </div>
            <ul>
                {entries.map((ele)=>{
                  return <li key={ele.id}> 
                  <button onClick={()=>setEditEntry(ele)}>Edit</button>
                  
                  <button onClick={()=>deleteEntry(ele.id)}><DeleteIcon/></button> 
                  {ele.title} - {ele.content}
                  </li>
                })}
            </ul>
            {editEntry && (
                    <EditForm
                     entry = {editEntry}
                     onSave = {handleSave}
                     onCancel = {()=>setEditEntry(null)}
            />)}
            </div>
        </div>
    )

}