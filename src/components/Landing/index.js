import React, {useRef, useEffect, useState, Fragment} from "react";

const Landing = () => {
    const [btn, setBtn] = useState(false);
    console.log(btn)
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
                <button className={"btn-welcome"}>Inscription</button>
            </div>
            <div onMouseOut={clearImg} onMouseOver={setRightImg} className={"rightBox"}>
                <button className={"btn-welcome"}>Connexion</button>
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