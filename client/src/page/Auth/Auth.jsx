import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.authReducer.loading);
    console.log(loading)

    const [isSignUp, setIsSignUp] = useState(true);
    const [data, setData] = useState({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" });
    const [confirmPass, setConfirmpass] = useState(true);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            data.password === data.confirmpass
                ? dispatch(signUp(data))
                : setConfirmpass(false);
        } else {
            dispatch(logIn(data));
        }
    };

    const resetForm = () => {
        setConfirmpass(true);
        setData({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" });
    }

    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>MJ Savani</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {/* this is rightside - login and signup form */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit} style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                    <h3> {isSignUp ? "Sign Up" : "Login"}</h3>
                    {isSignUp &&
                        <div>
                            <input
                                type="text"
                                onChange={handleChange}
                                placeholder='First Name'
                                className="infoInput"
                                value={data.firstname}
                                name='firstname' />
                            <input
                                type="text"
                                onChange={handleChange}
                                placeholder='Last Name'
                                className="infoInput"
                                value={data.lastname}
                                name='lastname' />
                        </div>
                    }

                    <div>
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder='Username'
                            className="infoInput"
                            value={data.username}
                            name='username' />
                    </div>
                    <div>
                        <input
                            type="password"
                            onChange={handleChange}
                            placeholder='Password'
                            className="infoInput"
                            value={data.password}
                            name='password' />
                        {isSignUp &&
                            <input
                                type="password"
                                onChange={handleChange}
                                placeholder='Confirm Password'
                                className="infoInput"
                                value={data.confirmpass}
                                name='confirmpass' />
                        }
                    </div>

                    <span
                        style={{
                            display: confirmPass ? "none" : "block",
                            color: "red",
                            fontSize: "12px",
                            alignSelf: "flex-end",
                            marginRight: "5px"
                        }}>
                        *Confirm Password is not same.
                    </span>
                    <div>
                        <span style={{
                            fontSize: "12px",
                            cursor: "pointer",
                            color: "blue",
                            textDecoration: "underline"
                        }}
                            onClick={() => {
                                setIsSignUp((prev) => !prev);
                                resetForm();
                            }
                            }>
                            {isSignUp ? "Already have an account. Login!" : "Don't have an account? SignUp"}
                        </span>
                    </div>
                    <button
                        className="button infoButton"
                        type='submit'
                        style={{marginTop:"-25px"}}
                        disabled={loading}>
                        {loading ? "Loading..." : isSignUp ? "Signup" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}




export default Auth