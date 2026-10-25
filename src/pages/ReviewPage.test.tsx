// ===== SESSION 12: a NEW file =========================================
// Test 3 of 3: form validation. The test types into the real AI Coach
// form and presses the real button, the way a student would.
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReviewPage from "./ReviewPage";

// The exact sentence from src/schemas/reviewSchema.ts.
const TOO_SHORT = "Describe what you want to learn in at least 20 characters.";

// ReviewPage calls useMutation, which throws unless the page sits
// inside the QueryClientProvider that main.tsx gives the real app.
// It needs no router: the page never navigates.
function renderReviewPage() {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ReviewPage />
    </QueryClientProvider>,
  );
}

// Put fetch back after every test, so a spy from one test cannot leak
// into the next.
afterEach(() => {
  vi.restoreAllMocks();
});

describe("ReviewPage", () => {
  it("shows the schema message when the form is sent empty", async () => {
    const user = userEvent.setup();
    renderReviewPage();

    await user.click(screen.getByRole("button", { name: "Review my goal" }));

    expect(await screen.findByText(TOO_SHORT)).toBeInTheDocument();
  });

  it("sends nothing to the API while the description is too short", async () => {
    // Watch fetch without stopping it. If the form ever got past the
    // schema, request() in client.ts would call fetch and this spy
    // would count it.
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderReviewPage();

    await user.type(
      screen.getByLabelText("What do you want to learn?"),
      "too short",
    );
    await user.click(screen.getByRole("button", { name: "Review my goal" }));

    expect(await screen.findByText(TOO_SHORT)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
