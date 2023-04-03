import { useState } from 'react';
import { Menu } from 'react-feather';
import ReactSvg from '@/assets/logo/react.svg';
import { useSelector } from 'react-redux';
import { Button, Drawer } from 'antd';

const navItems = ['Home', 'About', 'Contact', 'Blog', 'Careers'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { device } = useSelector(state => state.user);
  const [open, setOpenDrawer] = useState(false);

  const showDrawer = (state: boolean) => {
    setOpenDrawer(state);
  };

  return (
    <>
      <div className="fixed z-50 top-0 w-full bg-white">
        <nav className="container px-5 mx-auto flex justify-between items-center z-20">
          <div className="my-4 md:my-5">
            <img src={ReactSvg} />
          </div>

          <div className="hidden lg:block text-sm text-neutral-grayish-blue">
            {navItems.map(navItem => (
              <a className="mx-3 py-5 hover:gradient-border-bottom" href="#">
                {navItem}
              </a>
            ))}
          </div>

          <Button className="hidden lg:block rounded-full">Login</Button>

          <Menu onClick={() => setOpenDrawer(!open)} className="md:hidden focus:outline-none" />
          {/* <img className={`${isOpen && 'hidden'}`} src="/icons/icon-hamburger.svg" alt="" />
            <img className={isOpen ? 'block' : 'hidden'} src="/icons/icon-close.svg" alt="" /> */}
        </nav>
      </div>

      <Drawer
        placement={'right'}
        headerStyle={{ textAlign: 'center' }}
        width={'100%'}
        onClose={() => showDrawer(false)}
        open={open}
      >
        {navItems.map(navItem => (
          <a key={navItem} className="py-2" href="#">
            {navItem}
          </a>
        ))}
      </Drawer>
    </>
  );
}
