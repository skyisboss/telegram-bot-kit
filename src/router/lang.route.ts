import type { MyContext } from "../types/bot";
import { renderView } from "../utils/render";
import { langSettingView } from "../views/lang.view";

export const langRoutes = {
  setting: async (ctx: MyContext, params: string[]) => {
    if (params.length > 0 && ctx.session.__language_code != params[0]) {
      ctx.session.__language_code = params[0];
      ctx.i18n.useLocale(ctx.session.__language_code);
    }

    const view = langSettingView(ctx, params);
    await renderView(ctx, view);
  },
};
