import { Context, Hono } from 'hono';
import { env } from 'hono/adapter';
import _ from 'lodash';
import Groq from 'groq-sdk';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

function initGroqInstance(context: Context): Groq {
  const { GROQ_API_KEY } = env(context);
  return new Groq({ apiKey: GROQ_API_KEY as string });
}

app.get('/models', async (c: Context) => {
  const groq = initGroqInstance(c);
  const models = await groq.models.list();
  return c.json(_.sortBy(models.data, (model) => model.created));
});

app.get('/chat', async (c) => {
  const groq = initGroqInstance(c);
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'ずんだもんについて日本語でこたえて',
      },
    ],
    model: 'llama-3.1-70b-versatile',
  });
  return c.json(chatCompletion);
});

export default app;
