import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment variables');
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async chat(message: string, history: any[] = []) {
    try {
      const systemInstruction = `Bạn là La TiuKy Assistant, một trợ lý ảo của nhà hàng La TiuKy - một nhà hàng fine-dining sang trọng.
Nhiệm vụ của bạn là trả lời các câu hỏi của khách hàng một cách lịch sự, thân thiện và chuyên nghiệp.
Thông tin về nhà hàng:
- Mở cửa: Thứ 2 - Thứ 6 (17:00 - 23:00) và cuối tuần (11:00 - 14:00 | 17:00 - 23:30).
- Địa chỉ: 123 Đường Tinh Hoa, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh.
- Món ăn đặc trưng (Signature): Bò Wagyu A5 ủ tuyết, Panna Cotta dâu tây tươi, Cá Hồi áp chảo.
- Mức giá: Dao động từ 150.000đ đến 3.000.000đ.
- Đặt bàn: Khách hàng vui lòng gọi Hotline 1900 xxxx hoặc liên hệ Fanpage.
Nếu khách hỏi những câu không liên quan đến nhà hàng hoặc ẩm thực, hãy lịch sự từ chối và hướng sự chú ý về nhà hàng. Tên của bạn là La TiuKy Assistant. Trả lời ngắn gọn, tối đa 3-4 câu.`;

      // Filter out 'welcome' message or predefined messages that shouldn't go to AI history
      const filteredHistory = history.filter(msg => msg.id !== 'welcome');

      // Format history for @google/genai format
      const formattedHistory = filteredHistory.map((msg) => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      const chatSession = this.ai.chats.create({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: formattedHistory,
      });

      const response = await chatSession.sendMessage({ message });

      return {
        reply: response.text,
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException('Xin lỗi, hiện tại hệ thống Trợ lý ảo đang bảo trì. Bạn vui lòng liên hệ Hotline nhé.');
    }
  }
}
