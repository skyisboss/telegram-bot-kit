import { Bot, session } from "grammy";
import { I18n } from "@grammyjs/i18n";
import { routes } from "./router";
import type { SessionData } from "./types/session";
import { decodeCb } from "./utils/";
import type { MyContext } from "./types/bot";

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN ?? "");

bot.use(
  session({
    // 默认 session key 是什么? 默认策略（官方）：sessionKey = `${ctx.chat.id}`
    getSessionKey: (ctx) => {
      if (!ctx.from || !ctx.chat) return undefined;
      return `${ctx.chat.id}:${ctx.from.id}`;
    },
    initial: (): SessionData => ({
      locale: "en",
      page: undefined,
      params: [],
      __language_code: "en",
    }),
  }),
  new I18n({
    directory: `locales`, // Load all translation files from locales/.
    useSession: true,
  })
);

// 处理 /start 命令
bot.command("start", routes.home.index);

// 处理普通消息
bot.on("message:text", async (ctx) => {
  const { id, callback } = ctx.session.scene ?? {};
  if (id) {
    await callback?.(ctx);
  }
});

// 处理 callback_query 路由分发
bot.on("callback_query:data", async (ctx) => {
  const { module, action, params } = decodeCb(ctx.callbackQuery.data);

  const handler = routes?.[module]?.[action];
  if (handler) {
    //   await renderWithLock(ctx, async () => await handler(ctx, params ?? []));
    const done = await handler(ctx, params);
    if (done != undefined) {
      return;
    }
  }
  await ctx.answerCallbackQuery?.();
});

// const info = await bot.api.getMe();
// console.log(`🤖 ${info.username}`);

console.log("✅ bot is runing...");
bot.start().catch(console.error);
