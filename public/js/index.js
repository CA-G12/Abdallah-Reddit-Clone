const feed = document.querySelector('.feed');
const loginBtn = document.querySelector('#login-button');
const loginPopup = document.querySelector('.login-popup');
const background = document.querySelector('.background-gray');
const body = document.body;
const x = document.querySelector('.x');;
const xsignup = document.querySelector('.xsignup');;
const signupBtn = document.querySelector('#signupbtn');
const signupPopup = document.querySelector('.signup-popup');
const newPostsButton = document.querySelector('#new-posts-button');
const bestPostsButton = document.querySelector('#best-posts-button');


const signupBtnUnique = document.querySelector('.signup-button-unique');
const loginBtnUnique = document.querySelector('.login-button-unique');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('.search-form');

window.scrollTo(0, 0);



loginBtn.addEventListener('click', () => {
    loginPopup.style.display = 'flex';
    background.style.display = 'block';
    window.scrollTo(0, 0);
    body.style.overflow = 'hidden';
})

x.addEventListener('click', () => {
    loginPopup.style.display = 'none';
    background.style.display = 'none';
    body.style.overflow = 'visible';
})

signupBtn.addEventListener('click', () => {
    signupPopup.style.display = 'flex';
    background.style.display = 'block';
    window.scrollTo(0, 0);
    body.style.overflow = 'hidden';
})

xsignup.addEventListener('click', () => {
    signupPopup.style.display = 'none';
    background.style.display = 'none';
    body.style.overflow = 'visible';
})

signupBtnUnique.addEventListener('click', () => {
    const usernameinput = document.getElementById('username-input').value;
    const emailinput = document.getElementById('email-input').value;
    const passwordinput = document.getElementById('password-input').value;
    const confirmpasswordinput = document.getElementById('confirm-password-input').value;
    const profileimginput = document.getElementById('profile-img-input').value;
    const bioinput = document.getElementById('bio-input').value;

    fetch('/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        'body': JSON.stringify({
            usernameinput, emailinput, passwordinput, confirmpasswordinput, profileimginput, bioinput
        })    
    })
    .then(res => res.json())
    .then(res => {
        if (res === 'Username Already Exists') {
            showError('Username Already Exists')
        } else if (res.includes('Error:')) {
            showError(res)
        } else {
            window.location.href = '/u'
        }
    })
    .catch(err => showError('Error, Please Try Again Later'))
})

loginBtnUnique.addEventListener('click', () => {
    const loginusername = document.getElementById('login-username').value;
    const loginpassword = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        'body': JSON.stringify({
            loginusername, loginpassword
        })    
    })
    .then(res => res.json())
    .then(res => {
        if (res === 'Logged In') {
            window.location.href = '/u'
        } else {
            showError('Username or Password is Invalid')
        }
    })
    .catch(err => {
        showError('Username or Password is Invalid')
    })

})

