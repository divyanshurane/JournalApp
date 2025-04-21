import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
            <Navbar/>
            <h1>Journal Entries</h1>
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
    )

}