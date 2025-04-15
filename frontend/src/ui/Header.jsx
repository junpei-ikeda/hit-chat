import { Link } from 'react-router-dom';
// import * as styles from '../styles/header.module.css';  // named importに修正
import headerStyles from '../styles/header'; // インラインスタイルをインポート

// const Header = () => {
//   return (
//     <header className={styles.header}>
//       {/* ロゴ */}
//       <div className={styles.logo}>
//         <Link to="/">MyApp</Link>
//       </div>
//
//       {/* ナビゲーション */}
//       <nav className={styles.navigation}>
//         <Link to="/" className={styles.navLink}>ホーム</Link>
//         <Link to="/about" className={styles.navLink}>このサイトについて</Link>
//         <Link to="/contact" className={styles.navLink}>お問い合わせ</Link>
//       </nav>
//     </header>
//   );
// };
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
        <Link to="/about" style={headerStyles.navLink}>
          このサイトについて
        </Link>
        <Link to="/contact" style={headerStyles.navLink}>
          お問い合わせ
        </Link>
      </nav>
    </header>
  );
};

export default Header;
