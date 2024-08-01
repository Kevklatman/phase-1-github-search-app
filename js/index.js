document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        searchGitHubUsers(searchTerm);
      }
    });
  
    function searchGitHubUsers(searchTerm) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          data.items.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}" width="50">
              <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            li.addEventListener('click', (e) => {
              e.preventDefault();
              fetchUserRepos(user.login);
            });
            userList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  
    function fetchUserRepos(username) {
      reposList.innerHTML = '';
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
          repos.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              <p>${repo.description || 'No description available.'}</p>
            `;
            reposList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching repos:', error));
    }
  });