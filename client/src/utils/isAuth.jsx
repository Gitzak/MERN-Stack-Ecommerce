import { UserC } from "../context/AuthContext"

export const isAuth = ()=>{
    const {currentUser} = UserC()
    // console.log('current ',currentUser)
    // const jwt = localStorage.jwt_info
    const jwt = true

    if(currentUser){
        return true
    }

    return false
}