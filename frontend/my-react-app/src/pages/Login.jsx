import Navbar from "../components/Navbar";
import { getJournals } from "../api/journal";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Label, Password } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";



const style = {display:"flex",flexWrap:"wrap",textAlign:"center",border:"1px solid black"}
function login(){
    const[formData,setFormData] = useState({
        username : "",
        password:""
    });

    // useEffect(()=>{
    //     // const fetchData = async () => {
    //     //     try {
    //     //         const response = await axios.get('http://localhost:8081/journal/user');
    //     //         console.log(response.data);
    //     //     } catch (error) {
    //     //         console.error('Error fetching data:', error);
    //     //     }
    //     // };
    //     // axios.get("http://localhost:8081/journal/user")
        
    //     axios.get("http://localhost:8081/journal/journal")
    //     .then(response=>{
    //         console.log(response.data);
    //     })
    //     .catch(error=>{
    //         console.log("There was an error while logging in",error);
    //     })
    // })

    const handleChange = (e)=>{
        // const {name,value} = e.target;

        setFormData((prevData)=>{
               return {...prevData,[e.target.name]:e.target.value,};
        });
    }

    const Loggedin = (evt)=>{
        evt.preventDefault();
        axios.post("http://localhost:8081/journal/public/login",{
            username:formData.username,
            password:formData.password
        }).then(response=>{
            const token= response.data;
            localStorage.setItem("token",token);
            console.log(token);
            greet();
        })
        .catch(function error(){
            console.log("There was an error while logging in",error);
        })
        
        setFormData({username:"",password:""});
    }


    return(
        <div className="LoginPage">
            <Navbar/>
            <h1>Login</h1>
            <div className="LoginForm" style={style}>
                <form onSubmit={Loggedin}>
                    <p>
                    <label htmlFor="username">Username : </label>
                    <input type="text" 
                    placeholder="" 
                    id="username" 
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    />
                    </p>
                    <p>
                    <label htmlFor="password">Password : </label>
                    
                    <input type="text"
                    placeholder=""
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    /> 
                    </p> 
                    <button >Submit</button>
                </form>
            </div>
        </div>
    );
}

export default login;