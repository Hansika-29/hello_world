
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'login.html'; // Redirect to login if not logged in
}

let posts = JSON.parse(localStorage.getItem('posts')) || {};

// Initialize posts for the logged-in user if not present
if (!posts[user.username]) {
    posts[user.username] = [];
}

// Function to display posts on the main page
function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = posts[user.username].map((post, index) => `
        <article>
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <button onclick="editPost('${user.username}', ${index})">Edit</button>
            <button onclick="deletePost('${user.username}', ${index})">Delete</button>
            <a href="post.html?id=${user.username}&postId=${index}">Read more</a>
        </article>
    `).join('');
}

// Other functions (createPost, deletePost, etc.) remain unchanged...

// Display post details on the post page
if (window.location.pathname.endsWith('post.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    const postDetail = document.getElementById('post-detail');

    if (posts[user.username][postId]) {
        postDetail.innerHTML = `
            <article>
                <h2>${posts[user.username][postId].title}</h2>
                <p>${posts[user.username][postId].content}</p>
            </article>
        `;
    } else {
        postDetail.innerHTML = `<p>Post not found!</p>`;
    }
}

// Call displayPosts on index.html
if (window.location.pathname.endsWith('index.html')) {
    displayPosts();
}
