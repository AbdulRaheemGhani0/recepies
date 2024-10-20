import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ProfileSection = () => {
  const { user } = useContext(AuthContext);

  if (!user.isLogin) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p className="text-lg">You need to log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <Card
        className="shadow-lg"
        style={{ width: 300 }}
        cover={
          <img
            alt="profile"
            src={
              user.userInfo.photoUrl ||
              'https://via.placeholder.com/300?text=No+Profile+Picture'
            }
          />
        }
      >
        <Card.Meta
          avatar={
            <Avatar 
              icon={<UserOutlined />} 
              src={user.userInfo.photoUrl}
            />
          }
          title={user.userInfo.name || 'Anonymous'}
          description={user.userInfo.email || 'No email provided'}
        />
      </Card>
    </div>
  );
};

export default ProfileSection;
