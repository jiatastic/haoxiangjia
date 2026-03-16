import { notFound } from "next/navigation";
import HomePage from "../page";

const SUPPORTED_LOCALES = new Set(["en", "zh", "ja"]);

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.has(locale)) {
    notFound();
  }

  return <HomePage locale={locale as "en" | "zh" | "ja"} />;
}
