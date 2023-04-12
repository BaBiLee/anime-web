import React, { useEffect } from 'react';
import './Comment.css';
import Rating from '../Rating/Rating.js';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../LoadingError/Loading";
import {
    commentListAction,
} from "../../redux/Actions/CommentActions";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import moment from "moment";


const Comment = (props) => {
// function Comment(props) {
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const dispatch = useDispatch();
    const commentList = useSelector((state) => state.commentList);
    const { loading, error, comments } = commentList;
    useEffect(() => {
        dispatch(commentListAction(props.anime_id));
    }, [dispatch, props.anime_id]);

    // const userLogin = useSelector((state) => state.userLogin);
    // set userLogin random to test
    const userLogin = {
        userInfo: {
            name: "test",
            email: "test",
        }
    }
    const { userInfo } = userLogin;
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(
        //     createReview(match.params.id, {
        //         rating,
        //         comment,
        //     })
        // );
    };

    return (
        <div>
            <div className='row my-5'>
                <div className='col-md-6'>
                    <h6 className='mb-3'>COMMENTS</h6>
                    {comments.length === 0 && (
                        <Message variant={'alert-info mt-3'}>No Reviews</Message>
                    )}
                    {/* check if comments.data != null */}
                    {comments.data && comments.data.map((comment) => (
                        <div key={comment._id}
                            className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                            <strong>{comment.user_name}</strong>
                            <Rating value={comment.rating} />
                            <span>{moment(comment.createdAt).calendar()}</span>
                            <div className="alert alert-info mt-3">
                                {comment.comment}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-6">
                    <h6>WRITE A CUSTOMER COMMENTS</h6>
                    <div className="my-4">
                        {/* {loadingCreateReview && <Loading />}
                        {errorCreateReview && (
                            <Message variant="alert-danger">
                                {errorCreateReview}
                            </Message>
                        )} */}
                    </div>
                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className="my-4">
                                <strong>Rating</strong>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                >
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="my-4">
                                <strong>Comment</strong>
                                <textarea
                                    row="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                ></textarea>
                            </div>
                            <div className="my-3">
                                <button
                                    // disabled={loadingCreateReview}
                                    className="col-12 bg-black border-0 p-3 rounded text-white"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="my-3">
                            <Message variant={"alert-warning"}>
                                Please{" "}
                                <Link to="/login">
                                    " <strong>Login</strong> "
                                </Link>{" "}
                                to write a comment{" "}
                            </Message>
                        </div>
                    )}
                </div>
            </div>
        </div>
        )

}




export default Comment;