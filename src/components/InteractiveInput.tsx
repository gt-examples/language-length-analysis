"use client";

import { T, Num } from "gt-next";
import { useState } from "react";
import { getCharCount, getByteCount } from "@/lib/data";

// Pre-computed translations for sample texts
const sampleTranslations: Record<string, Record<string, string>> = {
  "Hello, how are you?": {
    es: "Hola, ¿cómo estás?",
    de: "Hallo, wie geht es Ihnen?",
    ja: "こんにちは、お元気ですか？",
    zh: "你好，你好吗？",
    ar: "مرحبًا، كيف حالك؟",
  },
  "Add to cart": {
    es: "Añadir al carrito",
    de: "In den Warenkorb legen",
    ja: "カートに追加",
    zh: "加入购物车",
    ar: "أضف إلى السلة",
  },
  "Your order has been confirmed and will be shipped within 3 business days.": {
    es: "Su pedido ha sido confirmado y será enviado dentro de 3 días hábiles.",
    de: "Ihre Bestellung wurde bestätigt und wird innerhalb von 3 Werktagen versendet.",
    ja: "ご注文が確認されました。3営業日以内に発送されます。",
    zh: "您的订单已确认，将在3个工作日内发货。",
    ar: "تم تأكيد طلبك وسيتم شحنه خلال 3 أيام عمل.",
  },
  "Loading...": {
    es: "Cargando...",
    de: "Wird geladen...",
    ja: "読み込み中...",
    zh: "加载中...",
    ar: "جارٍ التحميل...",
  },
};

const samples = Object.keys(sampleTranslations);

export default function InteractiveInput() {
  const [text, setText] = useState(samples[0]);
  const translations = sampleTranslations[text] || null;

  return (
    <div className="space-y-4">
      <T>
        <p className="text-sm text-neutral-400">
          Select a sample phrase to see how it translates across languages, with
          character and byte counts for each.
        </p>
      </T>

      <div className="flex flex-wrap gap-2">
        {samples.map((sample) => (
          <button
            key={sample}
            onClick={() => setText(sample)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
              text === sample
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {sample.length > 25 ? sample.slice(0, 25) + "..." : sample}
          </button>
        ))}
      </div>

      {translations && (
        <div className="space-y-2">
          <div className="bg-neutral-950 rounded-lg px-4 py-3 border border-blue-900/50 flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-400 font-mono mr-2">en</span>
              <span className="text-neutral-200">{text}</span>
            </div>
            <span className="text-xs text-neutral-500 font-mono shrink-0 ml-2">
              {getCharCount(text)}c / {getByteCount(text)}b
            </span>
          </div>
          {Object.entries(translations).map(([locale, translated]) => {
            const charRatio = getCharCount(translated) / getCharCount(text);
            const color =
              charRatio > 1.2
                ? "border-red-900/30"
                : charRatio < 0.8
                ? "border-emerald-900/30"
                : "border-neutral-800";
            return (
              <div
                key={locale}
                className={`bg-neutral-950 rounded-lg px-4 py-3 border ${color} flex items-center justify-between`}
              >
                <div>
                  <span className="text-xs text-neutral-500 font-mono mr-2">
                    {locale}
                  </span>
                  <span className="text-neutral-300">{translated}</span>
                </div>
                <span className="text-xs text-neutral-500 font-mono shrink-0 ml-2">
                  {getCharCount(translated)}c / {getByteCount(translated)}b
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
