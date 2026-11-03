import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useHydrated();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name: name || "Shopper" });
        if (res.error) throw new Error(res.error.message || "Could not create account");
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message || "Could not sign in");
      }
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(false);
    }
  }

  if (!hydrated || isPending) {
    return (
      <main className="app-ambient min-h-dvh">
        <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 pb-10 pt-12">
          <Skeleton className="size-12 rounded-xl" />
          <Skeleton className="mt-8 h-8 w-48" />
          <Skeleton className="mt-6 h-11 w-full" />
          <Skeleton className="mt-3 h-11 w-full" />
        </div>
      </main>
    );
  }
  if (user) return <Navigate to="/" />;

  return (
    <main className="app-ambient min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 pb-10 pt-12">
        <Link to="/" className="mb-8 flex items-center gap-3">
          <img src="/app-icon.png" alt="" className="size-12 rounded-xl" />
          <span>
            <span className="block font-display text-lg font-semibold">My Offers</span>
            <span className="text-sm text-muted">Every deal. Everywhere. Just for you.</span>
          </span>
        </Link>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          {mode === "in" ? "Welcome back" : "Create your watchlist"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Save priority items, pin neighbourhoods, and get alerted the moment a matching deal lands.
        </p>

        <div className="mt-8 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-subtle">
          <span className="h-px flex-1 bg-border" />
          or email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onEmail} className="space-y-3">
          {mode === "up" ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoComplete="name"
            />
          ) : null}
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
          />
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (8+ characters)"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 text-sm text-muted underline-offset-4 hover:underline"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
