document.addEventListener('DOMContentLoaded', () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('post-list');
    
    function renderPosts() {
        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3><a href="post.html?id=${index}">${post.title}</a></h3>
                <p>${post.content.substring(0, 100)}...</p>
                <p><small>${post.date}</small></p>
            `;
            postList.appendChild(postElement);
        });
    }

    // Render posts on index.html
    if (postList) {
        renderPosts();
    }

    // Add new post
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const date = document.getElementById('date').value;
            const newPost = { title, content, date };
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            window.location.href = 'index.html';
        });
    }

    // Post details
    const postDetails = document.getElementById('post-details');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postDetails && postId !== null) {
        const post = posts[postId];
        if (post) {
            postDetails.innerHTML = `
                <h2>${post.title}</h2>
                <p><small>${post.date}</small></p>
                <p>${post.content}</p>
            `;

            // Comments
            const commentsList = document.getElementById('comments-list');
            const commentInput = document.getElementById('comment-input');
            const addCommentBtn = document.getElementById('add-comment');

            function renderComments() {
                const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
                commentsList.innerHTML = '';
                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.textContent = comment;
                    commentsList.appendChild(commentElement);
                });
            }

            renderComments();

            addCommentBtn.addEventListener('click', () => {
                const commentText = commentInput.value;
                if (commentText.trim()) {
                    const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
                    comments.push(commentText);
                    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
                    commentInput.value = '';
                    renderComments();
                }
            });
        }
    }
});
