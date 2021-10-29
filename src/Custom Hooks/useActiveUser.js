import React from "react";

/*getActiveUser checks if there is a value stored in {key}
if it is RETURN localStorage value

If not RETURN the initial value
*/
function getActiveUser(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key)) 

    if(savedValue) return savedValue

    if(initialValue instanceof Function) return initialValue()
     return initialValue
}
/* useActiveUser updates a state and syncs it to the localStorage.
This makes its state usable from everywhere. By accessing this custom hook.

RETURNS [activeUser, setActiveUser]
 */

export default function useActiveUser(key, initialValue) {
    const [activerUser, setActiveUser] = React.useState(() => {
        return getActiveUser(key, initialValue)
    })

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(activerUser))
    }, [activerUser])

    return [activerUser, setActiveUser]
}