import app from 'firebase/app';
import 'firebase/auth';

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
        this.auth = app.auth();
    }

    // Inscription
    signUpUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // Connexion
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // Déconnexion
    signoutUser = () => this.auth.signOut();

    // Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

}

export default Firebase;