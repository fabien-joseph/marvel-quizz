import React, {useState} from "react";

const Signup = () => {
    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState(data);

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value});
    }

    const {pseudo, email, password, confirmPassword} = loginData;

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ?
        <button disabled={true}>Inscription</button> : <button>Inscription</button>

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftSignup"}>
                </div>

                <div className={"formBoxRight"}>
                    <div className={"formContent"}>
                        <form>
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
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;