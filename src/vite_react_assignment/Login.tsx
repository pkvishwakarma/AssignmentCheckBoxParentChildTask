import { Box, TextField } from "@mui/material";
import { Avatar, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Login() {
    var navigate=useNavigate();
    const [loginData, setLoginData] = useState({
        name: '', mobile: '+91', email: ''
    });
    const [txtNameMsg, setTxtNameMsg] = useState('');
    const [txtMobileMsg, setTxtMobileMsg] = useState('');
    const [txtEmailMsg, setTxtEmailMsg] = useState('');
    const [loginBtnStyle, setLoginBtnStyle] = useState(false);

    //Fetching Entered Name form input field using onChange Event..
    function HandleNameChange(e: any) {
        if (parseInt(e.target.value.length) < 4) {
            setTxtNameMsg("Length is too short");
            setLoginBtnStyle(true);
        }
        if (parseInt(e.target.value.length) > 4) {
            setTxtNameMsg("");
            setLoginBtnStyle(false);
        }
        if (parseInt(e.target.value.length) > 15) {
            setTxtNameMsg("Length not More than 15 Charactors");
            setLoginBtnStyle(true);
        }
        setLoginData({
            name:e.target.value,
            mobile:loginData.mobile,
            email:loginData.email
        });
    }

    //Fetching Entered Mobile No from input field using onChange Event..
    function HandleMobileChange(e: any) {
        var regExp = (/\+91\d{10}/);
        if (e.target.value.match(regExp) == null) {
            setTxtMobileMsg("Please Enter 10 digit Mobile No");
            setLoginBtnStyle(true);
        }
        if (e.target.value.match(regExp)) {
            setTxtMobileMsg("");
            setLoginBtnStyle(false);
        }
        if (parseInt(e.target.value.length) > 13) {
            setTxtMobileMsg("Please Enter Valid Mobile No");
            setLoginBtnStyle(true);
        }
        setLoginData({
            name:loginData.name,
            mobile:e.target.value,
            email:loginData.email
        });
    }

    //Fetching Email from input field using onChange Event..
    function HandleEmailChange(e: any) {
        var regExp = (/[a-z_#$&*@0-9]{1,}[@]{1}[a-z0-9]{1,}[.]{1}[a-z0-9]{1,}/);
        if (e.target.value.match(regExp) == null) {
            setTxtEmailMsg("Invalid Email Address");
        }
        if (e.target.value.match(regExp)) {
            setTxtEmailMsg("");
        }

        setLoginData({
            name:loginData.name,
            mobile:loginData.mobile,
            email:e.target.value
        }); 
        
        if(e.target.value.match(regExp)){
            setLoginBtnStyle(false);
        }
        else{
            setLoginBtnStyle(true);
        }
    }

    //Submittind Data to Storage to authenticate user login using onSubmit function..
    function HandleLoginFormSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        localStorage.setItem("loginToken",JSON.stringify(loginData));
        navigate("/loginhomepage");
    }

    useEffect(()=>{
        if(localStorage.getItem("loginToken")){
            navigate("/loginhomepage");
            return;
        }
        else{
            navigate("/login");
        }
    },[])

    return (
        <>
            <div className="loginFormParentContainer">
                <div className="loginFormContainer">
                    <div className="loginHeadingContainer">
                        <Avatar sx={{ backgroundColor: "transparent" }} /><span>User Login</span>
                    </div>
                        <Box onSubmit={HandleLoginFormSubmit} component="form" sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <div style={{ marginBottom: "1.2em" }}>
                                <TextField type="text" autoFocus label="Name" required onChange={HandleNameChange} sx={{ width: '25vw' }} variant="filled" />
                                <div style={{ color: "red" }}>{txtNameMsg}</div>
                            </div>
                            <div style={{ marginBottom: "1.2em" }}>
                                <TextField type="text" value={loginData.mobile} label="Phone Number" required onChange={HandleMobileChange} variant="filled" sx={{ width: '25vw' }} />
                                <div style={{ color: "red" }}>{txtMobileMsg}</div>
                            </div>
                            <div style={{ marginBottom: "1.2em" }}>
                                <TextField type="text" label="Email" required onChange={HandleEmailChange} variant="filled" sx={{ width: '25vw' }} />
                                <div style={{ color: "red" }}>{txtEmailMsg}</div>
                            </div>
                            <Button type="submit" disabled={loginBtnStyle}>Login</Button>
                        </Box>
                </div>
            </div>
        </>
    )
}