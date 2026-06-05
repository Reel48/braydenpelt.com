import { Kicker } from "@/components/ui/kicker";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";

/**
 * Standard page opener: optional kicker, the page title (factual), and an
 * optional intro. `intro` is personal copy — pages leave it unset until Brayden
 * writes his own.
 */
export function PageHeader({
  kicker,
  title,
  intro,
  children,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-14 pb-10 sm:pt-20 sm:pb-12">
      {kicker ? <Kicker className="mb-3">{kicker}</Kicker> : null}
      <Heading level={1}>{title}</Heading>
      {intro ? <Lead className="mt-5">{intro}</Lead> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
