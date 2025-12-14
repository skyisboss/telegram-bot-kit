export type SessionData = {
  locale: string;
  page?: Page;
  params?: [];
  /** 场景 */
  scene?: {
    id: string | number;
    callback: Function;
  };
  [k: string]: any;
};

export type Page = "home" | "user_list" | "user_view" | "user_edit";
