export const getApiBase = () => {
  const VITE_SPRING_URL = import.meta.env.VITE_SPRING_URL;
  const DEFAULT_URL = "http://localhost:8080";

  try {
    if (VITE_SPRING_URL) {
      // URL 형식 검증 (간단)
      const url = new URL(VITE_SPRING_URL);
      return url.toString();
    }
  } catch (error) {
    console.error("VITE_SPRING_URL 오류 발생:", error);
  }

  return DEFAULT_URL;
};
