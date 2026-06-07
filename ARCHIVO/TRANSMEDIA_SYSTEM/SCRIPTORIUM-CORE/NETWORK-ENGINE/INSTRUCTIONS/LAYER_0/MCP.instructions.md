# Model Context Protocol

Use this guide as template, but search text local preferred: for local at folder: ./modelcontextprotocol-main/README.md

If not present, download from https://github.com/modelcontextprotocol/modelcontextprotocol

## Regla de fuente local

La fuente primaria para este workspace es la copia local de la especificación en:

```text
INSTRUCTIONS/LAYER_0/modelcontextprotocol-main
```

Antes de consultar la web, buscar primero en:

- `modelcontextprotocol-main/schema/draft/schema.ts`
- `modelcontextprotocol-main/docs/specification/draft/**`
- `modelcontextprotocol-main/seps/**`

La web solo debe usarse si la copia local no contiene la sección requerida o si el usuario pide verificar cambios posteriores.

## MCP moderno en Network-Engine

Network-Engine apunta al MCP moderno stateless. Por tanto:

- `server/discover` es obligatorio para servers modernos.
- Streamable HTTP usa `POST` al endpoint MCP; no se debe reintroducir el antiguo stream `GET`.
- `Mcp-Session-Id` no debe usarse como estado de aplicación.
- `subscriptions/listen` reemplaza `resources/subscribe` y `resources/unsubscribe`.
- Resultados cacheables deben declarar `ttlMs` y `cacheScope` cuando aplique.
- Los listados deben ser deterministas cuando el conjunto subyacente no cambia.
- Las notificaciones de cambios deben respetar filtros opt-in del cliente.

## Shim temporal de SDK

Si la especificación local contiene una capacidad draft que el SDK instalado aún no expone, el workaround permitido es:

```text
shim temporal en adapter de borde
```

No está permitido:

- contaminar `@network-engine/core` con detalles del SDK MCP;
- mover el workaround a contratos de dominio;
- forkear el SDK sin ADR;
- presentar el shim como arquitectura definitiva.

Caso vigente:

- `@modelcontextprotocol/sdk@1.29.0` no expone todavía helpers/schemas draft para `subscriptions/listen`.
- `@network-engine/edge-mcp` (`mountMcpRoute`) intercepta temporalmente `subscriptions/listen` según `ADR/0001-mcp-runtime-subscriptions-shim.md`.
- El shim debe retirarse cuando el SDK soporte oficialmente `SubscriptionsListenRequestSchema` y `SubscriptionsAcknowledgedNotificationSchema`.

