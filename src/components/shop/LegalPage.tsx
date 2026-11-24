import PageHeader from "./PageHeader";

/** Shared layout for the legal pages. Sections are [heading, paragraphs]. */
export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: [string, string[]][];
}) {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title={title} crumbs={[{ label: title }]} />
      <section className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-3xl px-[var(--gutter)]">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">Dernière mise à jour : {updated}</p>
          <p className="mb-12 rounded-xl border border-terre/30 bg-terre/5 p-4 text-sm text-terre-deep">
            Les mentions entre crochets [ ] sont à compléter par la boutique. Faites relire cette page
            par un conseiller juridique avant la mise en ligne.
          </p>
          <div className="space-y-10">
            {sections.map(([h, paras]) => (
              <div key={h}>
                <h2 className="display mb-4 text-3xl">{h}</h2>
                <div className="space-y-3 leading-relaxed text-[var(--ink-soft)]">
                  {paras.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
