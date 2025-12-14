import crypto from "crypto";
import type { InlineKeyboard } from "grammy";
import type { MyContext, ViewData } from "../types/bot";

export function hashKeyboard(locale: string, kb: InlineKeyboard) {
  return crypto
    .createHash("md5")
    .update(JSON.stringify([locale, kb.inline_keyboard]))
    .digest("hex");
}

export interface ViewSnapshot {
  content: string;
  keyboard: string; // keyboard hash
}

/**
 * 渲染函数（统一入口）render diff（减少 editMessageText）
 *
 * 使用方式,在路由文件里使用
 * await renderView(ctx, userListView(users))
 */
export async function renderView(ctx: MyContext, view: ViewData) {
  const locale = ctx.session.__language_code;
  const snapshot: ViewSnapshot = {
    content: view.content,
    keyboard: view?.options?.reply_markup
      ? hashKeyboard(locale, view.options.reply_markup)
      : "",
  };

  const prev = ctx.session.__view;

  // 🔥 diff
  if (
    prev &&
    prev.content === snapshot.content &&
    prev.keyboard === snapshot.keyboard
  ) {
    // UI 没变，什么都不做
    return;
  }

  // 保存快照
  ctx.session.__view = snapshot;

  // 🔁 真正更新 UI
  await renderWithLock(ctx, async () => {
    if (ctx.callbackQuery?.data) {
      await ctx.editMessageText(view.content, view.options).catch((e) => {
        console.error(e.message);
      });
    } else {
      await ctx.reply(view.content, view.options).catch((e) => {
        console.error(e.message);
      });
    }
  });
}

// 防重复点击 & 并发 callback 锁
export async function renderWithLock(ctx: MyContext, fn: Function) {
  if (ctx.session.__lock) {
    await ctx.answerCallbackQuery?.();
    return true;
  }

  ctx.session.__lock = true;
  try {
    await fn();
  } finally {
    ctx.session.__lock = false;
  }
}

// 按 message_id 锁
// const locks = new Set();
// async function withMessageLock(ctx: MyContext, fn: Function) {
//   const key = `msg_${ctx.callbackQuery.message.message_id}`;

//   if (locks.has(key)) {
//     return ctx.answerCallbackQuery("Busy");
//   }

//   locks.add(key);
//   try {
//     await fn();
//   } finally {
//     locks.delete(key);
//   }
// }
