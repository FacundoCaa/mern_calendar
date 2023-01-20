import './LoginPage.css';
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { register, handleSubmit } = useForm();
    const { register: login, handleSubmit: loginHandleSubmit } = useForm();

    const loginSubmit = ( data ) => {
        startLogin({ email: data.loginEmail, password: data.loginPassword})
    }

    const registerSubmit = ( data ) => {
        if ( data.registerPassword !== data.registerPassword2 ) {
            Swal.fire('Error en el registro', 'Contraseñas no son iguales', 'error')
            return;
        }
        startRegister({ 
            name: data.registerName,
            email: data.registerEmail,
            password: data.registerPassword,
        })
    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Erorr en la autenticacion', errorMessage, 'error')
      }
    }, [errorMessage])
    
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginHandleSubmit( loginSubmit ) }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                {...login('loginEmail', { required: true })}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                {...login('loginPassword', { required: true })}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleSubmit( registerSubmit ) } >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                {...register('registerName', { required: true })}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                {...register('registerEmail', { required: true })}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                {...register('registerPassword', { required: true })}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                {...register('registerPassword2', { required: true })} 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}