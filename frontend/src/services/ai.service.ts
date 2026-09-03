import axiosClient from "../utils/axiosClient";

export async function chatWithAI(message: string, history: any[]): Promise<{ reply: string }> {
  return await axiosClient.post<any, { reply: string }>("/ai/chat", {
    message,
    history,
  });
}
