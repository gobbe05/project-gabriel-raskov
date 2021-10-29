import React from 'react'
import '../../CSS/todo-list.css'
import AddTodoItem from '../add-todo/add-todo-item'
import useActiveUser from '../../Custom Hooks/useActiveUser'

/* 
The todolist handles all the logic and rendering for the todolist.

RETURNS JSX code for the todolist
*/

export default function Todolist(props) {
    const [ulItems, setUlItems] = React.useState([])
    const [addItem, setAddItem] = React.useState(false)
    const [activerUser, setActiveUser] = useActiveUser('activeUser', 0) /*Activeuser access an indexed item in an array 
    on your localStorage */ 
    const [prevUser, setPrevUser] = useActiveUser('prevUser', 0) //Keeps the user logged in

    //If the array is yet initialized then dont do anything
    //If it is save the items

    function saveTodoList() {
        //Load in items => update value
        let dataBody = {
            "tryUsername": activerUser,
            "list": ulItems
    }
    
        if(ulItems.length != 0)  {
            fetch('http://localhost:3001/SaveTodoList', {
            body: JSON.stringify(dataBody),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            })
        }
    }

    React.useEffect(() => {
            saveTodoList()
    }, [ulItems])

    function removeItem(index) {
        let todolist
                                    
        todolist = ulItems
        delete todolist[index]
        
        setUlItems([...todolist])
        saveTodoList()
    }
    //Loads in users and active users List
    let users = {}
    React.useEffect(() => {
        let dataBody = {"tryUsername": activerUser}
    
        fetch('http://localhost:3001/FetchUsers', {
            body: JSON.stringify(dataBody),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => users = data)
        .then(() => {
            let array = Object.entries(users.data)
            array.map((item, index) => {
                if(item[1].username == activerUser) {
                    setUlItems(item[1].list)
                }
            })
        })
    }, [])

    return (
        <>
        <AddTodoItem SaveTodoList={saveTodoList} setAddItem={setAddItem} addItem={addItem} setUlItems={setUlItems} ulItems={ulItems}/>

        <div id="todolist-container" className={"todolist-container"}>
            <div className={"inner-container"}>
                <div className={"todo-header"}>
                    <h3 onClick={() => {
                        //This part loggs the user out and activates the guest account.  
                        //Needs a log out button.
                        setPrevUser("guest")
                        setActiveUser("guest")
                        window.location.reload()
                        
                    }}>{activerUser}</h3> <h1>To-Do List</h1> <div className={"plus-container"}><h2 onClick={() => setAddItem(true)}>+</h2></div>
                </div>

                <ul>
                    {
                        ulItems.map((value, index) => {
                            
                            if(value == null) {
                                return null
                            }
                            else {
                                return (
                                    <><li key={value}>{value} {index}<button className={"button-todo"} onClick={() => removeItem(index)}></button></li></>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        </div>
        </>
    )
}