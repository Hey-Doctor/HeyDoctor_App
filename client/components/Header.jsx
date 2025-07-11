import { Link } from "react-router-dom";
import "./Header.css"; // (선택: 스타일 분리할 경우)

function Header() {
  return (
    <header
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem",
      }}
    >
      <button>
        <Link to="/register">회원가입</Link>
      </button>
      <button>
        <Link to="/login">로그인</Link>
      </button>
      <button>
        <Link to="/info">마이페이지</Link>
      </button>
    </header>
  );
}

export default Header;
