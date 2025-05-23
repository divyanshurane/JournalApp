import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OauthCallback(){
    const navigate = useNavigate();

    useEffect(()=>{
        const code = new URLSearchParams(window.location.search).get("code");
        if(code){
            axios.get(`http://localhost:8081/journal/auth/google/callback?code=${code}`)
            .then((response)=>{
                const token = response.data.token;
                localStorage.setItem("token",token);
                return navigate("/journal");
            })
            .catch(error=>console.log("Oauth failed :",error));
        }
    },[]);

    // return <p>Logging you in</p>
}

