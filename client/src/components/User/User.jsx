import React from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';
import { useState } from 'react';

const User = ({ person }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));

    const handleFollow = () => {
        following
            ? dispatch(unFollowUser(person._id, user))
            : dispatch(followUser(person._id, user))

        setFollowing((prev) => !prev);
    }

    return (
        <div className="User">
            <div>
                <img
                    src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.jpg"}
                    className="userImage"
                    alt="" />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button
                className={following ? 'button uc-button UnfollowButton' : "button uc-button"}
                onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User