import 'styles/footer/footer.scss';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as DiscordIcon } from 'assets/images/discord.svg';
import { ReactComponent as YoutubeIcon } from 'assets/images/youtube.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/twitter.svg';
import { ReactComponent as OpenSeaIcon } from 'assets/images/opensea.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__info">
          <Logo />
          <p>
            The Nansen NFT indexes present a reeliable way of navigating the NFT
            markets. This update raises the bar for quality financial
            infrastructure that supports the growing depth of the NFT industry
          </p>
        </div>
        <div className="footer__us">
          <div>
            <h4>Contact US</h4>
            <span>Support</span>
            <span>Press</span>
            <span>Give Feedback</span>
          </div>
          <div>
            <h4>About US</h4>
            <span>Pricing</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <span>&copy; CyberDash. All rights reserved</span>

        <YoutubeIcon />
        <TwitterIcon />
        <DiscordIcon />
        <OpenSeaIcon />
      </div>
    </footer>
  );
};

export default Footer;
