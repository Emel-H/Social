
const noroffProfileUrl = "https://api.noroff.dev/api/v1/social/profiles/";



async function getProfile(username){
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(noroffProfileUrl+username, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
              },
        });
        const jsonReturn = await response.json();
        console.log(jsonReturn);

        if(response.ok){
            profileName.innerHTML = jsonReturn.name;
            profileEmail.innerHTML = jsonReturn.email;
        }
        
    }
    catch (error) {
        // catches errors both in fetch and response.json
        console.log(error);
    }
}

function setProfileUser(){
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const user = params.get("user");
    if(user!=null){
        username = user;
    }
}

let username = localStorage.getItem('username');
setProfileUser();

const profileImage = document.getElementById("profileImage");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
getProfile(username);