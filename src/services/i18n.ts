import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";
export const locales = ["ar", "en"];

export const routing = defineRouting({
    locales, // Define in this line the possible languages for translation
    defaultLocale: "en", // Define in this line the default language to be shown
  });

  export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

  export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
  
    if (!locale || !routing.locales.includes(locale as string)) {
      locale = routing.defaultLocale;
    }
  
    return {
      locale,
      messages: (await import(`../assets/messages/${locale}.json`)).default,
    };
  });