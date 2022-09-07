const feed = document.querySelector('.feed');

window.scrollTo(0, 0);

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
    
        // Adding Content
    
        votesNumber.textContent = element.post_votes;
        postedByJust.textContent = 'Posted By '
        postedUsername.textContent = 'Eminem ';
        postedTime.textContent = '15 Minutes Ago';
        

        postTitle.textContent = element.post_title;
        postText.textContent = element.post_content;
        
        
        postOption1Text.textContent = 'Comment';
        postOption2Text.textContent = 'Save';

        upVote.addEventListener('click', (e) => {
            fetch(`/upvote/${element.post_id}`)
            .then(window.location.href = '/')
            .catch(err => console.log(err))
        })

        downVote.addEventListener('click', (e) => {
            fetch(`/downvote/${element.post_id}`)
            .then(window.location.href = '/')
            .catch(err => console.log(err))
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
.then(res => renderPosts(res))
.catch(err => console.log(err))