const renderPosts = (data) => {
    data.forEach(element => {
        const post = document.createElement('div');
        const VotesSection = document.createElement('div');
        const upVote = document.createElement('i');
        const downVote = document.createElement('i');
        const votesNumber = document.createElement('div');
        const postSection = document.createElement('div');
        const postedBy = document.createElement('div');
        const postedByText = document.createElement('div');
        const postedUsername = document.createElement('span');
        const postedTime = document.createElement('span');
        const postTitle = document.createElement('div');
        const postContent = document.createElement('div');
        const postText = document.createElement('div');
        const postOptions = document.createElement('div');
        const postOption1 = document.createElement('div');
        const postOption2 = document.createElement('div');
        const postOption1Icon = document.createElement('i');
        const postOption2Icon = document.createElement('i');
        const postOption1Text = document.createElement('div');
        const postOption2Text = document.createElement('div');
        const postedByJust = document.createElement('span');
        const postImage = document.createElement('img');

    
        post.classList.add('post');
        VotesSection.classList.add('votes-section');
        upVote.classList.add('fa-solid', 'fa-arrow-up', 'votes-icon');
        downVote.classList.add('fa-solid', 'fa-arrow-down', 'votes-icon');
        votesNumber.classList.add('votes-number');
        postSection.classList.add('post-section');

        postedBy.classList.add('posted-by');
        postedByText.classList.add('posted-by-text');
        postedByJust.classList.add('posted-by-just');
        postedUsername.classList.add('posted-username');
        postedTime.classList.add('posted-time');

        postTitle.classList.add('post-title');
        postContent.classList.add('post-content');
        postText.classList.add('post-text');
        postOptions.classList.add('post-options');
        postOption1.classList.add('post-option');
        postOption2.classList.add('post-option');
        postOption1Icon.classList.add('fa-regular', 'fa-comment', 'post-options-icon');
        postOption2Icon.classList.add('fa-regular', 'fa-bookmark', 'post-options-icon');
        postOption1Text.classList.add('post-options-text');
        postOption2Text.classList.add('post-options-text');
        postImage.classList.add('post-image-special');

        // Adding Content
    
        votesNumber.textContent = element.post_votes;
        postedByJust.textContent = 'Posted By ';
        postImage.src = element.post_img;
        postImage.alt = 'Couldn\'t Load Image';


        fetch(`/getUserById/${element.user_id}`)
        .then(res => res.json())
        .then(res => postedUsername.textContent = res.username + " ")

        postedTime.textContent = element.post_date;

        fetch(`/fromnow/${element.post_date}`)
        .then(res => res.json())
        .then(res => postedTime.textContent = res)
        
        postTitle.textContent = element.post_title;
        postText.textContent = element.post_content;
        
        
        postOption1Text.textContent = 'Comment';
        postOption2Text.textContent = 'Save';

        upVote.addEventListener('click', (e) => {
            showError('You Need To Be Logged In To Vote')
        })

        downVote.addEventListener('click', (e) => {
            showError('You Need To Be Logged In To Vote')
        })
    
        /* Votes Section */
    
        VotesSection.appendChild(upVote);
        VotesSection.appendChild(votesNumber);
        VotesSection.appendChild(downVote);
    
        post.appendChild(VotesSection);
    
        /* Posts Section */

        postedByText.appendChild(postedByJust);
        postedByText.appendChild(postedUsername);
        postedByText.appendChild(postedTime);

    
        postedBy.appendChild(postedByText);
    
        postSection.appendChild(postedBy);
        postSection.appendChild(postTitle);
    
        postContent.appendChild(postText);
    
        postSection.appendChild(postContent);

        postSection.appendChild(postImage);

    
        postOption1.appendChild(postOption1Icon);
        postOption1.appendChild(postOption1Text);
    
        postOptions.appendChild(postOption1);
    
        postOption2.appendChild(postOption2Icon);
        postOption2.appendChild(postOption2Text);
    
        postOptions.appendChild(postOption2);
    
        postSection.appendChild(postOptions);

        post.appendChild(postSection);
    
        feed.appendChild(post);
    
    
    })
}


fetch('/api/posts')
.then(res => res.json())
.then(res => {
    if (res === 'Error') {
        throw new Error
    } else {
        renderPosts(res)
    }
})
.catch(err => showError('Could Not Load Posts - Try Reloading The Page'))

fetch('/userVerification')
.then(res => res.json())
.then(res => {
    if (res === 'Authorized') {
        window.location.href = '/u'
    }
})

newPostsButton.addEventListener('click', () => {
    feed.textContent = '';
    fetch('/api/newposts')
    .then(res => res.json())
    .then(res => {
        if (res === 'Error') {
            throw new Error
        } else {
            renderPosts(res)
        }
    })
    .catch(err => showError('Could Not Load Posts - Try Reloading The Page'))

})

bestPostsButton.addEventListener('click', () => {
    feed.textContent = '';

    fetch('/api/posts')
    .then(res => res.json())
    .then(res => {
        if (res === 'Error') {
            throw new Error
        } else {
            renderPosts(res)
        }
    })
    .catch(err => showError('Could Not Load Posts - Try Reloading The Page'))

})

searchInput.addEventListener('input', (e) => {
    const NewsearchInput = document.querySelector('#search-input');
    feed.textContent = '';

    fetch('/api/posts')
    .then(res => res.json())
    .then(res => {
        newRes = res.filter(e => {
            return e.post_title.includes(NewsearchInput.value) || e.post_content.includes(NewsearchInput.value);
        })
        return newRes
    })
    .then(res => {
        if (res === 'Error') {
            throw new Error
        } else {
            renderPosts(res)
        }
    })
    .catch(err => console.log(err))

})
