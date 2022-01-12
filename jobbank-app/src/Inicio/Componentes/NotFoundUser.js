import React from 'react';
import LogoutButton from './LogoutButton';

function NotFoundUser() {
  return (
    <div>
      <LogoutButton/>
      <h2>
        User not found,
      </h2>
      <h2>
        Please get in touch with site administrator.
      </h2>
    </div>
  );
}

export default NotFoundUser;