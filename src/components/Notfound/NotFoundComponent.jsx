import { Button } from 'antd';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-black-500">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>
      <Button type="primary" className="mt-6" href="/">
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;

