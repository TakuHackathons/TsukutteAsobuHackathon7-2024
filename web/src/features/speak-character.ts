import axios from 'axios';
import { EmotionType } from './vrmViewer/model';
import { Viewer } from './vrmViewer/viewer';

const voiceVoxRootUrl = process.env.NEXT_PUBLIC_VOICEVOX_API_ROOT_URL;

export async function loadSpeackers(): Promise<any[]> {
  const speackersResponse = await axios.get(`${voiceVoxRootUrl}/speakers`);
  return speackersResponse.data;
}

export async function speakCharacter(
  speackerId: number,
  speakText: string,
  viewer: Viewer,
  expression: EmotionType = 'neutral',
): Promise<void> {
  const responseAudio = await axios.post(`${voiceVoxRootUrl}/audio_query`, null, {
    params: {
      text: speakText,
      speaker: speackerId,
    },
  });
  const responseSynthesis = await axios.post(`${voiceVoxRootUrl}/synthesis`, responseAudio.data, {
    responseType: 'arraybuffer',
    params: {
      speaker: speackerId,
    },
  });
  return viewer.model?.speak(responseSynthesis.data, expression);
}
