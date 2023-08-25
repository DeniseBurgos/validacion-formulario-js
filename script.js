// import firebase from "firebase/app";
// import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpUElusDeuu-vVgROziYJiUwJOo-WwfJ8",
  authDomain: "datos-de-formulario-d2078.firebaseapp.com",
  projectId: "datos-de-formulario-d2078",
  storageBucket: "datos-de-formulario-d2078.appspot.com",
  messagingSenderId: "426480586484",
  appId: "1:426480586484:web:458b4f7bd203236bdfd8a1",
  measurementId: "G-VC2K687DNY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //Validar campo nombre
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "El campo nombre es obligatorio";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  //Validar correo electronico
  let emailEntrada = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!emailPattern.test(emailEntrada.value)) {
    emailError.textContent = "El correo electrónico no es válido";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }

  //validar la contraseña
  let contrasenaEntrada = document.getElementById("password");
  let contrasenaError = document.getElementById("passwordError");
  let contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent =
      "La contraseña debe tener al menos 8 caracteres como numeros, mayusculas, minusculas y caracteres especiales";
    contrasenaError.classList.add("error-message");
  } else {
    contrasenaError.textContent = "";
    contrasenaError.classList.remove("error-message");
  }

  //Si todos los campos son correctos formular
  if (
    !errorNombre.textContent &&
    !emailError.textContent &&
    !contrasenaError.textContent
  ) {
    //BACKEND QUE RECIBA LA INFORMACIÓN

    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con éxito", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
