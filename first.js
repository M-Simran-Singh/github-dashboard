let searchname = document.querySelector(".search")
let main = document.querySelector(".main")
let searchbtn = document.querySelector(".searchbtn")
let profile=document.querySelector(".profile")
let avatar = document.querySelector(".avatar")
let name = document.querySelector(".name")
let userName=document.querySelector(".userName")
let followers = document.querySelector(".followers")
let following = document.querySelector(".following")
let Repositories = document.querySelector(".repo")
let git = document.querySelector(".git")
let bio = document.querySelector(".bio")
let locationElement = document.querySelector(".location")
let company = document.querySelector(".company")
let website = document.querySelector(".website")
let joinedDateElement = document.querySelector(".joinedDate")
let repoTitle = document.querySelector(".repoTitle")
let repoDescription = document.querySelector(".repoDescription")
let repoLanguage = document.querySelector(".repoLanguage")
let stars = document.querySelector(".stars")
let forks =document.querySelector(".forks")
let repositoryGrid = document.querySelector(".repositoryGrid")
let repoFooter = document.querySelector(".repoFooter")
let time = document.querySelector(".time")
let error = document.querySelector(".error")
let clearbtn = document.querySelector(".clear")
let manageRepository = document.querySelector(".manageRepository")
let loading = document.querySelector(".loading")
let moon = document.querySelector(".moon")
let reponame = document.querySelector(".reponame")
let allRepositories = [];
let profileLink = document.querySelector(".profileLink");

moon.addEventListener("click",()=>{
document.body.classList.toggle("dark");
 if(document.body.classList.contains("dark")){
        moon.innerText = "☀️";
    }else{
        moon.innerText = "🌙";
    }
})
profile.style.display="none";
repositoryGrid.style.display ="none";
error.style.display="none";
manageRepository.style.display="none"
clearbtn.addEventListener("click",()=>{
    searchname.value=""
})

reponame.addEventListener("input",()=>{
let namedrepo = reponame.value.toLowerCase();
let allRepos = document.querySelectorAll(".repoCard");
for(let i =0 ;i< allRepos.length;i++){
let title = allRepos[i].querySelector(".repoTitle").innerText.toLowerCase();

        if (title.includes(namedrepo)) {
            allRepos[i].style.display = "block";
        } else {
            allRepos[i].style.display = "none";
        }
    }
});


searchbtn.addEventListener("click",async ()=>{
    try{
         error.style.display="none";
   let display = searchname.value;
   loading.style.display = "block";
 let gitAPI = (`https://api.github.com/users/${display}`)
 let response = await fetch(gitAPI);
 if(!response.ok){
    throw new Error("😕 No GitHub user found with that username");
    
 }

let data = await response.json();
console.log(data)
loading.style.display = "none";
profile.style.display = "flex";
manageRepository.style.display="flex"
repositoryGrid.style.display = "flex";
avatar.src = data.avatar_url;
name.innerText=data.login;

profileLink.href = data.html_url;
profileLink.target = "_blank";

userName.innerText = `@${data.login}`;
followers.innerText = data.followers;
following.innerText=data.following;
Repositories.innerText=data.public_repos;
git.innerText=data.public_gists;
bio.innerText=data.bio;
if(!data.location){
    locationElement.innerText = " 📍Not Specified";
}
else{
    locationElement.innerText = `📍 ${data.location}`;
}
if(!data.company){
    company.innerText = " 🏢 Not Specified";
}
else{
    company.innerText = `🏢 ${data.company}`;
}
if(!data.website){
    website.innerText = " 🔗 No website ";
}
else{
    website.innerText = `🔗 ${data.blog}`;
}
let date = new Date(data.created_at);
joinedDateElement.innerText = `📅 Joined ${date.toDateString()}`;

let repoAPI = `https://api.github.com/users/${display}/repos`
           let repoPromise =  await fetch(repoAPI);
           let repoResponse = await repoPromise.json();
            allRepositories = repoResponse;
            repositoryGrid.innerHTML="";
          
          
            for(let i = 0; i < repoResponse.length; i++){

             let card = document.createElement("div");
             card.classList.add("repoCard")
             
             
            let title = document.createElement("a");
            title.classList.add("repoTitle");
            title.innerText = repoResponse[i].name;
            title.href = repoResponse[i].html_url;
            title.target = "_blank";         

             let describe = document.createElement("p");
             describe.classList.add("repoDescription");
             describe.innerText = repoResponse[i].description;
           
             let language = document.createElement("span");
             language.classList.add("repoLanguage");
             language.innerText = repoResponse[i].language;

              let footer = document.createElement("div");
             footer.classList.add("repoFooter");
             let stats = document.createElement("div");
             stats.classList.add("repoStats")
     
         
          let star = document.createElement("span");
          star.classList.add("stars")
          star.innerText = `⭐ ${repoResponse[i].stargazers_count}`;
 
          let forkCount = document.createElement("span");
          forkCount.classList.add("forks")
         forkCount.innerText = `🍴 ${repoResponse[i].forks_count}`;

         let time = document.createElement("span")
         let createdTime = new Date(repoResponse[i].created_at);
         time.innerText = `🕒: ${createdTime.toDateString()}`;

         stats.append(star,forkCount,time);
         footer.append(stats,language)
         card.append(title,describe,footer)
         repositoryGrid.append(card)
            }
        }
        catch(error1){
        profile.style.display = "none";
        manageRepository.style.display = "none";
        repositoryGrid.style.display = "none"; 
        error.innerText=error1.message;
        loading.style.display = "none";
        error.style.display="flex";       
}
})

