import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from 'hono/adapter';
import _ from 'lodash';
import Groq from 'groq-sdk';

const app = new Hono();
app.use('*', cors());

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

app.post('/chat', async (c) => {
  const bodyText = await c.req.text();
  if (bodyText) {
    let bodyJson;
    try {
      bodyJson = JSON.parse(bodyText);
    } catch (e) {}
    if (!bodyJson) {
      return c.status(200);
    }
    const groq = initGroqInstance(c);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: bodyJson.message,
        },
      ],
      model: 'llama-3.1-70b-versatile',
    });
    return c.json(chatCompletion);
  }
  return c.status(200);
});

export default app;
