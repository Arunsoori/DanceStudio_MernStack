import React from "react";

import UserNAvbar from "../../components/UserNavbar/UserNAvbar";
import UserFooter from "../../components/UserFooter/UserFooter";
import Homepagebanner from "../../components/homePageBannner/Homepagebanner";

function Home() {
  return (
    <div>
      <UserNAvbar />
    <Homepagebanner/>
      <UserFooter />
    </div>
  );
}

export default Home;
