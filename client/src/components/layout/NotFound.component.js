import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='jumbotron container notfound text-center'>
      <h1 className='display-4'>Sorry ! This page doesn't exists !</h1>
      <p className='lead'>
        You have come to a wrong URL endpoint. There is no webpage to serve you at this
        point.
      </p>
      <hr className='my-4' />
      <p>To go back to the main page, please click the button below.</p>
      <Link className='btn btn-primary btn-lg' to='/' role='button'>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
