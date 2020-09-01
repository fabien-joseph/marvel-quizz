import React, {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../Firebase";
import ReactTooltip from 'react-tooltip';

const Logout = () => {
    const [checked, setChecked] = useState(false);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        if (checked)
            firebase.signoutUser();
    }, [checked, firebase]);

    const handleChange = e => {
        setChecked(e.target.checked);
    }

    return (
        <div className={"logoutContainer"}>
            <label className={"switch"}>
                <input
                    onChange={handleChange}
                    type={"checkbox"}
                    checked={checked}
                />
                <span data-tip={"Déconnexion"} className={"slider round"}/>
                <ReactTooltip place="left" type="dark" effect="solid"/>
            </label>
        </div>
    )
}

export default Logout