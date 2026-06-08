/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../components/Navbar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock GlobalContext
jest.mock("../../components/GlobalContext", () => ({
  useGlobalContext: () => ({
    isCalculated: false,
    isLoaded: true
  }),
}));

describe("Navbar Component", () => {
  test("renders logo brand and menu links", () => {
    render(<Navbar />);

    // Check brand logo renders correctly
    expect(screen.getByText("Carbon")).toBeInTheDocument();
    expect(screen.getByText("Sense")).toBeInTheDocument();

    // Check main navigation links render
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Calculator")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Tracker")).toBeInTheDocument();
  });
});
