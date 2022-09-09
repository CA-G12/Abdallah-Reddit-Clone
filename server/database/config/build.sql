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
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
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

INSERT INTO users (username, password, email, profile_img, bio) VALUES ('Full Effort', '123456', 'g@google.com', 'google.com', 'my bio');

INSERT INTO posts (post_title, post_img, post_content, post_votes, user_id) 
VALUES ('Everyone is lonley sometimes', '#', 'But I would walk a thousand miles to see you rise.', '40', 1);

INSERT INTO posts (post_title, post_img, post_content, post_votes, user_id) 
VALUES ('Sometimes, it''s hard to ignore the need for connection and belonging.', '#', 'Humans are designed for connection, and it''s very hard to keep lonliness at bay without a partner. If you asked me, maybe my longing for connection is a product of my addiction. Maybe it''s the other way around. Either way, I''m going to solve this issue.', '28', 1);

INSERT INTO posts (post_title, post_img, post_content, post_votes, user_id) 
VALUES ('Sometimes, it''s hard to ignore the need for connection and belonging.', '#', 'Humans are designed for connection, and it''s very hard to keep lonliness at bay without a partner. If you asked me, maybe my longing for connection is a product of my addiction. Maybe it''s the other way around. Either way, I''m going to solve this issue.', '28', 1);
INSERT INTO posts (post_title, post_img, post_content, post_votes, user_id) 
VALUES ('Sometimes, it''s hard to ignore the need for connection and belonging.', '#', 'Humans are designed for connection, and it''s very hard to keep lonliness at bay without a partner. If you asked me, maybe my longing for connection is a product of my addiction. Maybe it''s the other way around. Either way, I''m going to solve this issue.', '28', 1);
INSERT INTO posts (post_title, post_img, post_content, post_votes, user_id) 
VALUES ('Sometimes, it''s hard to ignore the need for connection and belonging.', '#', 'Humans are designed for connection, and it''s very hard to keep lonliness at bay without a partner. If you asked me, maybe my longing for connection is a product of my addiction. Maybe it''s the other way around. Either way, I''m going to solve this issue.', '28', 1);

INSERT INTO votes (user_id, post_id, vote_status, vote_count) VALUES (1, 1, 'Neutral', -1);

COMMIT;