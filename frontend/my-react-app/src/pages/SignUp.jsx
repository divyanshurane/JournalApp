import Navbar from "../components/Navbar";
import { getJournals } from "../api/journal";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Label, Password } from "@mui/icons-material";



const style = {display:"flex",flexWrap:"wrap",textAlign:"center",border:"1px solid black"}
function SignUp(){
    const[formData,setFormData] = useState({
        username: "",
        password: "",
        email: "",
        sentimentAnalysis: true
    });

    const handleChange = (e)=>{
        setFormData((prevData)=>{
               return {...prevData,[e.target.name]:e.target.value,};
        });
    }

    const addUser = (evt)=>{
        evt.preventDefault();
        axios.post("http://localhost:8081/journal/public/signup", formData)
        .then(response => {
            console.log("Signup successful:", response.data);
            // Redirect to login page or show success message
        })
        .catch(error => {
            console.error("Signup error:", error.response?.data || error.message);
            // Show error message to user
        });
        setFormData({username:"", password:"", email:"", sentimentAnalysis: false});
    }

    return(
        <div className="SignUpPage">
            <Navbar/>
            <h1>SignUp</h1>
            <div className="SignUpForm" style={style}>
                <form onSubmit={addUser}>
                    <p>
                    <label htmlFor="username">Username: </label>
                    <input type="text" 
                    placeholder="Enter username" 
                    id="username" 
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    required
                    />
                    </p>
                    <p>
                    <label htmlFor="email">Email: </label>
                    <input type="email" 
                    placeholder="Enter email" 
                    id="email" 
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    />
                    </p>
                    <p>
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    /> 
                    </p> 
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;