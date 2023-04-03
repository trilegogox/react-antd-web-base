import { FC, useEffect, Suspense } from 'react';
import { Layout } from 'antd';
import { getGlobalState } from '@/utils/common';
//import TagsView from './tagView';
import { Outlet } from 'react-router';
import { setUserItem } from '@/stores/user.store';
import { useDispatch } from 'react-redux';
import Navbar from './navabar';
import Footer from './footer';

const { Content } = Layout;

const LandingPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();

      dispatch(
        setUserItem({
          device,
        }),
      );
    };
  }, [dispatch]);

  return (
    <Layout className="landing-page">
      <Navbar></Navbar>
      <Content className="landing-page-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Footer />
      </Content>
    </Layout>
  );
};

export default LandingPage;
