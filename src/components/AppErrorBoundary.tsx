import React from 'react';

type State = { hasError: boolean; message?: string };

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert" className="mx-auto max-w-[900px] px-6 py-14">
          <div className="rounded-[18px] border border-cyan-400/30 bg-slate-900/60 px-6 py-10 text-slate-200">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm opacity-80">{this.state.message}</p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900/50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-200 ring-1 ring-cyan-500/40 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              Try again
            </button>
          </div>
        </section>
      );
    }

    return this.props.children as React.ReactNode;
  }
}
