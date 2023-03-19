import React from 'react';
import './Comment.css';

// 1. Load comment data from Comments.JSON (format is JSON)
// 2. Add a form to add a new comment
// 3. Update the Comments.txt file with the new comment
// 4. Display the comments in a list


// code base on 4 steps above

function Comment() {
    // step1
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        fetch('./Comments.json')
            .then(res => res.json())
            .then(data => setComments(data))
    }
        , [])

    // step2q
    const [newComment, setNewComment] = React.useState({
        name: '',
        email: '',
        body: ''
    })

    const handleNewComment = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewComment({ ...newComment, [name]: value })
    }

    // step3
    const handleAddComment = () => {
        fetch('./Comments.json', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
    }

    return (
        <div>
            <h1>Comments</h1>
            <div className="comment-container">
                <div className="comment-form">
                    <h3>Add a comment</h3>
                    <input type="text" name="name" placeholder="Name" onChange={handleNewComment} />
                    <input type="text" name="email" placeholder="Email" onChange={handleNewComment} />
                    <textarea name="body" placeholder="Comment" onChange={handleNewComment} />
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
                <div className="comment-list">
                    <h3>Comments</h3>
                    {
                        comments.map(comment => <div className="comment">
                            <h4>{comment.name}</h4>
                            <p>{comment.body}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>

    )

    


}




export default Comment;