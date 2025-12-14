import { InlineKeyboard } from "grammy";
import type { MyContext, ViewData } from "../types/bot";

export function homeIndexView(ctx: MyContext, params: any): ViewData {
  const kb = new InlineKeyboard();

  kb.text(ctx.t("language"), "lang:setting");

  return {
    content: ctx.t("home-welcome"),
    options: {
      parse_mode: "HTML",
      reply_markup: kb,
    },
  };
}
