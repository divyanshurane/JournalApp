import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function EditForm({entry,onSave,onCancel}){
    const [title,setTitle] = useState(entry.title);
    const [content,setContent] = useState(entry.content);


    const handleChange=(e)=>{
        setPrevEntry((currEntry)=>{
            return {...currEntry,[e.target.name]:e.target.value}
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        onSave({...entry,title,content});
    }

    return(
    <div className="EditEntryPage">
        <Navbar/>
        <h1>Edit Entry</h1>
        <div className="EditEntryForm">
            <form onSubmit={handleSubmit}>
                <p>
                <label htmlFor="title">Title : </label>
                <input type="text" 
                placeholder={title} 
                id="title" 
                name="title"
                onChange={e=>setTitle(e.target.value)}
                value={title}
                />
                </p>
                <p>
                <label htmlFor="content">Content : </label>
                <input type="text"
                placeholder={content}
                id="content"
                name="content"
                onChange={e=>setContent(e.target.value)}
                value={content}
                /> 
                </p> 
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    </div>
    )
}