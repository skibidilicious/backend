import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDxGtGuT_rtDNEHG82VEWaUmvxpWUhGyS0",
  authDomain: "link2pdf-5f49b.firebaseapp.com",
  projectId: "link2pdf-5f49b",
  storageBucket: "link2pdf-5f49b.appspot.com",
  messagingSenderId: "1077610278306",
  appId: "1:1077610278306:web:4c6a3debb98c9f01fa16fb",
  measurementId: "G-137E5N7M29"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('admin-panel').classList.remove('hidden');
            loadSettings();
        })
        .catch((error) => {
            console.error('Login failed:', error.message);
        });
}

function loadSettings() {
    const shutoffRef = doc(db, 'info', 'shutoff');
    getDoc(shutoffRef).then((doc) => {
        if (doc.exists()) {
            document.getElementById('shutoff-checkbox').checked = doc.data().shutoff;
            document.getElementById('shutoff-message').value = doc.data().msg || '';
        }
    });
    const announcementRef = doc(db, 'info', 'announcement');
    getDoc(announcementRef).then((doc) => {
        if (doc.exists()) {
            document.getElementById('announcement-message').value = doc.data().msg || '';
        }
    });
}

function updateSettings() {
    const shutoff = document.getElementById('shutoff-checkbox').checked;
    const shutoffMsg = document.getElementById('shutoff-message').value;
    const announcementMsg = document.getElementById('announcement-message').value;

    const shutoffRef = doc(db, 'info', 'shutoff');
    updateDoc(shutoffRef, {
        shutoff: shutoff,
        msg: shutoffMsg
    });

    const announcementRef = doc(db, 'info', 'announcement');
    updateDoc(announcementRef, {
        msg: announcementMsg
    }).then(() => {
        alert('Settings updated successfully.');
    }).catch((error) => {
        console.error('Error updating settings:', error);
    });
}

document.getElementById('email').focus();
