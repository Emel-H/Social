const noroffLoginUrl = "https://api.noroff.dev/api/v1/social/auth/login";
const noroffRegisterUrl = "https://api.noroff.dev/api/v1/social/auth/register";
const noroffProfileUrl = "https://api.noroff.dev/api/v1/social/profiles/";
const noroffPostsUrl = "https://api.noroff.dev/api/v1/social/posts/";

async function loginUser(user){
    const response = await fetch(noroffLoginUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    });
    return response;
}

async function registerUser(user){
    const response = await fetch(noroffRegisterUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    });
    return response;
}

async function profileInfo(username, token){
    const response = await fetch(noroffProfileUrl+username+"?_posts=true&_followers=true&_following=true", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        
    });
    return response;
}

async function postDelete(id, token){
    const response = await fetch(noroffPostsUrl+id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
    });
    return response;
}

async function postGet(id, token){
    const response = await fetch(noroffPostsUrl+id+"?_author=true", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

async function postEdit(id, token){
    const response = await fetch(noroffPostsUrl+id, {
        method: 'PUT',
        body: JSON.stringify({
            title: document.getElementById("postTitle").value,
            body: document.getElementById("postBody").value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
    });
    return response;
}

async function postNew(token){
    const response = await fetch(noroffPostsUrl, {
        method: 'POST',
        body: JSON.stringify({
            title: document.getElementById("postTitle").value,
            body: document.getElementById("postBody").value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
    });
    return response;
}

export{loginUser, registerUser, profileInfo, postDelete, postGet, postEdit, postNew};