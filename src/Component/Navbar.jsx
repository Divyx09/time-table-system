import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-light bg-light d-flex justify-content-center'>
        <a className='navbar-brand' href='/'>
          <img
            src='/time.png'
            width='30'
            height='30'
            className='d-inline-block align-top mx-2'
            alt=''
          />
          Time-Table-System
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
