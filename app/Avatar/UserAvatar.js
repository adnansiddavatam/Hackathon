import React from 'react';
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';

const UserAvatar = ({ seed }) => {
  const svgAvatar = createAvatar(botttsNeutral, {
    seed: seed
  });

  return <div dangerouslySetInnerHTML={{ __html: svgAvatar }} style={{ width: '50px', height: '50px' }} />;
};

export default UserAvatar;