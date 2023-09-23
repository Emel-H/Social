
const noroffRegisterUrl = "https://api.noroff.dev/api/v1/social/auth/register";

const user = {
    "name": "my_username", 
    "email": "first.last@stud.noroff.no", 
    "password": "UzI1NiIsInR5cCI"
  };

async function register(user){
    try {
        const response = await fetch(noroffRegisterUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
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

let message = document.getElementById("userFeedback");
let loginForm = document.getElementById("RegistrationForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("FirstName").value;
    const lastName = document.getElementById("LastName").value;
    const email = document.getElementById("InputEmail").value;
    const password = document.getElementById("InputPassword").value;

    user.name = firstName + "_" + lastName;
    user.email = email;
    user.password = password;

    register(user);

    

});