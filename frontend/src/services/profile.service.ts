import axiosClient from "../utils/axiosClient";

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  avatar?: string;
  birthday?: string;
  gender?: string;
  address?: string;
}

export async function updateProfileApi(data: UpdateProfileRequest) {
  return await axiosClient.put("/profile", data);
}

export async function getProfileApi() {
  return await axiosClient.get("/profile");
}

export async function uploadAvatarApi(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  return await axiosClient.post("/user/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function updateAvatarApi(imageUrl: string) {
  return await axiosClient.put("/profile/avatar", { imageUrl });
}
