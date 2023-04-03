import ReactSvg from '@/assets/logo/react.svg';

export default function Footer() {
  return (
    <footer className="bg-sky-800 py-5">
      <div className="container mx-auto px-5">
        <div className="text-center grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-between lg:justify-self-start lg:col-span-3">
            <img className="logo mb-5" src={ReactSvg} />
          </div>

          <div className="grid grid-cols-1 gap-2 py-1 lg:grid-rows-3 text-white text-sm lg:text-left lg:justify-self-start lg:col-span-5 lg:gap-x-24 lg:grid-flow-col-dense">
            <a className="text-white hover:text-green-400" href="#">
              About Us
            </a>
            <a className="hover:text-green-400" href="#">
              Contact
            </a>
            <a className="hover:text-green-400" href="#">
              Blog
            </a>
            <a className="hover:text-green-400" href="#">
              Careers
            </a>
            <a className="hover:text-green-400" href="#">
              Support
            </a>
            <a className="hover:text-green-400" href="#">
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col justify-between items-center lg:items-end lg:justify-self-end lg:col-span-4">
            <button className="bg-primary-lime-green px-7 py-3 rounded-full text-neutral-white text-xs bg-gradient-to-r from-primary-lime-green to-primary-bright-cyan hover:button-brightness mb-7 focus:outline-none focus:ring ring-green-400">
              Request Invite
            </button>

            <p className="text-neutral-grayish-blue text-sm">© Tri Leo. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
