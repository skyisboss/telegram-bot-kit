import { InlineKeyboard } from "grammy";
import type { MyContext, ViewData } from "../types/bot";

export function langSettingView(ctx: MyContext, params: any): ViewData {
  const kb = new InlineKeyboard();

  const icon = ["", "✅ "];
  if (ctx.session.__language_code == "zh") {
    icon[0] = "✅ ";
    icon[1] = "";
  }

  kb.text(icon[0] + ctx.t("lang-en"), "lang:setting:en").row();
  kb.text(icon[1] + ctx.t("lang-zh"), "lang:setting:zh").row();
  kb.text(ctx.t("goback"), "home:index");

  return {
    content: ctx.t("lang-select", { activeLang: ctx.session.__language_code }),
    options: {
      parse_mode: "HTML",
      reply_markup: kb,
    },
  };
}
