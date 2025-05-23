import React, { useState } from "react";
import Header from "../../Components/Navbar/Header/Header";
import ViewMenu from "../../Components/Navbar/ViewMenu/ViewMenu";
import DisplayMenu from "../../Components/Navbar/DisplayMenu/DisplayMenu";
import Review from "../../Components/Navbar/Reviews/Review";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <Header />
      <ViewMenu category={category} setCategory={setCategory} />
      <DisplayMenu category={category} />
      <Review />
      <Footer />
    </>
  );
};

export default Home;
