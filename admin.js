console.log("admin.js loaded");
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    updateDoc 
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxGtGuT_rtDNEHG82VEWaUmvxpWUhGyS0",
  authDomain: "link2pdf-5f49b.firebaseapp.com",
  projectId: "link2pdf-5f49b",
  storageBucket: "link2pdf-5f49b.appspot.com",
  messagingSenderId: "1077610278306",
  appId: "1:1077610278306:web:4c6a3debb98c9f01fa16fb",
  measurementId: "G-137E5N7M29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication state changes
onAuthStateChanged(auth, user => {
    if (user) {
        // User is signed in
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        loadSettings(); // Load settings when user is signed in
    } else {
        // No user is signed in
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('admin-panel').classList.add('hidden');
    }
});

// Function to handle user login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful login is handled by onAuthStateChanged
        })
        .catch((error) => {
            console.error('Login failed:', error.message);
            alert('Login failed: ' + error.message);
        });
}

window.login = login;
// Load settings from Firestore
function loadSettings() {
    const shutoffRef = doc(db, 'info', 'shutoff');
    const announcementRef = doc(db, 'info', 'announcement');

    getDoc(shutoffRef).then((doc) => {
        if (doc.exists()) {
            document.getElementById('shutoff-checkbox').checked = doc.data().shutoff;
            document.getElementById('shutoff-message').value = doc.data().msg || '';
        }
    });

    getDoc(announcementRef).then((doc) => {
        if (doc.exists()) {
            document.getElementById('announcement-message').value = doc.data().msg || '';
        }
    });
}

window.loadSettings = loadSettings;

// Update settings in Firestore
function updateSettings() {
    const shutoff = document.getElementById('shutoff-checkbox').checked;
    const shutoffMsg = document.getElementById('shutoff-message').value;
    const announcementMsg = document.getElementById('announcement-message').value;

    const shutoffRef = doc(db, 'info', 'shutoff');
    const announcementRef = doc(db, 'info', 'announcement');

    updateDoc(shutoffRef, { shutoff, msg: shutoffMsg });
    updateDoc(announcementRef, { msg: announcementMsg })
        .then(() => {
            alert('Settings updated successfully.');
        })
        .catch((error) => {
            console.error('Error updating settings:', error);
            alert('Error updating settings: ' + error.message);
        });
}

window.updateSettings = updateSettings;

// Set focus on the email input on page load
document.getElementById('email').focus();
