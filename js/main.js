const url = "https://api.github.com/users/";
const searchForm = $('#search-form');
const userImage = $('#user-img');
const username = $('#username');
const bio = $('#bio');
const repos = $('#repos');
const following = $('#following');
const followers = $('#followers');
const hidden = $('#hidden');
const user_location = $('#location')
const email = $('#email')
const twitter = $('#twitter')
const joined_data = $('#joined_data')
const website = $('#website')

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
    UpdataProfile({
        user_img: data.avatar_url,
        username: data.login,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        public_repos: data.public_repos,
    })

    joined_data.html(data.created_at)
    user_location.html(data.location)
    website.html(data.blog)

    if (data.twitter_username) {
        twitter.html(data.twitter_username)
    }
}

function HandleFacebookRequest(searchInput) {
    
}


function UpdataProfile(userJsondata) {
    userImage.attr('src', userJsondata.user_img);
    username.html(userJsondata.username)
    bio.html(userJsondata.bio)
    followers.html(userJsondata.followers)
    following.html(userJsondata.following)
    repos.html(userJsondata.public_repos)
    website.html(userJsondata.website)

    if (userJsondata.bio == '') {
        hidden.attr('hidden', 'false')
    }
}