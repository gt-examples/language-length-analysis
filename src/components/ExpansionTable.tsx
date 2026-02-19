"use client";

import { T, Num } from "gt-next";
import {
  translationData,
  getCharCount,
  getByteCount,
  getExpansionRatio,
} from "@/lib/data";

export default function ExpansionTable() {
  const locales = ["es", "de", "ja", "zh", "ar"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-800">
            <T>
              <th className="text-left py-2 px-3 text-neutral-400 font-medium">
                Text
              </th>
              <th className="text-center py-2 px-1 text-neutral-400 font-medium">
                en
              </th>
            </T>
            {locales.map((l) => (
              <th
                key={l}
                className="text-center py-2 px-1 text-neutral-400 font-medium"
              >
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {translationData.slice(0, 6).map((entry) => (
            <tr key={entry.id} className="border-b border-neutral-800/50">
              <td className="py-2 px-3 text-neutral-300 text-xs max-w-[140px] truncate">
                {entry.english.length > 30
                  ? entry.english.slice(0, 30) + "..."
                  : entry.english}
              </td>
              <td className="text-center py-2 px-1 text-neutral-200 font-mono text-xs">
                {getCharCount(entry.english)}
              </td>
              {locales.map((locale) => {
                const text = entry.translations[locale];
                if (!text) return <td key={locale} className="text-center py-2 px-1">-</td>;
                const ratio = getExpansionRatio(entry.english, text);
                const color =
                  ratio > 1.3
                    ? "text-red-400"
                    : ratio < 0.7
                    ? "text-emerald-400"
                    : "text-neutral-300";
                return (
                  <td
                    key={locale}
                    className={`text-center py-2 px-1 font-mono text-xs ${color}`}
                  >
                    {getCharCount(text)}
                    <span className="text-neutral-600 ml-0.5 text-[10px]">
                      ({Math.round(ratio * 100)}%)
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
