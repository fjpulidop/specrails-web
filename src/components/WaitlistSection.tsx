import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// TODO: Replace REPLACE_ME with your Formspree form ID before deploying.
// Create a free form at https://formspree.io and paste the ID here.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

type Status = "idle" | "submitting" | "success" | "error";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="py-24 px-6 section-darker border-t border-border/10">
      <div className="container mx-auto max-w-2xl text-center">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 animate-fade-up">
            <CheckCircle className="w-12 h-12 text-dracula-green" />
            <h2 className="text-2xl font-bold text-foreground">You're on the list!</h2>
            <p className="text-muted-foreground">
              We'll email you as soon as specrails goes live. Stay tuned.
            </p>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-background/30 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-dracula-yellow animate-pulse" />
              Early Access
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Get early access.{" "}
              <span className="gradient-text">Your AI dev team awaits.</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Join 500+ developers building with specrails before public launch.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="sm:max-w-xs"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="gradient"
                disabled={!email || status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining…
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>
            </form>

            {status === "error" && (
              <p className="mt-4 text-sm text-dracula-red animate-fade-up">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-4 text-xs text-muted-foreground/60">
              No spam. Unsubscribe anytime.
              {/* TODO: Add GDPR consent copy before EU launch */}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default WaitlistSection;
