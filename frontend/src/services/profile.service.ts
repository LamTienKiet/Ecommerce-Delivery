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
