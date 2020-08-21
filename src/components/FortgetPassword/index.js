import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {FirebaseContext} from "../Firebase";

const ForgetPassword = (props) => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const firebase = useContext(FirebaseContext);

    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
            .then(() => {
                setError(null);
                setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
                setTimeout(() => {
                    props.history.push("/login");
                }, 5000);
            })
            .catch(error => {
                setError(error);
                setEmail('');
            });
    }

    const disabled = email === "";

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftForget"}>
                </div>

                <div className={"formBoxRight"}>
                    <div className={"formContent"}>
                        <form onSubmit={handleSubmit}>

                            {success && <span style={{
                                border: '1px solid',
                                background: 'green',
                                color: '#ffffff'
                            }}>{success}</span>}

                            {
                                error && <span style={{
                                    border: '1px solid',
                                    background: 'red',
                                    color: '#ffffff'
                                }}
                                >{error.message}</span>
                            }

                            <h2>Mot de passe oublié ?</h2>

                            <div className={"inputBox"}>
                                <input onChange={e => setEmail(e.target.value)} value={email} type={"email"} id={"email"}
                                       autoComplete={"off"} required={true}/>
                                <label htmlFor={"email"}>Email</label>
                            </div>
                            <button disabled={disabled}>Récupérer</button>
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

export default ForgetPassword;