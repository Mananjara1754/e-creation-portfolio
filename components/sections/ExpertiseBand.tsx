const items = ["DÉVELOPPEMENT WEB", "BACKEND & API", "APPLICATIONS MOBILES", "UI/UX DESIGN"];

export function ExpertiseBand() {
  return (
    <div className="band" role="presentation">
      <ul className="container band__inner" aria-label="Nos domaines">
        {items.map((item, i) => (
          <li key={item} className="band__item">
            {i > 0 && (
              <span className="band__sep" aria-hidden="true">
                /
              </span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
