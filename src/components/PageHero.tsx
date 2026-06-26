export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center animate-fade-up">
        {eyebrow && (
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-balance">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
