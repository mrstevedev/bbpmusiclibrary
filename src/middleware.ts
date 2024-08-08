import { USER } from "@/constants/index";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { AppConfig } from "./util/AppConfig";

import {
  createMiddleware as createMiddlewares,
  MiddlewareFunctionProps,
} from "next-easy-middlewares";

const accountMiddlewareFn = ({ request }: MiddlewareFunctionProps) => {
  const cookieStore = cookies();
  const user = cookieStore.get(USER.BBP_USER);

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

const i18nMiddlewareFn = ({ request }: MiddlewareFunctionProps) => {
  const handleI18nRouting = createIntlMiddleware({
    locales: AppConfig.locales,
    localePrefix: AppConfig.localePrefix,
    defaultLocale: AppConfig.defaultLocale,
  });
  const response = handleI18nRouting(request);

  return response;
};

const middlewares = {
  "/((?!.+\\.[\\w]+$|_next).*)": i18nMiddlewareFn,
  "/en": i18nMiddlewareFn,
  "/(es|en|de|fr|se|jp)/account": i18nMiddlewareFn,
  "/(es|en|de|fr|se|jp)/account/:path": i18nMiddlewareFn,
  "/(es|en|de|fr|se|jp)/account/:path/:path": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/about": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/login": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/contact": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/checkout": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/forgot-password": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/frequently-asked-questions": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/product/:path": i18nMiddlewareFn,
  "/(es|en|de|fr|se)/account": accountMiddlewareFn,
  "/(es|en|de|fr|se)/account/:path": accountMiddlewareFn,
  "/(es|en|de|fr|se)/account/:path/:path": accountMiddlewareFn,
};

// Create middlewares helper
export const middleware = createMiddlewares(middlewares);
