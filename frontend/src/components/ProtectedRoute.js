import React from 'react'
import { NavigateTo} from  'react-router-dom'

function ProtectedRoute({children}) {
    const isAuth = localStorage.getItem('token')
    const {user} = useContext((state)=> state.user)
    if (!isAuth || !user) return <Navigate to="/login" />
    else return children;
}
export default ProtectedRoute;