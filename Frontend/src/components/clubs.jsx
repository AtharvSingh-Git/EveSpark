import React, {useState} from 'react';
import ClubCard from './clubcard';

function Clubs () {

  return <div className="clubs">
    <ClubCard className="ccard" imageUrl="aiclub (1).jpg"
    description="This club is for artificial intelligence stuff"
    clubname='AI Club'
    />
    <ClubCard className="ccard" imageUrl="android.jpg"
    description="This club is for android stuff"
    clubname='Android Club'
    />
    <ClubCard className="ccard" imageUrl="ecell.jpg"
    description="This club is for business stuff"
    clubname='E-Cell Club'
    />
    <ClubCard className="ccard" imageUrl="google.jpg"
    description="This club is for googling stuff"
    clubname='GDSC'
    />
    <ClubCard className="ccard" imageUrl="insight.png"
    description="This club is for (no idea) stuff"
    clubname='Insight Club'
    />
    </div>
}

export default Clubs;