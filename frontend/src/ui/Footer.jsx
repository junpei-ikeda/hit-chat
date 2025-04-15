import { Link } from 'react-router-dom';
// import '../styles/Footer.css';  // フッターのスタイルをインポート
import footerStyles from '../styles/footer'; // インラインスタイルをインポート


const Footer = () => {
  return (
    <footer style={footerStyles.container}>
      <div style={footerStyles.inner}>
        {/* コピーライト */}
        <p style={footerStyles.text}>
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>

        {/* フッターリンク */}
        <div style={footerStyles.links}>
          <Link to="/privacy" style={footerStyles.link}>
            プライバシーポリシー
          </Link>
          <Link to="/terms" style={footerStyles.link}>
            利用規約
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
