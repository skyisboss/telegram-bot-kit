import {
  Bot,
  Context,
  InlineKeyboard,
  session,
  type SessionFlavor,
} from "grammy";
import { I18n, type I18nFlavor } from "@grammyjs/i18n";
import type { SessionData } from "./session";
import type { ParseMode } from "grammy/types";

// Flavor the context type to include sessions.
export type MyContext = Context & I18nFlavor & SessionFlavor<SessionData>;

/** 返回视图数据 */
export type ViewData = {
  content: string;
  options?: {
    parse_mode: ParseMode;
    reply_markup: InlineKeyboard;
  };
};

/** 路由 */
// export type Route = Record<
//   string,
//   Record<string, (ctx: MyContext, params?: string[]) => Promise<void>>
// >;
export type Route = { [k: string]: any };
