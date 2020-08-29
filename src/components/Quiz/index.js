import React, {Component, Fragment} from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import {QuizMarvel} from "../quizMarvel";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import QuizOver from "../QuizOver";
import { FaChevronRight } from 'react-icons/fa';

toast.configure();

const initialState = {
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
    percent: null,
};

const levelNames = ["debutant", "confirme", "expert"];

    class Quiz extends Component {


    constructor(props) {
        super(props);
        this.state = initialState;
        this.storedDataRed = React.createRef();

    }

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
        this.loadQuestions(levelNames[this.state.quizLevel]);
    }

        componentDidUpdate(prevProps, prevState, snapshot) {
            const {
                maxQuestions,
                storedQuestions,
                idQuestion,
                score,
                quizEnd,
            } = this.state;

            if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
                this.setState({
                    question: storedQuestions[idQuestion].question,
                    options: storedQuestions[idQuestion].options,
                })
            }

            if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
                this.setState({
                    question: storedQuestions[idQuestion].question,
                    options: storedQuestions[idQuestion].options,
                    userAnswer: null,
                    btnDisabled: true,
                })
            }

            if (quizEnd !== prevState.quizEnd) {
                this.gameOver(this.getPercent(maxQuestions, score));
            }

            if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
                this.showToastMsg(this.props.userData.pseudo);
            }

        }

    showToastMsg = pseudo => {
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
            this.setState({
                quizEnd: true,
            })
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

    gameOver = percent => {

        if (percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: percent,
            })
        } else {
            this.setState({
                percent: percent,
            })
        }
    }

    loadLevelQuestions = param => {
        this.setState({...initialState, quizLevel: param})
        this.loadQuestions(levelNames[param]);
    }

    render() {
        const {
            quizLevel,
            maxQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            percent
        } = this.state;

        const displayOptions = options.map((option, index) => {
            return (
                <p key={index}
                   className={`answerOptions ${userAnswer === option && 'selected'}`}
                   onClick={() => this.submitAnswer(option)}>
                    <FaChevronRight />{option}
                </p>
            )
        })

        return this.state.quizEnd ?
            <QuizOver ref={this.storedDataRed}
                      levelNames={levelNames}
                      score={score}
                      maxQuestions={maxQuestions}
                      quizLevel={quizLevel}
                      percent={percent}
                      loadLevelQuestions={this.loadLevelQuestions}
            />
            :
            <Fragment>
                <Levels
                levelNames={levelNames}
                quizLevel={quizLevel}
                />
                <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions}/>
                <h2>{question}</h2>
                {displayOptions}
                <button disabled={btnDisabled}
                        className={"btnSubmit"}
                        onClick={this.nextQuestion}>
                    {idQuestion < maxQuestions - 1 ?
                        'Suivant' : 'Terminer'}
                </button>
            </Fragment>
    }
}

export default Quiz;