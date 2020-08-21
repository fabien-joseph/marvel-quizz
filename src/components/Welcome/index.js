import React, {useState, Fragment, useEffect, useContext} from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import {FirebaseContext} from "../Firebase";

const Welcome = (props) => {
    const [userSession, setUserSession] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const unlisten = firebase.auth.onAuthStateChanged(user => {
            console.log(user);
            user ? setUserSession(user) : props.history.push('/');
        })

        return () => {
            unlisten();
        }
    }, [firebase.auth, props.history]);

    return userSession === null ? (
        <Fragment>
            <div className={"loader"}/>
            <p className={"loaderText"}>Loading...</p>
        </Fragment>
    ) : (
        <div className={"quiz-bg"}>
            <div className={"container"}>
                <Logout/>
                <Quiz/>
            </div>
        </div>);

}

export default Welcome;