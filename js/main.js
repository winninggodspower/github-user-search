const url = "https://api.github.com/users/";
const searchForm = $('#search-form');
const userImage = $('#user-img');
const username = $('#username');
const bio = $('#bio');
const repos = $('#repos');
const following = $('#following');
const followers = $('#followers');
const hidden = $('#hidden');

$('#icon-toggle-block').click(()=>{
    $('html').toggleClass('dark');

    if($('html').hasClass('dark')){
        $('#icon-toggle').html('<i class="bi bi-moon-fill"></i>')
    }else{
        $('#icon-toggle').html('<i class="bi bi-brightness-high-fill"></i>')
    }
})

let SocialSearch = {
    github: SendGitHubRequest,
    facebook: HandleFacebookRequest,
}


function SendGitHubRequest(searchInput) {
    let gitUrl = url.concat(searchInput)
    fetch(gitUrl)
      .then((response) => response.json())
      .then((data) => {
        HandleGitHubRequest(data);
      })
      .catch((error) => {
        throw error;
      });
  }

searchForm .on('submit',(e)=>{
    e.preventDefault()
    let searchInput =  searchForm.serializeArray()[0].value
    searchInput = searchInput.trim().replace(/ /, '')
    
    //conditionally
    SendGitHubRequest(searchInput)
})

function HandleGitHubRequest(data) {
    userImage.attr('src', data.avatar_url);
    username.html(data.login)
    bio.html(data.bio)
    followers.html(data.followers)
    following.html(data.following)
    repos.html(data.public_repos)

    if (data.bio == '') {
        hidden.attr('hidden', 'false')
    }
}

function HandleFacebookRequest(searchInput) {
    
}

githubApiResponse = {
    "login": "winning",
    "id": 936212,
    "node_id": "MDQ6VXNlcjkzNjIxMg==",
    "avatar_url": "https://avatars.githubusercontent.com/u/936212?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/winning",
    "html_url": "https://github.com/winning",
    "followers_url": "https://api.github.com/users/winning/followers",
    "following_url": "https://api.github.com/users/winning/following{/other_user}",
    "gists_url": "https://api.github.com/users/winning/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/winning/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/winning/subscriptions",
    "organizations_url": "https://api.github.com/users/winning/orgs",
    "repos_url": "https://api.github.com/users/winning/repos",
    "events_url": "https://api.github.com/users/winning/events{/privacy}",
    "received_events_url": "https://api.github.com/users/winning/received_events",
    "type": "User",
    "site_admin": false,
    "name": null,
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 0,
    "public_gists": 0,
    "followers": 1,
    "following": 0,
    "created_at": "2011-07-24T23:39:16Z",
    "updated_at": "2021-05-20T19:45:08Z"
  }