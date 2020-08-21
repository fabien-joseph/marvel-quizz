import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FirebaseContext} from "../Firebase";

const Login = (props) => {
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (password.length >= 6 && email !== '') {
            setBtn(true);
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn]);

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
            .then(user => {
                setEmail('');
                setPassword('');
                props.history.push("/welcome");
            })
            .catch(error => {
                setEmail('');
                setPassword('');
                setErrorMsg(error.message);
            });
    }

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftLogin"}>
                </div>
                <div className={"formBoxRight"}>
                    <div className={"formContent"}>
                        {errorMsg !== '' && <span>{errorMsg}</span>}

                        <form onSubmit={handleSubmit}>
                            <h2>Connexion</h2>



                            <div className={"inputBox"}>
                                <input onChange={e => setEmail(e.target.value)} value={email} type={"email"} id={"email"}
                                       autoComplete={"off"} required={true}/>
                                <label htmlFor={"email"}>Email</label>
                            </div>

                            <div className={"inputBox"}>
                                <input onChange={e => setPassword(e.target.value)} value={password} type={"password"} id={"password"}
                                       autoComplete={"off"} required={true}/>
                                <label htmlFor={"password"}>Mot de passe</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled={true}>Connexion</button>}
                        </form>
                        <div className={"linkContainer"}>
                            <Link className={"simpleLink"} to={"/signup"}>Nouveau ? Inscrivez-vous</Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login;