import React from "react";
import { userTypes } from "../../types/classifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [type, setType] = React.useState('Customer');
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
    let navigate = useNavigate();

    //@ts-ignore
    const attemptRegister = async (e) => {
        e.preventDefault();
        if (user === ""){
            alert("Please enter a valid email address")
            return
        }
        if (pass === ""){
            alert("Please enter a valid password")
            return
        }
        if (!userTypes.includes(type)){
            alert("Please select a valid user type")
            return
        }
        if (!name.includes(' ') || name.length < 5) {
            alert('Please include first and last name with a space')
            return
        }
        const form = {
            email:user,
            password:pass,
            type:type,
            fullname:name,
        }
        await axios.post("http://localhost:3001/api/v1/user/signup", form)
        .then(() =>{
            setMessage(`Successfully created user ${user}`)
        })
        //@ts-ignore
        .catch(()=>{
            setMessage(`Could not create user ${user}`)
        });
    }

    return (
        <div className="grid grid-cols-1 justify-items-center">
        <div className="bg-white grid  text-black grid-cols-1 rounded-xl p-5 m-5 justify-items-center">
            <form onSubmit={(e) => attemptRegister(e)}>
                <div className="grid grid-cols-2 gap-2 ">
                <label>email address:</label><input type="email" onChange={(e)=>setUser(e.target.value)}/>
                <label>password:</label><input type="password" onChange={(e)=>setPass(e.target.value)}/>
                <label>full name:</label><input type="text" onChange={(e)=>setName(e.target.value)}/>
                <label>type:</label><select onChange={(e)=>setType(e.target.value)}>
                    <option value='Customer'>User</option>
                    <option value='Admin'>Admin</option>
                    <option value='Employee'>Employee</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
            <div>{message}</div>
        </div>
    )
}