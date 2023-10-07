const noroffPostsUrl = "https://api.noroff.dev/api/v1/social/posts/";


async function getPost(id){
    try {
        const token = localStorage.getItem('accessToken');
        if(token==null){
            document.location.href = '/index.html';
        }else{
            const response = await fetch(noroffPostsUrl+id+"?_author=true&_comments=true", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${token}`,
                  },
            });
            const jsonReturn = await response.json();
            
            if(response.ok){
                setPost(jsonReturn);
            }
        }
    }
    catch (error) {
        // catches errors both in fetch and response.json
        console.log(error);
    }
}

function setPost(jsonReturn){
    const post = document.getElementById("singlePost");
    const card = document.createElement("div");
    card.className = "card my-2";
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    const postTitle = document.createElement("h4");
    postTitle.innerHTML = jsonReturn.title;
    cardHeader.append(postTitle);
    const postOwner = document.createElement("p");
    postOwner.innerHTML = "posted by "+jsonReturn.author.name + " on " + new Date(jsonReturn.updated);
    cardHeader.append(postOwner);
    card.append(cardHeader);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const postBody = document.createElement("p");
    postBody.className = "card-text";
    postBody.innerHTML = jsonReturn.body;
    cardBody.append(postBody);
    card.append(cardBody);
    post.append(card); 
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

getPost(id);