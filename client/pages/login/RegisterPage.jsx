import axios from "axios";
import { useState,useEffect } from "react";
import { getApiBase } from "../../utils/getApiBase";
import { useTitle } from "../../context/TitleContext";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    intro: "",
  });
  const baseURL = getApiBase();
  const [message, setMessage] = useState("");
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("회원가입");
  }, [setTitle]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setMessage("아이디, 이메일, 비밀번호는 필수 입력 사항입니다.");
      return;
    }

    const submitForm = {
      ...form,
      intro: form.intro.trim() === "" ? "안녕하세요" : form.intro,
    };

    try {
      const safeBaseURL = baseURL.replace(/\/$/, "");
      const res = await axios.post(`${safeBaseURL}/api/users/register`, submitForm);

      console.log("서버 응답 데이터:", res.data);

      // 서버 응답: { error: boolean, data: ... }
      if (res.data.error) {
        setMessage(`회원가입 실패: ${res.data.data}`);
        return;
      }

      // 성공 시 처리: data는 User 객체
      setMessage(`회원가입 성공! 사용자명: ${res.data.data.username}`);
      setForm({ username: "", email: "", password: "", intro: "" });
    } catch (err) {
      console.error(err);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
        />
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
        <input
          name="intro"
          placeholder="소개"
          value={form.intro}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default RegisterPage;
