import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyCDhlSJiuS6v_Ad8qsizv_t3F0GmqVL_NI",
    authDomain: "marvel-quiz-e0b42.firebaseapp.com",
    databaseURL: "https://marvel-quiz-e0b42.firebaseio.com",
    projectId: "marvel-quiz-e0b42",
    storageBucket: "marvel-quiz-e0b42.appspot.com",
    messagingSenderId: "349042514768",
    appId: "1:349042514768:web:de45e9e81d6c6b30b16a55"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;