## Docs
- [Antitrust Policy](https://modelcontextprotocol.io/community/): MCP Project Antitrust Policy for participants and contributors
- [Authorization Charter](https://modelcontextprotocol.io/community/auth/charter.md): Charter for the MCP Authorization Interest Group.
- [Group Charter Template](https://modelcontextprotocol.io/community/charter-template.md): Template for MCP Working Group and Interest Group charters.
- [Contributor Communication](https://modelcontextprotocol.io/community/communication.md): Communication strategy and framework for the Model Context Protocol community
- [Contributing to MCP](https://modelcontextprotocol.io/community/contributing.md): How to contribute to the Model Context Protocol project
- [Contributor Ladder](https://modelcontextprotocol.io/community/contributor-ladder.md): Roles, responsibilities, and advancement criteria for MCP contributors, from first contribution to Core Maintainer
- [Design Principles](https://modelcontextprotocol.io/community/design-principles.md): The core design principles that guide the development of the Model Context Protocol.
- [Feature Lifecycle and Deprecation Policy](https://modelcontextprotocol.io/community/feature-lifecycle.md): How individual MCP specification features move through Active, Deprecated, and Removed states, and the timeline implementers can plan against.
- [File Uploads Charter](https://modelcontextprotocol.io/community/file-uploads/charter.md): Charter for the MCP File Uploads Working Group.
- [Governance and Stewardship](https://modelcontextprotocol.io/community/governance.md): Learn about the Model Context Protocol's governance structure and how to participate in the community
- [Inspector V2 Working Group Charter](https://modelcontextprotocol.io/community/inspector-v2/charter.md): Charter for the Inspector V2 Working Group, a Working Group of the Model Context Protocol community.
- [Interceptors Charter](https://modelcontextprotocol.io/community/interceptors/charter.md): Charter for the MCP Interceptors Working Group.
- [Registry Charter](https://modelcontextprotocol.io/community/registry/charter.md): Charter for the MCP Registry Working Group.
- [SDK Tiering System](https://modelcontextprotocol.io/community/sdk-tiers.md): Feature completeness, protocol support, and maintenance commitment levels for Model Context Protocol SDKs
- [SDK Working Group Charter](https://modelcontextprotocol.io/community/sdk/charter.md): Charter for the MCP SDK Working Group.
- [SEP Guidelines](https://modelcontextprotocol.io/community/sep-guidelines.md): Specification Enhancement Proposal (SEP) guidelines for proposing changes to the Model Context Protocol
- [Server Card Charter](https://modelcontextprotocol.io/community/server-card/charter.md): Charter for the MCP Server Card Working Group.
- [Skills Over MCP Charter](https://modelcontextprotocol.io/community/skills-over-mcp/charter.md): Charter for the MCP Skills Over MCP Working Group.
- [Tool Annotations Charter](https://modelcontextprotocol.io/community/tool-annotations/charter.md): Charter for the MCP Tool Annotations Interest Group.
- [Triggers and Events Charter](https://modelcontextprotocol.io/community/triggers-events/charter.md): Charter for the MCP Triggers and Events Working Group.
- [Working and Interest Groups](https://modelcontextprotocol.io/community/working-interest-groups.md): Governance rules for the two forms of collaborative groups within the Model Context Protocol community — Working Groups and Interest Groups.
- [Roadmap](https://modelcontextprotocol.io/development/roadmap.md): Our plans for evolving Model Context Protocol
- [Build an MCP client](modelcontextprotocol-main/docs/develop/build-client.md): Get started building your own client that can integrate with all MCP servers.
- [Build an MCP server](modelcontextprotocol-main/docs/develop/build-server.md): Get started building your own server to use in Claude for Desktop and other clients.
- [Build with Agent Skills](modelcontextprotocol-main/docs/develop/build-with-agent-skills.md): Use agent skills to guide AI coding assistants through MCP server design and implementation
- [Client Best Practices](modelcontextprotocol-main/docs/develop/clients/client-best-practices.md): Patterns for scaling MCP host applications across many servers and tools.
- [Connect to local MCP servers](modelcontextprotocol-main/docs/develop/connect-local-servers.md): Learn how to extend Claude Desktop with local MCP servers to enable file system access and other powerful integrations
- [Connect to remote MCP Servers](modelcontextprotocol-main/docs/develop/connect-remote-servers.md): Learn how to connect Claude to remote MCP servers and extend its capabilities with internet-hosted tools and data sources
- [What is the Model Context Protocol (MCP)?](modelcontextprotocol-main/docs/getting-started/intro.md)
- [Architecture overview](modelcontextprotocol-main/docs/learn/architecture.md)
- [Understanding MCP clients](modelcontextprotocol-main/docs/learn/client-concepts.md)
- [Understanding MCP servers](modelcontextprotocol-main/docs/learn/server-concepts.md)
- [Versioning](modelcontextprotocol-main/docs/learn/versioning.md)
- [SDKs](modelcontextprotocol-main/docs/sdk.md): Official SDKs for building with Model Context Protocol
- [Debugging](modelcontextprotocol-main/docs/tools/debugging.md): A comprehensive guide to debugging Model Context Protocol (MCP) integrations
- [MCP Inspector](modelcontextprotocol-main/docs/tools/inspector.md): In-depth guide to using the MCP Inspector for testing and debugging Model Context Protocol servers
- [Understanding Authorization in MCP](modelcontextprotocol-main/docs/tutorials/security/authorization.md): Learn how to implement secure authorization for MCP servers using OAuth 2.1 to protect sensitive resources and operations
- [Security Best Practices](modelcontextprotocol-main/docs/tutorials/security/security_best_practices.md): Security considerations, attack vectors, and best practices for MCP implementations
- [Example Servers](https://modelcontextprotocol.io/examples.md): A list of example servers and implementations
- [Build an MCP App](modelcontextprotocol-main/docs/extensions/apps/build.md): Getting started guide for building interactive UI applications with MCP Apps
- [MCP Apps](modelcontextprotocol-main/docs/extensions/apps/overview.md): Interactive UI applications that render inside MCP hosts like Claude Desktop
- [Enterprise-Managed Authorization](modelcontextprotocol-main/docs/extensions/auth/enterprise-managed-authorization.md): Centralized access control for MCP in enterprise environments via identity providers
- [OAuth Client Credentials](modelcontextprotocol-main/docs/extensions/auth/oauth-client-credentials.md): Machine-to-machine authentication for MCP using the OAuth 2.0 client credentials flow
- [Authorization Extensions](modelcontextprotocol-main/docs/extensions/auth/overview.md): Supplementary authorization mechanisms for the Model Context Protocol
- [Extension Support Matrix](modelcontextprotocol-main/docs/extensions/client-matrix.md): Which MCP clients implement which official extensions
- [Extensions Overview](modelcontextprotocol-main/docs/extensions/overview.md): Optional extensions to the Model Context Protocol
- [MCP Tasks](modelcontextprotocol-main/docs/extensions/tasks/overview.md): Asynchronous task execution for long-running MCP operations
- [The MCP Registry](https://modelcontextprotocol.io/registry/about.md)
- [How to Authenticate When Publishing to the Official MCP Registry](https://modelcontextprotocol.io/registry/authentication.md)
- [Frequently Asked Questions](https://modelcontextprotocol.io/registry/faq.md)
- [How to Automate Publishing with GitHub Actions](https://modelcontextprotocol.io/registry/github-actions.md)
- [The MCP Registry Moderation Policy](https://modelcontextprotocol.io/registry/moderation-policy.md)
- [MCP Registry Supported Package Types](https://modelcontextprotocol.io/registry/package-types.md)
- [Quickstart: Publish an MCP Server to the MCP Registry](https://modelcontextprotocol.io/registry/quickstart.md)
- [MCP Registry Aggregators](https://modelcontextprotocol.io/registry/registry-aggregators.md)
- [Publishing Remote Servers](https://modelcontextprotocol.io/registry/remote-servers.md)
- [Official MCP Registry Terms of Service](https://modelcontextprotocol.io/registry/terms-of-service.md)
- [Versioning Published MCP Servers](https://modelcontextprotocol.io/registry/versioning.md)
- [SEP-1024: MCP Client Security Requirements for Local Server Installation](modelcontextprotocol-main/seps1024-mcp-client-security-requirements-for-local-server-.md): MCP Client Security Requirements for Local Server Installation
- [SEP-1034: Support default values for all primitive types in elicitation schemas](modelcontextprotocol-main/seps1034--support-default-values-for-all-primitive-types-in.md): Support default values for all primitive types in elicitation schemas
- [SEP-1036: URL Mode Elicitation for secure out-of-band interactions](modelcontextprotocol-main/seps1036-url-mode-elicitation-for-secure-out-of-band-intera.md): URL Mode Elicitation for secure out-of-band interactions
- [SEP-1046: Support OAuth client credentials flow in authorization](modelcontextprotocol-main/seps1046-support-oauth-client-credentials-flow-in-authoriza.md): Support OAuth client credentials flow in authorization
- [SEP-1302: Formalize Working Groups and Interest Groups in MCP Governance](modelcontextprotocol-main/seps1302-formalize-working-groups-and-interest-groups-in-mc.md): Formalize Working Groups and Interest Groups in MCP Governance
- [SEP-1303: Input Validation Errors as Tool Execution Errors](modelcontextprotocol-main/seps1303-input-validation-errors-as-tool-execution-errors.md): Input Validation Errors as Tool Execution Errors
- [SEP-1319: Decouple Request Payload from RPC Methods Definition](modelcontextprotocol-main/seps1319-decouple-request-payload-from-rpc-methods-definiti.md): Decouple Request Payload from RPC Methods Definition
- [SEP-1330: Elicitation Enum Schema Improvements and Standards Compliance](modelcontextprotocol-main/seps1330-elicitation-enum-schema-improvements-and-standards.md): Elicitation Enum Schema Improvements and Standards Compliance
- [SEP-1577: Sampling With Tools](modelcontextprotocol-main/seps1577--sampling-with-tools.md): Sampling With Tools
- [SEP-1613: Establish JSON Schema 2020-12 as Default Dialect for MCP](modelcontextprotocol-main/seps1613-establish-json-schema-2020-12-as-default-dialect-f.md): Establish JSON Schema 2020-12 as Default Dialect for MCP
- [SEP-1686: Tasks](modelcontextprotocol-main/seps1686-tasks.md): Tasks
- [SEP-1699: Support SSE polling via server-side disconnect](modelcontextprotocol-main/seps1699-support-sse-polling-via-server-side-disconnect.md): Support SSE polling via server-side disconnect
- [SEP-1730: SDKs Tiering System](modelcontextprotocol-main/seps1730-sdks-tiering-system.md): SDKs Tiering System
- [SEP-1850: PR-Based SEP Workflow](modelcontextprotocol-main/seps1850-pr-based-sep-workflow.md): PR-Based SEP Workflow
- [SEP-1865: MCP Apps - Interactive User Interfaces for MCP](modelcontextprotocol-main/seps1865-mcp-apps-interactive-user-interfaces-for-mcp.md): MCP Apps - Interactive User Interfaces for MCP
- [SEP-2085: Governance Succession and Amendment Procedures](modelcontextprotocol-main/seps2085-governance-succession-and-amendment.md): Governance Succession and Amendment Procedures
- [SEP-2106: Tools `inputSchema` & `outputSchema` Conform to JSON Schema 2020-12](modelcontextprotocol-main/seps2106-json-schema-2020-12.md): Tools `inputSchema` & `outputSchema` Conform to JSON Schema 2020-12
- [SEP-2133: Extensions](modelcontextprotocol-main/seps2133-extensions.md): Extensions
- [SEP-2148: MCP Contributor Ladder](modelcontextprotocol-main/seps2148-contributor-ladder.md): MCP Contributor Ladder
- [SEP-2149: MCP Group Governance and Charter Template](modelcontextprotocol-main/seps2149-working-group-charter-template.md): MCP Group Governance and Charter Template
- [SEP-2164: Standardize Resource Not Found Error Code](modelcontextprotocol-main/seps2164-resource-not-found-error.md): Standardize Resource Not Found Error Code
- [SEP-2207: OIDC-Flavored Refresh Token Guidance](modelcontextprotocol-main/seps2207-oidc-refresh-token-guidance.md): OIDC-Flavored Refresh Token Guidance
- [SEP-2243: HTTP Header Standardization for Streamable HTTP Transport](modelcontextprotocol-main/seps2243-http-standardization.md): HTTP Header Standardization for Streamable HTTP Transport
- [SEP-2260: Require Server requests to be associated with a Client request.](modelcontextprotocol-main/seps2260-Require-Server-requests-to-be-associated-with-Client-requests.md): Require Server requests to be associated with a Client request.
- [SEP-2322: Multi Round-Trip Requests](modelcontextprotocol-main/seps2322-MRTR.md): Multi Round-Trip Requests
- [SEP-2468: Recommend Issuer (iss) Parameter in MCP Auth Responses](modelcontextprotocol-main/seps2468-recommend-issuer-claim-for-auth.md): Recommend Issuer (iss) Parameter in MCP Auth Responses
- [SEP-2484: Require Conformance Tests for Standards Track SEPs to Reach Final Status](modelcontextprotocol-main/seps2484-conformance-tests-required-for-final-seps.md): Require Conformance Tests for Standards Track SEPs to Reach Final Status
- [SEP-2549: TTL for List Results](modelcontextprotocol-main/seps2549-TTL-for-list-results.md): TTL for List Results
- [SEP-2567: Sessionless MCP via Explicit State Handles](modelcontextprotocol-main/seps2567-sessionless-mcp.md): Sessionless MCP via Explicit State Handles
- [SEP-2575: Make MCP Stateless](modelcontextprotocol-main/seps2575-stateless-mcp.md): Make MCP Stateless
- [SEP-2577: Deprecate Roots, Sampling, and Logging](modelcontextprotocol-main/seps2577-deprecate-roots-sampling-and-logging.md): Deprecate Roots, Sampling, and Logging
- [SEP-2596: Specification Feature Lifecycle and Deprecation Policy](modelcontextprotocol-main/seps2596-spec-feature-lifecycle-and-deprecation.md): Specification Feature Lifecycle and Deprecation Policy
- [SEP-2663: Tasks Extension](modelcontextprotocol-main/seps2663-tasks-extension.md): Tasks Extension
- [SEP-414: Document OpenTelemetry Trace Context Propagation Conventions](modelcontextprotocol-main/seps414-request-meta.md): Document OpenTelemetry Trace Context Propagation Conventions
- [SEP-932: Model Context Protocol Governance](modelcontextprotocol-main/seps932-model-context-protocol-governance.md): Model Context Protocol Governance
- [SEP-973: Expose additional metadata for Implementations, Resources, Tools and Prompts](modelcontextprotocol-main/seps973-expose-additional-metadata-for-implementations-res.md): Expose additional metadata for Implementations, Resources, Tools and Prompts
- [SEP-985: Align OAuth 2.0 Protected Resource Metadata with RFC 9728](modelcontextprotocol-main/seps985-align-oauth-20-protected-resource-metadata-with-rf.md): Align OAuth 2.0 Protected Resource Metadata with RFC 9728
- [SEP-986: Specify Format for Tool Names](modelcontextprotocol-main/seps986-specify-format-for-tool-names.md): Specify Format for Tool Names
- [SEP-990: Enable enterprise IdP policy controls during MCP OAuth flows](modelcontextprotocol-main/seps990-enable-enterprise-idp-policy-controls-during-mcp-o.md): Enable enterprise IdP policy controls during MCP OAuth flows
- [SEP-991: Enable URL-based Client Registration using OAuth Client ID Metadata Documents](modelcontextprotocol-main/seps991-enable-url-based-client-registration-using-oauth-c.md): Enable URL-based Client Registration using OAuth Client ID Metadata Documents
- [SEP-994: Shared Communication Practices/Guidelines](modelcontextprotocol-main/seps994-shared-communication-practicesguidelines.md): Shared Communication Practices/Guidelines
- [Specification Enhancement Proposals (SEPs)](modelcontextprotocol-main/sepsindex.md): Index of all MCP Specification Enhancement Proposals
- [Architecture](modelcontextprotocol-main/specification/2025-11-25/architecture/index.md)
- [Authorization](modelcontextprotocol-main/specification/2025-11-25/basic/authorization.md)
- [Overview](modelcontextprotocol-main/specification/2025-11-25/basic/index.md)
- [Lifecycle](modelcontextprotocol-main/specification/2025-11-25/basic/lifecycle.md)
- [Transports](modelcontextprotocol-main/specification/2025-11-25/basic/transports.md)
- [Cancellation](modelcontextprotocol-main/specification/2025-11-25/basic/utilities/cancellation.md)
- [Ping](modelcontextprotocol-main/specification/2025-11-25/basic/utilities/ping.md)
- [Progress](modelcontextprotocol-main/specification/2025-11-25/basic/utilities/progress.md)
- [Tasks](modelcontextprotocol-main/specification/2025-11-25/basic/utilities/tasks.md)
- [Key Changes](modelcontextprotocol-main/specification/2025-11-25/changelog.md)
- [Elicitation](modelcontextprotocol-main/specification/2025-11-25/client/elicitation.md)
- [Roots](modelcontextprotocol-main/specification/2025-11-25/client/roots.md)
- [Sampling](modelcontextprotocol-main/specification/2025-11-25/client/sampling.md)
- [Specification](modelcontextprotocol-main/specification/2025-11-25/index.md)
- [Schema Reference](modelcontextprotocol-main/specification/2025-11-25/schema.md)
- [Overview](modelcontextprotocol-main/specification/2025-11-25/server/index.md)
- [Prompts](modelcontextprotocol-main/specification/2025-11-25/server/prompts.md)
- [Resources](modelcontextprotocol-main/specification/2025-11-25/server/resources.md)
- [Tools](modelcontextprotocol-main/specification/2025-11-25/server/tools.md)
- [Completion](modelcontextprotocol-main/specification/2025-11-25/server/utilities/completion.md)
- [Logging](modelcontextprotocol-main/specification/2025-11-25/server/utilities/logging.md)
- [Pagination](modelcontextprotocol-main/specification/2025-11-25/server/utilities/pagination.md)