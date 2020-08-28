import React, {Component, Fragment} from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import {QuizMarvel} from "../quizMarvel";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends Component {

    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        quizEnd: false,
    }

    storedDataRed = React.createRef();

    loadQuestions = level => {
        const fetchedArrayQuizz = QuizMarvel[0].quizz[level];
        if (fetchedArrayQuizz.length >= this.state.maxQuestions) {
            this.storedDataRed.current = fetchedArrayQuizz;

            const newArray = fetchedArrayQuizz.map(({answer, ...keepRest}) => keepRest)
            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("Pas assez de questions");
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
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

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo);
        }

    }

    showWelcomeMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true,
            })
            toast.info(`Bienvnue ${pseudo}, bonne chance !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            console.log("Game over")
            this.gameOver();
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        const goodAnswer = this.storedDataRed.current[this.state.idQuestion].answer;

        if (this.state.userAnswer === goodAnswer) {
            toast.success('+1 points !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-color",
            });
            this.setState(prevState => ({
                score: prevState.score + 1
            }));
        } else {
            toast.error('Mauvaise réponse !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-color",
            });
        }
    }

    getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver() {
        const gradePercent = this.getPercent(this.state.maxQuestions, this.state.score);

        if (gradePercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradePercent,
                quizEnd: true,
            })
        } else {
            this.setState({
                percent: gradePercent,
                quizEnd: true
            })
        }
    }

    render() {
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index} className={`answerOptions ${this.state.userAnswer === option && 'selected'}`}
                   onClick={() => this.submitAnswer(option)}>{option}</p>
            )
        })

        return this.state.quizEnd ?
            <QuizOver ref={this.storedDataRed}
                      levelNames={this.state.levelNames}
                      score={this.state.score}
                      maxQuestions={this.state.maxQuestions}
                      quizLevel={this.state.quizLevel}
                      percent={this.state.percent}
            />
            :
            <Fragment>
                <Levels/>
                <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button disabled={this.state.btnDisabled}
                        className={"btnSubmit"}
                        onClick={this.nextQuestion}>
                    {this.state.idQuestion < this.state.maxQuestions - 1 ?
                        'Suivant' : 'Terminer'}
                </button>
            </Fragment>
    }
}

export default Quiz;