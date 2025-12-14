import type { MyContext } from "../types/bot";
import { renderView } from "../utils/render";
import { homeIndexView } from "../views/home.view";

export const homeRoutes = {
  index: async (ctx: MyContext, params?: string[]) => {
    ctx.session.__view = null;

    const view = homeIndexView(ctx, params);
    await renderView(ctx, view);
  },
};
