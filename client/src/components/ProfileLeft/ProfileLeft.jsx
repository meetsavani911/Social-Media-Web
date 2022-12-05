import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import './ProfileLeft.css'
import InfoCard from '../InfoCard/InfoCard'

const ProfileLeft = () => {
  return (
        <div className="ProfileSide">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    )
}

export default ProfileLeft