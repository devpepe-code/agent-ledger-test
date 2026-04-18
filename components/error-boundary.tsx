"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { logger } from "@/lib/logger";

type Props = { children: ReactNode; fallback?: ReactNode };

type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("Component error:", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[200px] flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-white/55">Something went wrong. Try refreshing.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 text-sm text-[#7C3AED] hover:text-[#a78bfa]"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
