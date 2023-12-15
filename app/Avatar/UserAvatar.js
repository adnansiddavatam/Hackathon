// UserAvatar.js
import Image from 'next/image';

const UserAvatar = ({ username }) => {
  const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${encodeURIComponent(username)}.svg`;

  return (
    <Image
      src={avatarUrl}
      alt={`Avatar for ${username}`}
      width={50}  // Adjust the size as needed
      height={50}  // Adjust the size as needed
    />
  );
};

export default UserAvatar;
