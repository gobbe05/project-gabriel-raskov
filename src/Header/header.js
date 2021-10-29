import React from 'react'
import '../CSS/header.css'
import useActiveUser from '../Custom Hooks/useActiveUser'
import HamburgerMenu from './hamburger-menu'

/* The header function is just JSX code of the Header component. It handles the header
and its items.
 */

class User {
    constructor(username, password, todolist) {
        this.username = username
        this.password = password
        this.todolist = todolist
    }
}

function Header() {

    const [activeUser, setActiveUser] = useActiveUser('activeUser', 0)
    const [users, setuser] = useActiveUser('test', '')
    const [firstLoggedIn, setFirstLoggedIn] = useActiveUser('firstLogged', true)
    const [activateHamburger, setActivateHamburger] = React.useState(false)
    
        React.useEffect(() => {
            if(firstLoggedIn) {
                setFirstLoggedIn(false)
                setuser([new User('guest', '', ['test', 'test'])])
        }
        })

    if(firstLoggedIn) {
        return (
            <div id="header-container">
                <div className={"header-navigation"}>
                    <ul>
                        <li><a href="./">Home</a></li>
                        <li><a href="./portfolio">Portfolio</a></li>
                        <li><a href="./login">Login</a></li>
                    </ul>
                    <HamburgerMenu />
                </div>
    
                <div className={"logged-in-user"}>
                </div>
    
                
            </div>
        )

    }
    else {
        return (
            <div id="header-container">
                <div className={"header-navigation"}>
                    <ul>
                        <li><a href="./">Home</a></li>
                        <li><a href="./portfolio">Portfolio</a></li>
                        <li><a href="./login">Login</a></li>
                    </ul>
                    <HamburgerMenu />
                </div>
    
                <div className={"logged-in-user"}>
                    {firstLoggedIn == false ? <h3>{activeUser}</h3> : null}
                </div>
    
                
            </div>
        )
    }
}

export default Header