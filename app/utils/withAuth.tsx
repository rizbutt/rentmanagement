// utils/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get('/api/auth/check', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        } catch (error) {
          router.push('/components/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
