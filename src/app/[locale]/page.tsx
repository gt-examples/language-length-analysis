import { T, Num } from "gt-next";
import { LocaleSelector } from "gt-next";
import ExpansionChart from "@/components/ExpansionChart";
import ExpansionTable from "@/components/ExpansionTable";
import AverageExpansion from "@/components/AverageExpansion";
import InteractiveInput from "@/components/InteractiveInput";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <div className="bg-blue-950 border-b border-blue-900">
        <div className="max-w-3xl mx-auto px-6 py-2 text-center">
          <T>
            <p className="text-xs text-blue-300">
              This is an example app built with{" "}
              <a
                href="https://generaltranslation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-100"
              >
                General Translation
              </a>{" "}
              to demonstrate internationalization. It is not a real product.
            </p>
          </T>
        </div>
      </div>
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <T>
              <h1 className="text-sm font-semibold text-neutral-100">
                Language Length Analysis
              </h1>
            </T>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/language-length-analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Hero */}
        <div>
          <T>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
              How text changes across languages
            </h2>
            <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
              When you translate text, its length changes -- sometimes
              dramatically. German tends to expand by <Num>{30}</Num>% or more,
              while Chinese and Japanese often contract. Understanding these
              patterns is essential for building internationalized UIs.
            </p>
          </T>
        </div>

        {/* Average expansion ratios */}
        <section>
          <T>
            <h3 className="text-lg font-semibold text-neutral-100 mb-1">
              Average expansion ratio
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Character count relative to English across <Num>{10}</Num> sample
              texts, from short UI labels to full sentences.
            </p>
          </T>
          <AverageExpansion />
        </section>

        {/* Visual comparison */}
        <section className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <T>
            <h3 className="text-base font-semibold text-neutral-100 mb-1">
              Side-by-side comparison
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Select a text and metric to see how each language compares
              visually.
            </p>
          </T>
          <ExpansionChart />
        </section>

        {/* Data table */}
        <section className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <T>
            <h3 className="text-base font-semibold text-neutral-100 mb-1">
              Character counts at a glance
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Character count for each translation with expansion percentage.
              Red indicates significant expansion, green indicates contraction.
            </p>
          </T>
          <ExpansionTable />
        </section>

        {/* Interactive */}
        <section className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <T>
            <h3 className="text-base font-semibold text-neutral-100 mb-1">
              Try it yourself
            </h3>
          </T>
          <InteractiveInput />
        </section>

        {/* Developer tips */}
        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 space-y-4">
          <T>
            <h3 className="text-base font-semibold text-neutral-100">
              Tips for developers
            </h3>
            <div className="text-sm text-neutral-400 space-y-3 leading-relaxed">
              <div className="flex gap-3">
                <span className="text-neutral-600 font-mono shrink-0">01</span>
                <p>
                  <strong className="text-neutral-200">
                    Plan for <Num>{40}</Num>% expansion.
                  </strong>{" "}
                  German, Finnish, and other agglutinative languages routinely
                  expand English text by <Num>{30}</Num>-<Num>{40}</Num>%.
                  Design your UI with flexible containers that can accommodate
                  this growth.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-neutral-600 font-mono shrink-0">02</span>
                <p>
                  <strong className="text-neutral-200">
                    Short strings expand more.
                  </strong>{" "}
                  A <Num>{4}</Num>-character English button label might become{" "}
                  <Num>{12}</Num> characters in German. The shorter the source
                  text, the higher the proportional expansion tends to be.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-neutral-600 font-mono shrink-0">03</span>
                <p>
                  <strong className="text-neutral-200">
                    CJK languages are more compact.
                  </strong>{" "}
                  Chinese and Japanese use fewer characters but each character
                  carries more meaning. However, they use more bytes per
                  character in{" "}
                  <a
                    href="https://unicode.org/faq/utf_bom.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 underline hover:text-neutral-100"
                  >
                    UTF-8
                  </a>{" "}
                  encoding.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-neutral-600 font-mono shrink-0">04</span>
                <p>
                  <strong className="text-neutral-200">
                    Measure bytes, not just characters.
                  </strong>{" "}
                  Arabic, Chinese, and Japanese text may look shorter in
                  character count, but can use <Num>{2}</Num>-<Num>{4}</Num>x
                  more bytes in UTF-8. This matters for storage, bandwidth, and
                  database column sizing.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-neutral-600 font-mono shrink-0">05</span>
                <p>
                  <strong className="text-neutral-200">
                    Avoid fixed-width layouts.
                  </strong>{" "}
                  Use CSS flexbox, grid, and{" "}
                  <code className="text-neutral-300 text-xs bg-neutral-800 px-1.5 py-0.5 rounded">
                    min-width
                  </code>{" "}
                  /{" "}
                  <code className="text-neutral-300 text-xs bg-neutral-800 px-1.5 py-0.5 rounded">
                    max-width
                  </code>{" "}
                  instead of fixed pixel widths. Test with your longest target
                  language, not just English. The{" "}
                  <a
                    href="https://www.w3.org/International/articles/article-text-size"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 underline hover:text-neutral-100"
                  >
                    W3C internationalization guide
                  </a>{" "}
                  has more details on text size in translation.
                </p>
              </div>
            </div>
          </T>
        </section>
      </main>
    </div>
  );
}
