import React from 'react';
import './HomePage.scss';
import VideoSearch from "../VideoSearch";
import VideoList from "../VideoList";

const HomePage = () => (
  <React.Fragment>
      <VideoSearch/>
      <VideoList/>
  </React.Fragment>
);

export default HomePage;