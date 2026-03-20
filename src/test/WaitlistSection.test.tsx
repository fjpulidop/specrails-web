import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WaitlistSection from "@/components/WaitlistSection";

function renderWaitlist() {
  return render(<WaitlistSection />);
}

describe("WaitlistSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the headline, email input, and submit button", () => {
    renderWaitlist();
    expect(screen.getByText(/get early access/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join the waitlist/i })).toBeInTheDocument();
  });

  it("submit button is disabled when email is empty", () => {
    renderWaitlist();
    expect(screen.getByRole("button", { name: /join the waitlist/i })).toBeDisabled();
  });

  it("submit button is enabled when a valid email is typed", () => {
    renderWaitlist();
    fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value: "user@example.com" },
    });
    expect(screen.getByRole("button", { name: /join the waitlist/i })).toBeEnabled();
  });

  it("shows success state when Formspree returns 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    );

    renderWaitlist();
    fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
    });
  });

  it("shows error message when Formspree returns non-200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) })
    );

    renderWaitlist();
    fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
    // form stays interactive for retry
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
  });

  it("shows error message when fetch throws (network failure)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    renderWaitlist();
    fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
