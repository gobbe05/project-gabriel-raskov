import React, { useEffect } from 'react'
import './forms.css'
import SignUp from './signup'
import useActiveUser from '../Custom Hooks/useActiveUser'

class User {
    constructor(username, password, todolist) {
        this.username = username
        this.password = password
        this.todolist = todolist
    }
}

/*Component handles the login section. Works together with the <Signup />
component to handle storing passwords/usernames. 
Data gets encrypted when saved to localStorage in the <Signup /> component. When the data is loaded it gets
decrypted before usage.


RETURNS jsx code to the login section
PROPERTIES include loggedIn */

export default function Login(props) {
    
    const [username, setUsername] = React.useState([]) //Username includes an array with all the stored passwords.
    const [inputfieldUsername, setinputfieldUsername] = React.useState('')
    const [inputfieldPassword, setinputfieldPassword] = React.useState('')
    const [loginpageActive, setLoginpageActive] = React.useState(true)
    const [signUpActive, setSignUpActive] = React.useState(false)
    const [credentialsValid, setCredentialsValid] = React.useState(false)
    const [activerUser, setActiveUser] = useActiveUser('activeUser', 0)
    const [prevUser, setPrevUser] = useActiveUser('prevUser', 0)

    /* 
    The function goes through all the loginData items and checks if the 
    submitted password matches any entries
    */
    function passwordValidation(form) {

        form.preventDefault()
        let tryUser = {}
        let dataBody = {"tryUsername": inputfieldUsername}
    
        fetch('http://localhost:3001/FetchUser', {
            body: JSON.stringify(dataBody),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => tryUser = data)
        .then(() => {
            alert(tryUser)
            if(tryUser.data.password == inputfieldPassword) {
                setActiveUser(inputfieldUsername)
                setPrevUser(inputfieldUsername)
                setCredentialsValid(true)
                setTimeout(() => window.location.reload(), 600)
            }
        })
        
        
    }

    /* The inputfieldUsername and inputfieldPassword variables is updated every time the 
    input value changes.
    
    RETURNS Login Page jsx code
    */
    if(loginpageActive) {
        return (
            <div className={'login-container'}>
                <div id="container">
                <form>
                    <legend>Name</legend>
                    <input onChange={(e) => setinputfieldUsername(e.target.value)} name="username"></input>
                    <legend>Password</legend>
                    <input type="password" onChange={(e) => setinputfieldPassword(e.target.value)} name="password"></input>
                    <button className={(credentialsValid ? "sign-up-confirmed": "")} onClick={(e) => {
                        passwordValidation(e)
                    }}>Submit</button>
                </form>

                <a href="#" className="change" onClick={() => {
                    setLoginpageActive(false)
                    setSignUpActive(true)
                }}>Don't have an account? Sign Up.</a>
            </div>
            </div>
        )
    }
    /*RETURNS SignUp component and passing username, setUsername, setActive and
    setSignUpActive 
    If log in succeeds return null instead to stop login from showing.
    */
    else if(signUpActive){
        return (<SignUp 
            username={username} 
            setUsername={setUsername} 
            setActive={setLoginpageActive} 
            setSignUpActive={setSignUpActive}/>)
    }
    else {
        
        return null
    }
}