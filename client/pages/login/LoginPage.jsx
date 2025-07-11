import axios from "axios";
import { useState, useEffect } from "react";
import { getApiBase } from "../../utils/getApiBase";
import { useTitle } from "../../context/TitleContext";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const baseURL = getApiBase();
  const [message, setMessage] = useState("");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("로그인");
  }, [setTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const safeBaseURL = baseURL.replace(/\/$/, "");
      const res = await axios.post(`${safeBaseURL}/api/users/login`, form);

      console.log("서버 응답:", res.data);

      if (res.data.error) {
        setMessage(`로그인 실패: ${res.data.data}`);
        return;
      }

      const userInfo = res.data.data.user;
      const token = res.data.data.jwt;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfo));

      setMessage(`로그인 성공! ${userInfo.username}님 환영합니다.`);

      // 필요하면 페이지 이동 처리 가능
      // window.location.href = "/";
    } catch (err) {
      console.error(err);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
