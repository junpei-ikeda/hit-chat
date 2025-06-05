import { Link } from 'react-router-dom';
// import * as styles from '../styles/header.module.css';  // named importに修正
import headerStyles from '../styles/header'; // インラインスタイルをインポート

const Header = () => {
  return (
    <header style={headerStyles.container}>
      {/* ロゴ */}
      <div style={headerStyles.logo}>
        <Link to="/" style={headerStyles.logoLink}>社内チャットシステム</Link>
      </div>

      {/* ナビゲーション */}
      <nav style={headerStyles.nav}>
        <Link to="/" style={headerStyles.navLink}>
          ホーム
        </Link>
        <Link to="/timecard" style={headerStyles.navLink}>
          タイムカード
        </Link>
        <Link to="/attendances" style={headerStyles.navLink}>
          勤怠管理
        </Link>
      </nav>
    </header>
  );
};

export default Header;
