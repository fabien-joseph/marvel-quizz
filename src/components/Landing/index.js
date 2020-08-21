import React, {useRef, useEffect, useState, Fragment} from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null);

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 3000);
    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");

    }


    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }


    const clearImg = () => {
        if (refWolverine.current.classList.contains("rightImg"))
            refWolverine.current.classList.remove("rightImg");
        else if (refWolverine.current.classList.contains("leftImg"))
            refWolverine.current.classList.remove("leftImg");

    }

    const displayBtn = btn && (
        <Fragment>
            <div onMouseOut={clearImg} onMouseOver={setLeftImg} className={"leftBox"}>
                <Link className={"btn-welcome"} to={"/signup"}>Inscription</Link>
            </div>
            <div onMouseOut={clearImg} onMouseOver={setRightImg} className={"rightBox"}>
                <Link className={"btn-welcome"} to={"/login"}>Connexion</Link>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className={"welcomePage"}>
            {displayBtn}
        </main>
    )
}

export default Landing;