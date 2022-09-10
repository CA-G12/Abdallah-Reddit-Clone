BEGIN; 

DROP TABLE IF EXISTS posts, comments, users, votes CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(55) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL, 
    profile_img TEXT NOT NULL, 
    bio VARCHAR(1000) NOT NULL
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY, 
    post_title TEXT NOT NULL,
    post_img TEXT,
    post_content TEXT NOT NULL,
    post_votes INTEGER NOT NULL,
    user_id INTEGER, 
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    post_date TEXT NOT NULL

);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, 
    comment_text TEXT NOT NULL,
    comment_votes INTEGER NOT NULL,
    user_id INTEGER, 
    post_id INTEGER, 
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES posts(post_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE votes (
    user_id INTEGER, 
    post_id INTEGER,
    vote_status VARCHAR(100) NOT NULL, 
    vote_count INTEGER,
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES posts(post_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

COMMIT;