import React, {Component} from "react";

class Quiz extends Component{

    render() {
        const {pseudo, email} = this.props.userData;

        return (
            <div>
                <p>{`Bonjour ${pseudo}, vous êtes connecté avec le mail ${email}`}</p>
            </div>
        )
    }


}

export default Quiz;