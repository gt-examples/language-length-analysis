import { T, Num, Var } from "gt-next";
import { getAverageExpansion, languages } from "@/lib/data";

function ExpansionCard({
  name,
  pct,
  diff,
}: {
  name: string;
  pct: number;
  diff: number;
}) {
  const isExpansion = diff > 0;
  const isContraction = diff < 0;
  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-4 text-center">
      <p className="text-xs text-neutral-500 mb-1">{name}</p>
      <p className="text-2xl font-semibold text-neutral-100 font-mono">
        <Num>{pct}</Num>%
      </p>
      {isExpansion && (
        <T>
          <p className="text-xs mt-1 text-red-400">
            +<Var>{diff}</Var>% expansion
          </p>
        </T>
      )}
      {isContraction && (
        <T>
          <p className="text-xs mt-1 text-emerald-400">
            <Var>{diff}</Var>% contraction
          </p>
        </T>
      )}
      {!isExpansion && !isContraction && (
        <T>
          <p className="text-xs mt-1 text-neutral-500">no change</p>
        </T>
      )}
    </div>
  );
}

export default function AverageExpansion() {
  const locales = ["es", "de", "ja", "zh", "ar"];
  const averages = locales.map((l) => ({
    locale: l,
    name: languages[l],
    avg: getAverageExpansion(l),
  }));

  averages.sort((a, b) => b.avg - a.avg);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
      {averages.map(({ locale, name, avg }) => {
        const pct = Math.round(avg * 100);
        const diff = pct - 100;
        return (
          <ExpansionCard key={locale} name={name} pct={pct} diff={diff} />
        );
      })}
    </div>
  );
}
