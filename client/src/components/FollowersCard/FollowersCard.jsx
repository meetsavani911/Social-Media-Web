import React from 'react'
import './FollowersCard.css'
import User from '../User/User'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllUser } from '../../Api/UserRequest'

const FollowersCard = () => {

    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fatchPersons = async () => {
            const { data } = await getAllUser();
            setPersons(data);
        };
        fatchPersons();
    }, []);

    return (
        <div className="FollowersCard">
            <h3>People You May Know</h3>
            {persons.map((person, id) => {
                if (person._id !== user._id) {
                    return (
                        <User person={person} id={id} />
                    )
                }
            })}
        </div>
    )
}

export default FollowersCard