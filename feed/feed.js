
const noroffPostsUrl = "https://api.noroff.dev/api/v1/social/posts/";

async function getPosts(){
    try {
        const token = localStorage.getItem('accessToken');
        if(token==null){
            document.location.href = '/index.html';
        }else{
            let filter = getFilter();
            const response = await fetch(noroffPostsUrl+filter+"?_author=true", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${token}`,
                  },
                
            });
            const jsonReturn = await response.json();
            console.log(jsonReturn);
    
            if(response.ok){
                setPosts(jsonReturn);
            }
        }
    }
    catch (error) {
        // catches errors both in fetch and response.json
        console.log(error);
    }
}

function getFilter(){
    let filter = document.getElementsByClassName("form-select");
    console.log(filter[0].value);
    if(filter[0].value=="All Posts"){
        return "";
    }
    else if(filter[0].value==1){
        return "following/";
    }
}

function setPosts(jsonReturn){
    const posts = document.getElementById("posts");
    posts.innerHTML = "";
    const profilePosts = jsonReturn;
    profilePosts.forEach(element => {
        const card = document.createElement("div");
        card.className = "card my-2";
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        const postTitle = document.createElement("h4");
        postTitle.innerHTML = element.title;
        cardHeader.append(postTitle);
        const postOwner = document.createElement("p");
        postOwner.innerHTML = "Posted by "+element.author.name + " on " + new Date(element.updated);
        cardHeader.append(postOwner);
        card.append(cardHeader);
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const postBody = document.createElement("p");
        postBody.className = "card-text";
        postBody.innerHTML = element.body;
        cardBody.append(postBody);
        const readMore = document.createElement("a");
        readMore.href = document.URL +"Post/?id="+element.id;
        readMore.className = "btn btn-light";
        readMore.innerHTML = "Read more";
        cardBody.append(readMore);
        card.append(cardBody);
        posts.append(card); 
    });
}

document.getElementById("submit").addEventListener("click", (e) => {
    getPosts();
  });

getPosts();