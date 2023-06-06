import React from 'react';
import { useNavigate } from "react-router-dom";
import Community  from './community';
import communityIcon from "../../assets/community_icon.png";
import searchIcon from "../../assets/search_icon.png";

const ViewCommunities = () => {
  const navigate = useNavigate();

  return (
    <div className='view-communities'>

        <div style={{ display: 'flex' }}>
            
            <div className='search-bar'>
                <img src={searchIcon} />
                <input type='text' placeholder='Search...' />
            </div>

            <button className='button'>Create new community</button>

        </div>
                

        <div className='list-communities'>

            <p className='heading-small' style={{ textAlign:'left' }}>Communities</p>
            <br />

            <div className='list-communities-container'>

                <Community
                    background="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Title of the Sample Community with 2 lines"}
                    communityDescription = 
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
                    when an unknown printer took a galley of type and scrambled it to make a type \
                    specimen book. It has survived not only five centuries, but also the leap into \
                    electronic typesetting, remaining essentially unchanged. It was popularised in \
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\
                     and more recently with desktop publishing software like Aldus PageMaker \
                     including versions of Lorem Ipsum."}

                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

                <Community
                    background="linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Title of the Sample Community with 2 lines"}
                    communityDescription = 
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
                    when an unknown printer took a galley of type and scrambled it to make a type \
                    specimen book. It has survived not only five centuries, but also the leap into \
                    electronic typesetting, remaining essentially unchanged. It was popularised in \
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\
                     and more recently with desktop publishing software like Aldus PageMaker \
                     including versions of Lorem Ipsum."}

                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

                <Community
                    background="linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Community 3"}
                    communityDescription={"Description 3"}
                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

                <Community
                    background="linear-gradient(to top, #00c6fb 0%, #005bea 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Community 3"}
                    communityDescription={"Description 3"}
                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

                <Community
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Community 3"}
                    communityDescription={"Description 3"}
                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

<Community
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Community 3"}
                    communityDescription={"Description 3"}
                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

<Community
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Community 3"}
                    communityDescription={"Description 3"}
                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

<Community
                    background="linear-gradient( 135deg, #70F570 10%, #49C628 100%)"
                    communityIcon={communityIcon}
                    communityTitle={"Community 3"}
                    communityDescription={"Description 3"}
                    communityPopulation={"450"}
                    communityLocation={"Bangalore"}
                />

            </div>

        </div>
    </div>
  );
};

export default ViewCommunities;
