import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const toAboutUs = () => {
    navigate("/aboutus");
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-black text-white border-t border-white">
      <div className="space-y-2">
        <div className="font-bold text-lg">ABOUT</div>
        <a href="#" className="block hover:underline">Contact us</a>
        <button onClick={toAboutUs} className="block hover:underline">About us</button>
        <a href="#" className="block hover:underline">Report Infringement</a>
        <a href="#" className="block hover:underline">Privacy Policy</a>
        <a href="#" className="block hover:underline">Terms of Use</a>
        <a href="#" className="block hover:underline">Copyright</a>
      </div>

      <div className="space-y-2">
        <div className="font-bold text-lg">CONNECT US</div>
        <a href="mailto:mail@jobjolt.com" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
            height="30px"
            width="30px"
            alt="Gmail icon"
          />
          <span>mail@jobjolt.com</span>
        </a>
        <a href="https://www.instagram.com/jobjolt" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
            height="30px"
            width="30px"
            alt="Instagram icon"
          />
          <span>@jobjolt</span>
        </a>
        <a href="https://www.facebook.com/jobjolt" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
            height="30px"
            width="30px"
            alt="Facebook icon"
          />
          <span>@jobjolt</span>
        </a>
        <a href="https://twitter.com/jobjolt" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
            height="30px"
            width="30px"
            alt="Twitter icon"
          />
          <span>@jobjolt</span>
        </a>
        <a href="https://www.youtube.com/jobjolt" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
            height="26px"
            width="32px"
            alt="YouTube icon"
          />
          <span>@jobjolt</span>
        </a>
        <a href="https://www.reddit.com/r/jobjolt" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://freelogopng.com/images/all_img/1658834095reddit-logo-png.png"
            height="30px"
            width="30px"
            alt="Reddit icon"
          />
          <span>r/jobjolt</span>
        </a>
        <a href="https://github.com/pranshu0604/jobjolt" className="flex items-center space-x-2 hover:underline">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            height="30px"
            width="30px"
            alt="GitHub icon"
          />
          <span>github.com/pranshu0604/jobjolt</span>
        </a>
      </div>

      <div className="space-y-2">
        <div className="font-bold text-lg">Registered Office Address</div>
        <p>Flat number 301</p>
        <p>Somewhere in Indore</p>
        <p>Pin Code: 452XXX</p>
        <p>Madhya Pradesh, India</p>
      </div>
    </div>
  );
};

export default Footer;
