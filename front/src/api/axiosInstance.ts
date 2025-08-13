// src/api/axiosInstance.ts
import axios from "axios";

const ALLOWED_PARAM_KEYS = new Set([
  "queryType", "query",
  "joinedFrom", "joinedTo",
  "roles", "statuses",
  "page", "size",
]);

const normalizeArrayParam = (v: any) => {
  const arr = Array.isArray(v) ? v
            : typeof v === "string" ? v.split(",")
            : [v];
  // 소문자 + 중복 제거
  return Array.from(new Set(arr
    .filter(x => x != null && String(x).trim() !== "")
    .map(x => String(x).trim().toLowerCase())
  ));
};

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    serialize: (params: Record<string, any>) => {
      const usp = new URLSearchParams();
      const p = params ?? {};
      Object.entries(p).forEach(([k, v]) => {
        // ✅ 허용 키만 전송
        if (!ALLOWED_PARAM_KEYS.has(k)) return;
        if (v == null || v === "") return;

        if (k === "roles" || k === "statuses") {
          normalizeArrayParam(v).forEach(val => usp.append(k, val));
        } else if (Array.isArray(v)) {
          v.forEach(val => usp.append(k, String(val)));
        } else {
          usp.append(k, String(v));
        }
      });
      return usp.toString();
    },
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 디버그: 이 인스턴스가 실제로 쓰이고 있는지 표시
  config.headers["X-Api-Client"] = "admin-users";
  return config;
});

export default axiosInstance;
