interface TurnstileRenderOptions {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface Turnstile {
  render: (
    container: string | HTMLElement,
    options: TurnstileRenderOptions
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

interface Window {
  turnstile?: Turnstile;
}
