/**
 * Mockups d'interface purement décoratifs (HTML/SVG, aucune image).
 * Ils sont présentés comme des interfaces conceptuelles et masqués aux lecteurs d'écran.
 */

type Tone = "accent" | "muted" | "text" | "surface";

function Bar({ w, tone = "muted", h = 7 }: { w: string; tone?: Tone; h?: number }) {
  return <span className={`bar bar--${tone}`} style={{ width: w, height: h }} />;
}

function Chart({ variant = "single" }: { variant?: "single" | "double" }) {
  return (
    <svg
      viewBox="0 0 400 150"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <polyline
        points="0,120 50,100 100,108 150,70 200,82 250,48 300,60 350,30 400,22"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {variant === "double" ? (
        <polyline
          points="0,135 60,128 120,120 180,126 240,104 300,110 400,92"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <line
          x1="0"
          y1="149"
          x2="400"
          y2="149"
          stroke="var(--color-border)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

function Kpi({ a, b, tone }: { a: string; b: string; tone: Tone }) {
  return (
    <div className="mock-kpi">
      <Bar w={a} />
      <Bar w={b} tone={tone} h={9} />
    </div>
  );
}

function WindowBar() {
  return (
    <div className="mock-topbar">
      <span className="mock-dot" />
      <span className="mock-dot" />
      <span className="mock-dot" />
    </div>
  );
}

export type BrowserVariant = "hero" | "dashboard" | "shop" | "chat";

export function BrowserMockup({ variant }: { variant: BrowserVariant }) {
  return (
    <div className="mock-window" aria-hidden="true">
      <WindowBar />
      {variant === "hero" && (
        <div className="mock-body mock-body--split">
          <div className="mock-sidebar">
            <Bar w="70%" tone="accent" h={10} />
            <Bar w="90%" h={10} />
            <Bar w="60%" h={10} />
            <Bar w="80%" h={10} />
          </div>
          <div className="mock-main">
            <Bar w="46%" h={14} />
            <div className="mock-row">
              <Kpi a="50%" b="70%" tone="accent" />
              <Kpi a="40%" b="55%" tone="text" />
              <Kpi a="55%" b="35%" tone="text" />
            </div>
            <div className="mock-chart">
              <Chart />
            </div>
          </div>
        </div>
      )}
      {variant === "dashboard" && (
        <div className="mock-body mock-body--stack">
          <div className="mock-row">
            <Kpi a="50%" b="62%" tone="accent" />
            <Kpi a="40%" b="48%" tone="text" />
            <Kpi a="55%" b="40%" tone="text" />
          </div>
          <div className="mock-chart mock-chart--tall">
            <Chart variant="double" />
          </div>
          <div className="mock-lines">
            <Bar w="90%" h={8} tone="surface" />
            <Bar w="72%" h={8} tone="surface" />
          </div>
        </div>
      )}
      {variant === "shop" && (
        <div className="mock-body mock-body--stack">
          <div className="mock-row">
            {["70%", "60%", "75%"].map((w, i) => (
              <div className="mock-product" key={i}>
                <span className="mock-product__img" />
                <Bar w={w} />
                <Bar w={i === 1 ? "35%" : i === 0 ? "40%" : "45%"} tone="accent" />
              </div>
            ))}
          </div>
        </div>
      )}
      {variant === "chat" && (
        <div className="mock-body mock-body--stack">
          <div className="mock-bubble mock-bubble--user">
            <Bar w="40%" h={8} />
          </div>
          <div className="mock-bubble mock-bubble--ai">
            <Bar w="90%" h={8} />
            <Bar w="75%" h={8} />
            <Bar w="50%" h={8} tone="accent" />
          </div>
          <div className="mock-chat__sources">
            <span className="mock-chat__source">
              <Bar w="100%" h={6} tone="surface" />
            </span>
            <span className="mock-chat__source">
              <Bar w="100%" h={6} tone="surface" />
            </span>
          </div>
          <div className="mock-chat__input">
            <Bar w="55%" h={7} tone="muted" />
          </div>
        </div>
      )}
    </div>
  );
}

export type PhoneVariant = "home" | "list" | "detail";

export function PhoneMockup({ variant = "home" }: { variant?: PhoneVariant }) {
  return (
    <div className="mock-phone" aria-hidden="true">
      <span className="mock-phone__notch" />
      {variant === "home" && (
        <>
          <Bar w="55%" tone="text" h={12} />
          <div className="mock-phone__hero" />
          <div className="mock-phone__item">
            <span className="mock-phone__avatar" />
            <span className="mock-phone__lines">
              <Bar w="80%" h={6} />
              <Bar w="50%" h={6} />
            </span>
          </div>
          <div className="mock-phone__item">
            <span className="mock-phone__avatar" />
            <span className="mock-phone__lines">
              <Bar w="70%" h={6} />
              <Bar w="45%" h={6} />
            </span>
          </div>
          <span className="mock-phone__cta" />
        </>
      )}
      {variant === "list" && (
        <>
          <Bar w="50%" tone="text" h={7} />
          <div className="mock-phone__tile" />
          <Bar w="80%" h={6} />
          <Bar w="55%" h={6} />
          <span className="mock-phone__cta mock-phone__cta--sm" />
        </>
      )}
      {variant === "detail" && (
        <>
          <Bar w="60%" tone="text" h={7} />
          <Bar w="80%" h={6} />
          <Bar w="70%" h={6} />
          <Bar w="50%" h={6} />
          <div className="mock-phone__tile mock-phone__tile--sm" />
        </>
      )}
    </div>
  );
}
