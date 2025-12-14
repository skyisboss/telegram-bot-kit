import type { MyContext } from "../types/bot";

export function encodeCb(
  module: string,
  action: string,
  params: (string | number)[] = []
) {
  return [module, action, ...params].join(":");
}

export function decodeCb(data: string) {
  const [module, action, ...params] = data.split(":");
  return { module: module ?? "", action: action ?? "", params: params ?? [] };
}

/**删除消息 */
export const deleteMessage = async (
  ctx: MyContext,
  chatId: number,
  msgId: number
) => {
  try {
    await ctx.api.deleteMessage(chatId, msgId);
  } catch (error) {
    console.error("failed to delete msg", error);
  }
};
