"use client";

import { T, Num } from "gt-next";
import {
  translationData,
  languages,
  getCharCount,
  getByteCount,
  type TranslationEntry,
} from "@/lib/data";
import { useState } from "react";

type Metric = "characters" | "bytes";

function Bar({
  label,
  value,
  maxValue,
  color,
  isEnglish,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  isEnglish: boolean;
}) {
  const pct = (value / maxValue) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-neutral-400 w-16 text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 h-7 bg-neutral-800 rounded overflow-hidden relative">
        <div
          className={`h-full rounded transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
        <span
          className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono ${
            isEnglish ? "text-neutral-200 font-semibold" : "text-neutral-400"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

const colors: Record<string, string> = {
  en: "bg-blue-500",
  es: "bg-amber-500",
  de: "bg-red-500",
  ja: "bg-emerald-500",
  zh: "bg-purple-500",
  ar: "bg-cyan-500",
};

export default function ExpansionChart() {
  const [selectedEntry, setSelectedEntry] = useState<TranslationEntry>(
    translationData[0]
  );
  const [metric, setMetric] = useState<Metric>("characters");

  const getValue = (text: string) =>
    metric === "characters" ? getCharCount(text) : getByteCount(text);

  const allValues = [
    getValue(selectedEntry.english),
    ...Object.values(selectedEntry.translations).map(getValue),
  ];
  const maxValue = Math.max(...allValues);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedEntry.id}
          onChange={(e) =>
            setSelectedEntry(
              translationData.find((t) => t.id === e.target.value)!
            )
          }
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-200 flex-1"
        >
          {translationData.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.english.length > 50
                ? entry.english.slice(0, 50) + "..."
                : entry.english}
            </option>
          ))}
        </select>
        <div className="flex gap-0.5 bg-neutral-800 rounded-lg p-0.5 self-start">
          {(["characters", "bytes"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                metric === m
                  ? "bg-neutral-700 text-neutral-100 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {m === "characters" ? (
                <T>Chars</T>
              ) : (
                <T>Bytes</T>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-neutral-950 rounded-lg p-4 border border-neutral-800">
        <T>
          <p className="text-sm text-neutral-300 mb-1 font-medium">
            Source text (English):
          </p>
        </T>
        <p className="text-neutral-500 text-sm italic">
          &quot;{selectedEntry.english}&quot;
        </p>
      </div>

      <div className="space-y-2">
        <Bar
          label="en"
          value={getValue(selectedEntry.english)}
          maxValue={maxValue}
          color={colors.en}
          isEnglish={true}
        />
        {Object.entries(selectedEntry.translations).map(([locale, text]) => (
          <Bar
            key={locale}
            label={locale}
            value={getValue(text)}
            maxValue={maxValue}
            color={colors[locale] || "bg-neutral-500"}
            isEnglish={false}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
        {Object.entries(selectedEntry.translations).map(([locale, text]) => {
          const ratio = getValue(text) / getValue(selectedEntry.english);
          return (
            <div key={locale} className="flex items-center gap-1.5">
              <span className="font-mono text-neutral-400">{locale}</span>
              <span>
                {Math.round(ratio * 100)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
