const form = document.querySelector("#github-form");
const userList = document.querySelector("#user-list");
const repoList = document.querySelector("#repos-list");
const repositoryTitle = document.querySelector(".repository-title");
const container = document.querySelector("#github-container");

const fetchUser = function (user) {
  fetch(`https://api.github.com/search/users?q=${user}`)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.items[0]);
      const userData = document.createElement("a");
      userData.innerHTML = `
        <div class="user-container">
            <img src="${data.items[0].avatar_url}" alt="" class="user-profile">
            <p>Usermane: <a class="user-link">${data.items[0].login}</a></p>
            <p>Repositories <a href="" class="repos-url">Repositories: ${data.items[0].repos_url}</a></p>
        </div>
      `;
      const userLink = userData.querySelector(".repos-url");
      userLink.addEventListener("click", function (e) {
        e.preventDefault();
      });

      const repoLink = userData.querySelector(".repos-url");
      repoLink.addEventListener("click", function (e) {
        e.preventDefault();
        repositoryTitle.classList.remove("hidden");
        fetchRepos(data.items[0].login);
      });
      //   userData.textContent = data.items[0].login;
      userList.appendChild(userData);
    })
    .catch(function (err) {
      alert("User doesn't exist");
    });
};

const fetchRepos = function (user) {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((res) => res.json())
    .then(function (data) {
      data.forEach((element) => {
        // console.log(element.name);
        const html = `
        <ul class="repo-ul">
            <li class="repo-item">${element.name}</li>
        </ul>
        `;
        repoList.insertAdjacentHTML("beforeend", html);
      });
    });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let userInput = e.target.search.value;
  fetchUser(userInput);
  e.target.search.value = "";
});
