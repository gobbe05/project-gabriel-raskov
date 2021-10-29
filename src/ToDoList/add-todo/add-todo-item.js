import React from "react";
import './add-todo.css'

export default function AddTodoItem(props) {
    const [itemName, setItemName] = React.useState()

    if(props.addItem) {
        return (

            <>
                <div className={"add-todo-container"}>                          
                    <input onChange={(e) => setItemName(e.target.value)}></input>  
                    <button onClick={() => {
                        props.setUlItems(prev => prev.concat(itemName))
                        props.setAddItem(false)
                        }}>Add Item</button>
                    <h2 onClick={() => props.setAddItem(false)}>x</h2>                
                </div>
                <div className={"opacity-fix"}>
            </div>
            </>
    
        )
    }
    else {
        return null
    }
    
    
}