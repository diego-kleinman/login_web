import userEvent from '@testing-library/user-event'
import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Admin = (props) => {
    
    const [userInfo,setUserInfo] = React.useState(null)

    //Cuanto se pinta el componente se ejecuta esto
    React.useEffect(() => {
        const user = auth.currentUser
        //Si no está loggeado
        if(!user){
            setUserInfo(null)
            props.history.push('/login')
        }
        else{
            setUserInfo(auth.currentUser)
        }

    },[])

    return (
        <div>
            <h2>Ruta protegida: Usuario loggeado</h2>
            <h3>
                {
                    userInfo ? userInfo.email : null
                }
            </h3>
        </div>
    )
}

export default withRouter(Admin)
