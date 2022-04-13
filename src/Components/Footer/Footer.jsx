import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="bg-dark py-2 text-center ">
      <p className="mb-0 text-light">
        <small>
          {" "}
          Copyright &copy; {year} Ema John | Designg-By :{" "}
          <a
            className="text-decoration-none text-warning"
            href="https://www.facebook.com/Minhajul69"
            target="_blank"
          >
            {" "}
            AKIB
          </a>{" "}
        </small>
      </p>
    </footer>
  );
};

export default Footer;
