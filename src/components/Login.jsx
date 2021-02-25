import React from 'react'
import { db, auth } from '../firebase'
import {withRouter} from 'react-router-dom'

//withRouter nos genera props, que llamo en el componente

const Login = (props) => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(true)

    const processData = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('Ingrese email')
            return
        }
        else if (!pass.trim()) {
            setError('Ingrese contraseña')
            return
        }
        else if (pass.length < 6) {
            setError("Password menor a 6 caractéres")
        }
        setError(null)
        if (esRegistro) {
            registrarUser()
        }
        //Es login
        else {
            loginUser()
        }

    }

    const loginUser = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
            // console.log(res.user);
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido')
            }
            if (error.code === 'auth/user-not-found') {
                setError('Credenciales inválidas (email)')
            }
            if (error.code === 'auth/wrong-password') {
                setError('Credenciales inválidas (contraseña)')
            }
            else {
                console.log(error)
            }
        }
    }, [email, pass, props.history])

    const registrarUser = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)

            //Creo la colección de usuarios con un doc con ID = uid 
            // await db.collection('Usuarios').doc(res.user.uid).set({
            //     email: res.user.email,
            //     uid: res.user.uid
            // })
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email ya utilizado')
            }
            else {
                console.log(error)
            }
        }
    }, [email, pass, props.history])



    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={processData}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button
                            className="col-12 btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            {
                                esRegistro ? 'Registrarse' : 'Ingresar'
                            }
                        </button>
                        <button
                            className="col-12 btn btn-sm btn-info btn-block mt-2"
                            type="button"
                            onClick={() => setEsRegistro(!esRegistro)}
                        >
                            {
                                esRegistro ? '¿Ya estás registrado?' : '¿No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
