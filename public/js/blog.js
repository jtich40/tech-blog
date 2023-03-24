const updatePostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    if (title && content) {
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/dashboard/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

const addCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    if (comment) {
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

const updateCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    if (comment) {
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

const deleteCommentHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/dashboard/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#update-post').addEventListener('click', updatePostHandler);
document.querySelector('#delete-post').addEventListener('click', deletePostHandler);
document.querySelector('#add-comment').addEventListener('click', addCommentHandler);
document.querySelector('#update-comment').addEventListener('click', updateCommentHandler);
document.querySelector('#delete-comment').addEventListener('click', deleteCommentHandler);