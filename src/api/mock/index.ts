import { http } from "@/utils/http";

type ListResult = {
  code: number;
  message: string;
  list: Array<any>;
};

export function getListApi(params?: object): Promise<ListResult> {
  return http.request({
    url: "/article/list",
    method: "get",
    params
  });
}

export function uploadFile(formData: FormData): Promise<ListResult> {
  return http.request({
    url: "/common/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  });
}

export function push(data): Promise<ListResult> {
  return http.request({
    url: "/article/add",
    method: "post",
    data
  });
}

export function getListApiError(data?: object): Promise<ListResult> {
  return http.request({
    url: "/list/error",
    method: "post",
    data
  });
}
