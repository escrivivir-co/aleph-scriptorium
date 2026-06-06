# Compose-Lang MCP App UI Contract

## Entry

- Resource: `ui://compose-lang/mcp-app.html`
- Launcher: `show-compose-stack`
- Build: Vite singlefile → `LANGUAGES/compose-lang/app/dist/mcp-app.html`

## Launcher structuredContent

```ts
{
  stackId: string;
  services: Array<{ id: string; state: ServiceRuntimeState; dependsOn: string[] }>;
  virtualClockMs: number;
  phrases: string[];
  launcherName: 'show-compose-stack';
}
```

## Panels

1. **Topology graph** — Nodes per service, edges for `dependsOn`, badge colored by `ServiceRuntimeState`.
2. **Time scrubber** — Slider dispatches `compose-simulate-tick`; displays `virtualClockMs`.
3. **Phrases panel** — Lists typed DSL phrases; click dispatches matching `compose-simulate-*` tool.
4. **Healthcheck inspector** — Declared vs simulated healthcheck status per focused service.
5. **Failure injector** — Dropdown + button → `compose-simulate-inject-failure`.

## Host integration

Uses `@modelcontextprotocol/ext-apps` `App` client. Subscribes to `ontoolresult` from `show-compose-stack`. Calls server tools via `app.callServerTool`.

## Theme

Respects host `theme`, `styles.variables`, and safe area insets like `aleph-os` MCP App.
