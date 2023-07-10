import React from "react";

import UserNAvbar from "../../components/UserNavbar/UserNAvbar";
import UserFooter from "../../components/UserFooter/UserFooter";
import Homepagebanner from "../../components/homePageBannner/Homepagebanner";
import Event from "../../components/Event/Event";

function Home() {
  return (
    <div >
      <UserNAvbar />
    <Homepagebanner/>
    <Event/>
      <UserFooter />
    </div>
  );
}

export default Home;
