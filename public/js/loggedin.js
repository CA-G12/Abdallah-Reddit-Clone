const feed = document.querySelector('.feed');
const body = document.body;
const logoutbtn = document.querySelector('.logout-btn')
const createPostPopUpBtn = document.querySelector('.create-post');
const createPostPopUp = document.querySelector('.create-post-popup');
const xpost = document.querySelector('.xpost');
const createPostBtn = document.querySelector('.create-post-button');
const createpostInput = document.querySelector('#create-post-input-looks');
const newPostsButton = document.querySelector('#new-posts-button');
const bestPostsButton = document.querySelector('#best-posts-button');

const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('.search-form');


const UsernamefromDatabase = document.querySelector('#username-from-database');

window.scrollTo(0, 0);

createPostPopUpBtn.addEventListener('click', () => {
    createPostPopUp.style.display = 'flex';
})

createpostInput.addEventListener('focus', () => {
    createPostPopUp.style.display = 'flex';
})

xpost.addEventListener('click', () => {
    createPostPopUp.style.display = 'none';
})

createPostBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const postTitle = document.querySelector('.create-post-input-unique').value;
    const postContent = document.querySelector('.post-content-textarea').value;
    const postImage = document.querySelector('.post-img-input').value;

    fetch('/create-post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        'body': JSON.stringify({
            postTitle, postContent, postImage 
        })    
    })
    .then(window.location.href = '/u');
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

        fetch(`/displayVotes/${element.post_id}`)
        .then(res => res.json())
        .then(res => {
            if (!res[0]) {
                downVote.style.color = 'black';
                upVote.style.color = 'black';
            } else if (res[0].vote_status === 'down') {
                downVote.style.color = '#FF5700';
            } else if (res[0].vote_status === 'up') {
                upVote.style.color = '#FF5700';
            } 
        })
        .catch(err => console.log(err))
        

        
        
        postOption1Text.textContent = 'Comment';
        postOption2Text.textContent = 'Save';

        upVote.addEventListener('click', (e) => {
            fetch(`/upvote/${element.post_id}`)
            .then(() => {
                window.location.href = '/u'
            })
            .catch(err => {
                console.log(err)
                window.location.href = '/u'
            })
        })

        downVote.addEventListener('click', (e) => {
            fetch(`/downvote/${element.post_id}`)
            .then(() => {
                window.location.href = '/u'
            })
            .catch(err => {
                console.log(err)
                window.location.href = '/u'
            })
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

logoutbtn.addEventListener('click', () => {
    fetch('/logout')
    .then(window.location.href = '/')
})


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


fetch('/getUsername')
.then(res => res.json())
.then(res => {
    UsernamefromDatabase.textContent = res;
})
.catch(err => showError('Error In Fetching Usename'))

