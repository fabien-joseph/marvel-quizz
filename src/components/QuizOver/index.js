import React, {Fragment, useEffect, useState} from "react";
import {GiTrophyCup} from "react-icons/gi";
import {Loader} from "../Loader";
import {Modal} from "../Modal";
import axios from 'axios';

const QuizOver = React.forwardRef((props, ref) => {

    const API_PUBLIC = process.env.REACT_APP_MARVEL_API_KEY;
    const hash = "c7728ea128418a69b6aafb0fea79c5bb";

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState([]);
    const [loading, setLoading] = useState(true);

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;

    useEffect(() => {
        setAsked(ref.current);

        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date);
        }
    }, [ref])

    const checkDataAge = date => {
        var today = Date.now();
        const timeDifference = today - date;
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 15) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }

    }

    const showModal = id => {
        setOpenModal(true);

        if (localStorage.getItem(id)) {
            setCharacterInfos(JSON.parse(localStorage.getItem(id)));
            setLoading(false);
        } else {
            axios
                .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC}&hash=${hash}`)
                .then(res => {
                    setCharacterInfos(res.data);
                    setLoading(false);

                    localStorage.setItem(id, JSON.stringify(res.data));
                    if (!localStorage.getItem('marvelStorageDate')) {
                        localStorage.setItem('marvelStorageDate', Date.now());
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const hideModal = () => {
        setOpenModal(false);
        setLoading(true);
    }

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel);
        }, 3000);
    }

    const questionAnswer = score >= averageGrade ? (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className={"btnInfo"}
                                onClick={() => showModal(question.heroId)}
                        >Infos
                        </button>
                    </td>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan={"3"}>
                <Loader style={{textAlign: 'center', color: 'red'}} text={"Pas de réponse"}/>
            </td>
        </tr>
    )
    const decision = score >= averageGrade ? (
        <Fragment>
            <div className={'stepsBtnContainer'}>
                {
                    quizLevel < levelNames.length ? (
                        <Fragment>
                            <p className={"successMsg"}>Bravo, passez au nouveau suivant</p>
                            <button className={"btnResult success"} onClick={() => loadLevelQuestions(quizLevel)}>Niveau
                                suivant
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className={"stepsBtnContainer"}>
                                <p className={"successMsg"}><GiTrophyCup size="50px"/> Bravo, vous êtes un expert !</p>
                                <button className={"btnResult gameOver"} onClick={() => loadLevelQuestions(0)}>Accueil
                                </button>
                            </div>
                        </Fragment>
                    )
                }
            </div>
            <div className={"percentage"}>
                <div className={"progressPercent"}>Réussite: {percent}%</div>
                <div className={"progressPercent"}>Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className={'stepsBtnContainer'}>
                <p className={"failureMsg"}>Vous avez échoué</p>
            </div>

            <div className={"percentage"}>
                <div className={"progressPercent"}>Réussite: {percent}%</div>
                <div className={"progressPercent"}>Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )

    const resultInModal = !loading ? (
        <Fragment>
            <div className={"modalHeader"}>
                <h2>{characterInfos.data.results[0].name}</h2>
            </div>
            <div className={"modalBody"}>
                <h3>Titre 2</h3>
            </div>
            <div className={"modalFooter"}>
                <button className={"modalBtn"}>Fermer</button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className={"modalHeader"}>
                <h2>Loading...</h2>
            </div>
            <div className={"modalBody"}>
                <Loader/>
            </div>
        </Fragment>
    )

    return (
        <Fragment>
            {decision}
            <hr/>
            <p>Les réponses aux questions posées :</p>

            <div className={"answerContainer"}>
                <table className={"answers"}>
                    <thead>
                    <tr>
                        <th>Question</th>
                        <th>Reponse</th>
                        <th>Infos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questionAnswer}
                    </tbody>
                </table>
            </div>

            <Modal showModal={openModal} hideModal={hideModal}>

                {resultInModal}

            </Modal>

        </Fragment>
    )
})


export default QuizOver;