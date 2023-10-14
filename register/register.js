import{registerUser} from "../RESTAPI_module.mjs";

async function register(user){
    try {
        const response = await registerUser(user);
        const jsonReturn = await response.json();
        console.log(jsonReturn);

        if(response.ok){
            loginForm.hidden = true;
            message.innerHTML = "Registration successful, redirecting to login page.";
            message.style.color = "Green";
            redirect();
        }
        else{
            message.innerHTML = jsonReturn.errors[0].message;
            message.style.color = "red";
        }
        
    }
    catch (error) {
        // catches errors both in fetch and response.json
        console.log(error);
    }
}

function redirect () {
    setTimeout(myURL, 2000);
 }

 function myURL() {
    document.location.href = '/index.html';
 }

const message = document.getElementById("userFeedback");
const loginForm = document.getElementById("RegistrationForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("FirstName").value;
    const lastName = document.getElementById("LastName").value;
    const email = document.getElementById("InputEmail").value;
    const password = document.getElementById("InputPassword").value;

    const user = {
        "name": firstName + "_" + lastName, 
        "email": email, 
        "password": password
      };

    register(user);
});