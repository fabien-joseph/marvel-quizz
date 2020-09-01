import React from "react";

export const Modal = ({ showModal, children }) => {
    return (
            showModal && (
                <div className={"modalBackground"}>
                    <div className={"modalContainer"}>
                        { children }
                    </div>
                </div>
            )
    )
}