// Importar funciones necesarias de Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, push, set, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBm76tYaamCmJs77CU3F3HsOUq0eF3jkiCY",
    authDomain: "padeltournamentpeople.firebaseapp.com",
    databaseURL: "https://padeltournamentpeople-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "padeltournamentpeople",
    storageBucket: "padeltournamentpeople.appspot.com",
    messagingSenderId: "747127350306",
    appId: "1:747127350306:web:24cfa707a7ac9bf6f4d67b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Manejo del formulario
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const apartment = document.getElementById('apartment').value;
    const playSide = document.getElementById('playSide').value;

    const formData = { name, apartment, playSide };
    console.log("Datos a enviar:", formData);

    const dbRef = ref(database, 'registrations');
    const nameApartmentQuery = query(dbRef, orderByChild('name_apartment'), equalTo(name + '_' + apartment));

    try {
        const snapshot = await get(nameApartmentQuery);
        if (snapshot.exists()) {
            alert('Ya existe un registro con este nombre y apartamento.');
        } else {
            push(dbRef, { ...formData, name_apartment: name + '_' + apartment })
                .then(() => {
                    console.log('Data write succeeded');
                    alert('Inscripción exitosa.');
                })
                .catch((error) => {
                    console.log('Data write failed:', error);
                    alert('Error al inscribir.');
                });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

