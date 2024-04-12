import React from 'react';

const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-800 text-white">
      <div className="space-y-2">
        <div className="font-bold text-lg">ABOUT</div>
        <div>Contact us</div>
        <div>About us</div>
        <div>Report Infringement</div>
        <div>Privacy Policy</div>
        <div>Terms of Use</div>
        <div>Copyright</div>
      </div>

      <div className="space-y-2">
        <div className="font-bold text-lg">CONNECT US</div>
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
            height="30px"
            width="30px"
            alt="Gmail icon"
          />
          <span>mail@jobjolt.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
            height="30px"
            width="30px"
            alt="Instagram icon"
          />
          <span>@jobjolt</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
            height="30px"
            width="30px"
            alt="Facebook icon"
          />
          <span>@jobjolt</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
            height="30px"
            width="30px"
            alt="Twitter icon"
          />
          <span>@jobjolt</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
            height="26px"
            width="32px"
            alt="YouTube icon"
          />
          <span>@jobjolt</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://freelogopng.com/images/all_img/1658834095reddit-logo-png.png"
            height="30px"
            width="30px"
            alt="Reddit icon"
          />
          <span>r/jobjolt</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            height="30px"
            width="30px"
            alt="GitHub icon"
          />
          <span>github.com/pranshu0604/jobjolt</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-bold text-lg">Registered Office Address</div>
        <div>Flat Number 301, Madhu Chandan Apartments</div>
        <div>Vallabh Nagar, Indore</div>
        <div>Pin Code: 452003</div>
        <div>Madhya Pradesh, India</div>
      </div>
    </div>
  );
};

export default Footer;

