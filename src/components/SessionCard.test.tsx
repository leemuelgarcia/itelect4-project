// ===== SESSION 12: a NEW file =========================================
// Test 1 of 3: a component render. SessionCard shows what the API sent,
// so the test checks the exact words a student would read, and that one
// prop (duration) changes them.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SessionCard from "./SessionCard";
import type { ApiSession } from "../types/index";

// One session shaped exactly like a row from GET /api/sessions. Typed,
// so a field that does not exist in ApiSession is a compile error here
// too.
const sampleSession: ApiSession = {
  id: "1",
  tutorId: 1,
  title: "Introduction to Web Development",
  description:
    "Learn the fundamentals of HTML, CSS, and JavaScript through guided exercises.",
  subject: "Web Development",
  duration: 60,
};

describe("SessionCard", () => {
  it("shows the title, the subject and the duration", () => {
    render(<SessionCard session={sampleSession} />);

    expect(
      screen.getByText("Introduction to Web Development"),
    ).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Duration: 60 minutes")).toBeInTheDocument();
  });

  it("shows a different duration when the session is longer", () => {
    // Everything from sampleSession, then duration changed -- the same
    // card for a 90-minute session.
    const longer: ApiSession = { ...sampleSession, duration: 90 };

    render(<SessionCard session={longer} />);

    expect(screen.getByText("Duration: 90 minutes")).toBeInTheDocument();
    expect(
      screen.queryByText("Duration: 60 minutes"),
    ).not.toBeInTheDocument();
  });
});
