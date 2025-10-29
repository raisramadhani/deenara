import { useState } from 'react';

const UserAvatar = ({ user, size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // Generate fallback avatar URL using UI Avatars service
  const getFallbackAvatar = () => {
    const name = user?.name || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4F46E5&color=fff&size=128`;
  };

  // If no avatar or image failed to load, show initial-based avatar
  if (!user?.avatar || imageError) {
    return (
      <div 
        className={`${sizeClass} rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-primary ${className}`}
        title={user?.name}
      >
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </div>
    );
  }

  return (
    <img
      src={user.avatar}
      alt={user?.name || 'User'}
      className={`${sizeClass} rounded-full object-cover border-2 border-primary ${className}`}
      onError={(e) => {
        console.error('Avatar image failed to load:', user.avatar);
        setImageError(true);
        // Try fallback service
        if (!e.target.src.includes('ui-avatars.com')) {
          e.target.src = getFallbackAvatar();
        }
      }}
      onLoad={() => {
        console.log('Avatar loaded successfully:', user.avatar);
      }}
      title={user?.name}
    />
  );
};

export default UserAvatar;
