import React from 'react';
import { Navbar } from '../components_en/Navigations';
import { getUserFromLocalStorage } from "../utils/localStorage";

const AboutPage = () => {
  const user = getUserFromLocalStorage();

  return (
    <main>
      <Navbar></Navbar>
    </main>
  );
};

export default AboutPage;
