import React from "react";

export const Modal = ({ showModal, hideModal, children }) => {
    return (
            showModal && (
                <div className={"modalBackground"} onClick={ hideModal }>
                    <div className={"modalContainer"}>
                        { children }
                    </div>
                </div>
            )
    )
}