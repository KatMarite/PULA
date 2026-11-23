import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
  isQuotaError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
    isQuotaError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    const rawMessage = error?.message || 'An unexpected error occurred.';
    const isQuotaError = rawMessage.toLowerCase().includes('quota exceeded');
    let friendly = rawMessage;

    try {
      const parsed = JSON.parse(rawMessage) as { error?: string; operationType?: string; path?: string };
      if (parsed && parsed.error) {
        friendly = `${parsed.error}${parsed.path ? ` (path: ${parsed.path})` : ''}`;
      }
    } catch {
      // Plain error message
    }

    return {
      hasError: true,
      message: friendly,
      isQuotaError,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PŪLA ErrorBoundary caught:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, message: '', isQuotaError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream text-charcoal flex items-center justify-center p-6">
          <div className="max-w-lg w-full border border-charcoal bg-cream-light p-8 rounded-sm space-y-4">
            <p className="font-mono text-xs uppercase tracking-apothecary text-ochre font-bold">
              PŪLA Apothecary · Sync Notice
            </p>
            <h1 className="font-display font-bold text-2xl text-charcoal">
              {this.state.isQuotaError
                ? 'Daily Database Quota Reached'
                : 'Something interrupted real-time sync'}
            </h1>
            <p className="text-sm text-stone leading-relaxed">
              {this.state.isQuotaError
                ? 'The free daily Firestore read/write quota has been reached and resets tomorrow. You can review quota details in the Firebase console.'
                : this.state.message}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-5 py-3 bg-ochre text-cream hover:bg-charcoal transition-colors rounded-sm font-mono text-xs uppercase tracking-wider font-bold cursor-pointer"
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
