import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

// export const openai = new OpenAI({apiKey:OPENAI_KEY, dangerouslyAllowBrowser: true});
export const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
});


