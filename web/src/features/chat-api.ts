import axios from 'axios';

const webApiRootUrl = process.env.NEXT_PUBLIC_WEB_API_ROOT_URL;

export async function loadLlmModels(): Promise<any[]> {
  const modelsResponse = await axios.get(`${webApiRootUrl}/models`);
  return modelsResponse.data;
}

export async function generateChatMessage(message: string): Promise<any> {
  const chatResponse = await axios.post(`${webApiRootUrl}/chat`, { message: message });
  return chatResponse.data;
}
