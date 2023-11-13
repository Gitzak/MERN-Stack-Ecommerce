import { createContext,useContext ,useEffect, useState } from "react";




export const UserContext = createContext();


 export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null)

  
    const value = {
        currentUser,
        setCurrentUser 
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>

    ) 
}


export const UserC = ()=>{
    const Context = useContext(UserContext)
    if(!Context){
        throw new Error('no context provided')
    }
    return Context
}
