import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-primary text-center p-4 text-light mt-auto">
      &copy; {year} Tech Grab, LLC. All rights reserved.
    </footer>
  );
};

export default Footer;
