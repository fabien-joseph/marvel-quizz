import React, {useState, Fragment, useEffect, useContext} from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import {FirebaseContext} from "../Firebase";

const Welcome = (props) => {
    const firebase = useContext(FirebaseContext);
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        console.log("Use Effect")
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })
        console.log(userSession === null ? 'Pas encore de session' : `Session trouvée : ${userSession.uid}`)
        if (!!userSession)
        if (!!userSession) {
            firebase.getUser(userSession.uid)
                .get()
                .then((doc) => {
                    console.log(doc.data())
                    if (doc) {
                        console.log(doc.data())
                        const myData = doc.data();
                        setUserData(myData)
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        }

        return () => {
            listener()
        };
    }, [userSession, firebase, props.history])

    return userSession === null ? (
        <Fragment>
            <div className={"loader"}/>
            <p className={"loaderText"}>Loading...</p>
        </Fragment>
    ) : (
        <div className={"quiz-bg"}>
            <div className={"container"}>
                <Logout/>
                <Quiz userData={userData}/>
            </div>
        </div>);

}

export default Welcome;