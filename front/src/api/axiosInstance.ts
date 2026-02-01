import axios from "axios";


// snake_case를 camelCase로 변환해주는 마법의 함수
const camelize = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(v => camelize(v));
    }
    if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => {
                const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
                result[camelKey] = camelize(obj[key]);
                return result;
            },
            {} as { [key: string]: any }
        );
    }
    return obj;
};

const ALLOWED_PARAM_KEYS = new Set([
  "queryType", "query",
  "joinedFrom", "joinedTo",
  "roles", "statuses",
  "page", "size",
  "status","productName","startDate","endDate",
  "type","value", 
  "keyword", "createdFrom", "createdTo", 
  "targetTypes",
  "actions",
  "roomId", "commRoomId", "date",
  "swLat", "swLng", "neLat", "neLng",
  "peerId","postId","beforeId","limit","lastReadMessageId",
  "latitude","longitude","address"
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
        // 허용 키만 전송
        if (!ALLOWED_PARAM_KEYS.has(k)) return;
        if (v == null || v === "") return;

        // ★ 배열 파라미터는 여기서 통일 처리
        if (k === "roles" || k === "statuses" || k === "targetTypes" || k === "actions") {
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

// ▼▼▼▼▼ 바로 이 부분이 '자동 번역기'의 핵심입니다! ▼▼▼▼▼
// 응답(response)을 가로채서 처리하는 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        // 응답 데이터가 JSON 형태일 경우, camelize 함수를 적용하여
        // 모든 snake_case 키를 camelCase로 자동 변환합니다.
        if (response.data && response.headers['content-type']?.includes('application/json')) {
            response.data = camelize(response.data);
        }
        return response;
    },
    (error) => {
        // 에러가 발생했을 때도 동일한 로직을 적용할 수 있습니다 (선택 사항)
        if (error.response && error.response.data) {
            error.response.data = camelize(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
