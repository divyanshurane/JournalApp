import Navbar from "../components/Navbar";
import { getJournals } from "../api/journal";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Label, Password } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";




const style = {display:"flex",flexWrap:"wrap",textAlign:"center",border:"1px solid black"}
function Login(){
    const[formData,setFormData] = useState({
        username : "",
        password:""
    });

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

    const googleLogin=()=>{
        const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=http://localhost:5173/oauth/callback&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
        window.location.href = authUrl;    
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
                    <button onClick={googleLogin}>Sign in with google</button>
                </form>
            </div>
        </div>
    );
}

export default Login;