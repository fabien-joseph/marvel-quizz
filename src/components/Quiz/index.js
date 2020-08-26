import React, {Component} from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import {QuizMarvel} from "../quizMarvel";

class Quiz extends Component {

    state = {
        levelName: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
    }

    storedDataRed =  React.createRef();

    loadQuestions = level => {
        const fetchedArrayQuizz = QuizMarvel[0].quizz[level];
        if (fetchedArrayQuizz.length >= this.state.maxQuestions) {
            this.storedDataRed.current = fetchedArrayQuizz;

            const newArray = fetchedArrayQuizz.map(( { answer, ...keepRest})  => keepRest)
            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("Pas assez de questions");
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelName[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {

            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
            })
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            })
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        })
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            //End
        } else {
            this.setState(prevState => ({
              idQuestion: prevState.idQuestion + 1
            }))
        }

        const goodAnswer = this.storedDataRed.current[this.state.idQuestion].answer;

        if (this.state.userAnswer === goodAnswer)
            this.setState(prevState => ({
                score: prevState.score + 1
            }));
    }

    render() {
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index} className={`answerOptions ${this.state.userAnswer === option && 'selected'}`}
                onClick={() => this.submitAnswer(option)}>{option}</p>
            )
        } )

        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2>{this.state.question}</h2>
                { displayOptions }
                <button disabled={this.state.btnDisabled}
                        className={"btnSubmit"}
                        onClick={this.nextQuestion}
                >Suivant</button>
            </div>
        )
    }
}

export default Quiz;