import { Component, type ReactNode } from "react";
import Button from "@/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-4 rounded-card border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950"
        >
          <div className="text-4xl">&#9888;</div>
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">页面出现了错误</h2>
          <p className="text-sm text-red-600 dark:text-red-400">
            {this.state.error?.message ?? "未知错误"}
          </p>
          <Button intent="danger" size="sm" onClick={this.handleReset}>
            重试
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
