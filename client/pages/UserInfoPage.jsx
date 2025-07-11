import React, { useEffect, useState } from "react";

function UserInfoPage() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) {
      setMessage("데이터가 없습니다. 로그인을 하여 데이터 열람할 수 있습니다.");
      setToken("");
      setUser(null);
    } else {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setMessage("");
    }
  }, []);

  return (
    <div>
      <h2>저장된 로그인 정보</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {!message && (
        <>
          <div>
            <strong>JWT 토큰:</strong>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{token}</pre>
          </div>
          <div>
            <strong>유저 정보:</strong>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default UserInfoPage;
