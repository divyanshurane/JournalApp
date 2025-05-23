import Navbar from "../components/Navbar";
import axios from 'axios';
import { useEffect, useState } from "react";

const style = {display:"flex",flexWrap:"wrap",textAlign:"center",border:"1px solid black"}
export default function NewEntry(){
    const[formData,setFormData] = useState({
        title:"",
        content:""
    });
    
    const handleChange = (e)=>{
        // const {name,value} = e.target;
        setFormData((prevData)=>{
               return {...prevData,[e.target.name]:e.target.value,};
        });
    }

    const addEntry = (evt)=>{
        evt.preventDefault();
        axios.post("http://localhost:8081/journal/journal",
        {  
            title:formData.title,
            content:formData.content
        },{
        headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`,
            Accept : "application/json",
            "Content-Type" : "application/json"
        }}
        
    ).then((response)=>{
        console.log(JSON.stringify(response.data));
        setFormData({ title: "", content: "" });
    }).catch(error=>console.log(error.response?.data)
        );
        console.log(formData);
    }

    return (
        <div className="NewEntryPage">
        <Navbar/>
        <h1>Add a new entry</h1>
        <div className="NewEntryForm" style={style}>
            <form onSubmit={addEntry}>
                <p>
                <label htmlFor="title">Title : </label>
                <input type="text" 
                placeholder="" 
                id="title" 
                name="title"
                onChange={handleChange}
                value={formData.title}
                />
                </p>
                <p>
                <label htmlFor="content">Content : </label>
                <input type="text"
                placeholder=""
                id="content"
                name="content"
                onChange={handleChange}
                value={formData.content}
                /> 
                </p> 
                <button disabled={!formData.title || !formData.content}>Add</button>
            </form>
        </div>
    </div>
    )
}