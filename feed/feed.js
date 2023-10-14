
import{postGet} from "../RESTAPI_module.mjs";
let postsArray;

async function getPosts(){
    try {
        const token = localStorage.getItem('accessToken');
        if(token==null){
            document.location.href = '/index.html';
        }else{
            let filter = getFilter();
            const response = await postGet(filter, token);
            const jsonReturn = await response.json();
            
            if(response.ok){
                getPostsArray(jsonReturn);
                const search = document.getElementById("searchinput").value;
                setPosts(postsArray, search);
            }
        }
    }
    catch (error) {
        // catches errors both in fetch and response.json
        console.log(error);
    }
}

function getFilter(){
    const filter = document.getElementsByClassName("form-select");
    if(filter[0].value=="All Posts"){
        return "";
    }
    else if(filter[0].value==1){
        return "following/";
    }
}

function getPostsArray(jsonReturn){
    postsArray = new Array();
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
        readMore.href = "../post/?id="+element.id+"&edit=false";
        readMore.className = "btn btn-light";
        readMore.innerHTML = "Read more";
        cardBody.append(readMore);
        card.append(cardBody);
        postsArray.push(card); 
    });
}

function setPosts(postsArray,search){
    const posts = document.getElementById("posts");
    posts.innerHTML = "";
    const filteredPosts = postsArray.filter((card) => {
    if(search==""){
        return true;
    } else{
        if (String(card.innerHTML).replace(/<[^>]+>/g, '').toLowerCase().includes(search.toLowerCase())) {
            return true;
            } else {
            return false;
            }
    }
    });

    const results = document.createElement("p");
    results.innerHTML = "Found " + filteredPosts.length + " results";
    results.className = "text-center my-3";
    posts.append(results);

    filteredPosts.forEach(element => {
        posts.append(element); 
    });
}

document.getElementById("submit").addEventListener("click", (e) => {
    getPosts();
  });

getPosts();