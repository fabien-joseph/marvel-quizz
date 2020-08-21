import React, {useState, useContext} from "react";
import {FirebaseContext} from "../Firebase";
import {Link} from "react-router-dom";

const Signup = (props) => {
    const firebase = useContext(FirebaseContext);

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('');

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        const {email, password} = loginData;
        firebase.signUpUser(email, password)
            .then(user => {
                setLoginData({...data});
                props.history.push("/welcome");
            })
            .catch(error => {
                setLoginData({...data});
                setError(error);
            });
    }

    const {pseudo, email, password, confirmPassword} = loginData;

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ?
        <button disabled={true}>Inscription</button> : <button>Inscription</button>

    // Gestion error
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftSignup"}>
                </div>

                <div className={"formBoxRight"}>
                    <div className={"formContent"}>
                        <form onSubmit={handleSubmit}>
                            {errorMsg}
                            <h2>Inscription</h2>

                            <div className={"inputBox"}>
                                <input onChange={handleChange} value={pseudo} type={"text"} id={"pseudo"} autoComplete={"off"} required={true}/>
                                <label htmlFor={"pseudo"}>Pseudo</label>
                            </div>

                            <div className={"inputBox"}>
                                <input onChange={handleChange} value={email} type={"email"} id={"email"} autoComplete={"off"} required={true}/>
                                <label htmlFor={"email"}>Email</label>
                            </div>

                            <div className={"inputBox"}>
                                <input onChange={handleChange} value={password} type={"password"} id={"password"} autoComplete={"off"} required={true}/>
                                <label htmlFor={"password"}>Mot de passe</label>
                            </div>

                            <div className={"inputBox"}>
                                <input onChange={handleChange} value={confirmPassword} type={"password"} id={"confirmPassword"} autoComplete={"off"} required={true}/>
                                <label htmlFor={"password"}>Confirmer mot de passe</label>
                            </div>

                            {btn}
                        </form>
                        <div className={"linkContainer"}>
                            <Link className={"simpleLink"} to={"/login"}>Déjà inscrit ? Connectez-vous</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;