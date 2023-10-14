import{loginUser} from "./RESTAPI_module.mjs";

async function login(user){
    try {
        const response = await loginUser(user);
        const jsonReturn = await response.json();
        console.log(jsonReturn);

        if(response.ok){
            localStorage.username = jsonReturn.name;
            localStorage.email = jsonReturn.email;
            localStorage.accessToken = jsonReturn.accessToken;
            localStorage.avatar = jsonReturn.avatar;
            document.location.href = 'profile/index.html';
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

const message = document.getElementById("userFeedback");
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("InputEmail").value;
    const password = document.getElementById("InputPassword").value;

    const user = {
        "email": email, 
        "password": password
      };

    login(user);

});