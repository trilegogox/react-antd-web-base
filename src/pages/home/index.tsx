import { Header } from 'antd/es/layout/layout';
import { FC } from 'react';
import Blog from './blog';
import Hero from './hero';
import Partner from './partner';

const Home: FC = () => {
  return (
    <>
      <Header />
      <div className="container px-5 mx-auto relative overflow-hidden">
        <div className="hidden lg:block w-full h-full absolute">
          <div className="bg-image-mockups absolute z-20 w-full h-full bg-no-repeat bg-auto bg-right-top -right-72 xl:-right-28"></div>
        </div>
        <Hero />
        <Partner />
        <Blog />
      </div>
    </>
  );
};

export default Home;
