    MiscellaneousThe Socket.IO protocol

Version: 4.x
The Socket.IO protocol

This document describes the 5th version of the Socket.IO protocol.

The source of this document can be found here.

Table of content

    Introduction
    Exchange protocol
        Connection to a namespace
        Sending and receiving data
        Acknowledgement
        Disconnection from a namespace
    Packet encoding
        Format
        Examples
            Connection to a namespace
            Sending and receiving data
            Acknowledgement
            Disconnection from a namespace
    Sample session
    History
        Difference between v5 and v4
        Difference between v4 and v3
        Difference between v3 and v2
        Difference between v2 and v1
        Initial revision
    Test suite

Introduction

The Socket.IO protocol enables full-duplex and low-overhead communication between a client and a server.

It is built on top of the Engine.IO protocol, which handles the low-level plumbing with WebSocket and HTTP long-polling.

The Socket.IO protocol adds the following features:

    multiplexing (referred as "namespace" in the Socket.IO jargon)

Example with the JavaScript API:

Server

// declare the namespace
const namespace = io.of("/admin");
// handle the connection to the namespace
namespace.on("connection", (socket) => {
  // ...
});

Client

// reach the main namespace
const socket1 = io();
// reach the "/admin" namespace (with the same underlying WebSocket connection)
const socket2 = io("/admin");
// handle the connection to the namespace
socket2.on("connect", () => {
  // ...
});

    acknowledgement of packets

Example with the JavaScript API:

// on one side
socket.emit("hello", "foo", (arg) => {
  console.log("received", arg);
});

// on the other side
socket.on("hello", (arg, ack) => {
  ack("bar");
});

The reference implementation is written in TypeScript:

    server: https://github.com/socketio/socket.io
    client: https://github.com/socketio/socket.io-client

Exchange protocol

A Socket.IO packet contains the following fields:

    a packet type (integer)
    a namespace (string)
    optionally, a payload (Object | Array)
    optionally, an acknowledgment id (integer)

Here is the list of available packet types:
Type	ID	Usage
CONNECT	0	Used during the connection to a namespace.
DISCONNECT	1	Used when disconnecting from a namespace.
EVENT	2	Used to send data to the other side.
ACK	3	Used to acknowledge an event.
CONNECT_ERROR	4	Used during the connection to a namespace.
BINARY_EVENT	5	Used to send binary data to the other side.
BINARY_ACK	6	Used to acknowledge an event (the response includes binary data).
Connection to a namespace

At the beginning of a Socket.IO session, the client MUST send a CONNECT packet:

The server MUST respond with either:

    a CONNECT packet if the connection is successful, with the session ID in the payload
    or a CONNECT_ERROR packet if the connection is not allowed

CLIENT                                                      SERVER

  │  ───────────────────────────────────────────────────────►  │
  │             { type: CONNECT, namespace: "/" }              │
  │  ◄───────────────────────────────────────────────────────  │
  │   { type: CONNECT, namespace: "/", data: { sid: "..." } }  │

If the server does not receive a CONNECT packet first, then it MUST close the connection immediately.

A client MAY be connected to multiple namespaces at the same time, with the same underlying WebSocket connection.

Examples:

    with the main namespace (named "/")

Client > { type: CONNECT, namespace: "/" }
Server > { type: CONNECT, namespace: "/", data: { sid: "wZX3oN0bSVIhsaknAAAI" } }

    with a custom namespace

Client > { type: CONNECT, namespace: "/admin" }
Server > { type: CONNECT, namespace: "/admin", data: { sid: "oSO0OpakMV_3jnilAAAA" } }

    with an additional payload

Client > { type: CONNECT, namespace: "/admin", data: { "token": "123" } }
Server > { type: CONNECT, namespace: "/admin", data: { sid: "iLnRaVGHY4B75TeVAAAB" } }

    in case the connection is refused

Client > { type: CONNECT, namespace: "/" }
Server > { type: CONNECT_ERROR, namespace: "/", data: { message: "Not authorized" } }

Sending and receiving data

Once the connection to a namespace is established, the client and the server can begin exchanging data:

CLIENT                                                      SERVER

  │  ───────────────────────────────────────────────────────►  │
  │        { type: EVENT, namespace: "/", data: ["foo"] }      │
  │                                                            │
  │  ◄───────────────────────────────────────────────────────  │
  │        { type: EVENT, namespace: "/", data: ["bar"] }      │

The payload is mandatory and MUST be a non-empty array. If that's not the case, then the receiver MUST close the connection.

Examples:

    with the main namespace

Client > { type: EVENT, namespace: "/", data: ["foo"] }

    with a custom namespace

Server > { type: EVENT, namespace: "/admin", data: ["bar"] }

    with binary data

Client > { type: BINARY_EVENT, namespace: "/", data: ["baz", <Buffer <01 02 03 04>> ] }

Acknowledgement

The sender MAY include an event ID in order to request an acknowledgement from the receiver:

CLIENT                                                      SERVER

  │  ───────────────────────────────────────────────────────►  │
  │   { type: EVENT, namespace: "/", data: ["foo"], id: 12 }   │
  │  ◄───────────────────────────────────────────────────────  │
  │    { type: ACK, namespace: "/", data: ["bar"], id: 12 }    │

The receiver MUST respond with an ACK packet with the same event ID.

The payload is mandatory and MUST be an array (possibly empty).

Examples:

    with the main namespace

Client > { type: EVENT, namespace: "/", data: ["foo"], id: 12 }
Server > { type: ACK, namespace: "/", data: [], id: 12 }

    with a custom namespace

Server > { type: EVENT, namespace: "/admin", data: ["foo"], id: 13 }
Client > { type: ACK, namespace: "/admin", data: ["bar"], id: 13 }

    with binary data

Client > { type: BINARY_EVENT, namespace: "/", data: ["foo", <buffer <01 02 03 04> ], id: 14 }
Server > { type: ACK, namespace: "/", data: ["bar"], id: 14 }

or

Server > { type: EVENT, namespace: "/", data: ["foo" ], id: 15 }
Client > { type: BINARY_ACK, namespace: "/", data: ["bar", <buffer <01 02 03 04>], id: 15 }

Disconnection from a namespace

At any time, one side can end the connection to a namespace by sending a DISCONNECT packet:

CLIENT                                                      SERVER

  │  ───────────────────────────────────────────────────────►  │
  │           { type: DISCONNECT, namespace: "/" }             │

No response is expected from the other side. The low-level connection MAY be kept alive if the client is connected to another namespace.
Packet encoding

This section details the encoding used by the default parser which is included in Socket.IO server and client, and whose source can be found here.

The JavaScript server and client implementations also supports custom parsers, which have different tradeoffs and may benefit to certain kind of applications. Please see socket.io-json-parser or socket.io-msgpack-parser for example.

Please also note that each Socket.IO packet is sent as a Engine.IO message packet (more information here), so the encoded result will be prefixed by the character "4" when sent over the wire (in the request/response body with HTTP long-polling, or in the WebSocket frame).
Format

<packet type>[<# of binary attachments>-][<namespace>,][<acknowledgment id>][JSON-stringified payload without binary]

+ binary attachments extracted

Note: the namespace is only included if it is different from the main namespace (/)
Examples
Connection to a namespace

    with the main namespace

Packet

{ type: CONNECT, namespace: "/" }

Encoded

0

    with a custom namespace

Packet

{ type: CONNECT, namespace: "/admin", data: { sid: "oSO0OpakMV_3jnilAAAA" } }

Encoded

0/admin,{"sid":"oSO0OpakMV_3jnilAAAA"}

    in case the connection is refused

Packet

{ type: CONNECT_ERROR, namespace: "/", data: { message: "Not authorized" } }

Encoded

4{"message":"Not authorized"}

Sending and receiving data

    with the main namespace

Packet

{ type: EVENT, namespace: "/", data: ["foo"] }

Encoded

2["foo"]

    with a custom namespace

Packet

{ type: EVENT, namespace: "/admin", data: ["bar"] }

Encoded

2/admin,["bar"]

    with binary data

Packet

{ type: BINARY_EVENT, namespace: "/", data: ["baz", <Buffer <01 02 03 04>> ] }

Encoded

51-["baz",{"_placeholder":true,"num":0}]

+ <Buffer <01 02 03 04>>

    with multiple attachments

Packet

{ type: BINARY_EVENT, namespace: "/admin", data: ["baz", <Buffer <01 02>>, <Buffer <03 04>> ] }

Encoded

52-/admin,["baz",{"_placeholder":true,"num":0},{"_placeholder":true,"num":1}]

+ <Buffer <01 02>>
+ <Buffer <03 04>>

Please remember that each Socket.IO packet is wrapped in a Engine.IO message packet, so they will be prefixed by the character "4" when sent over the wire.

Example: { type: EVENT, namespace: "/", data: ["foo"] } will be sent as 42["foo"]
Acknowledgement

    with the main namespace

Packet

{ type: EVENT, namespace: "/", data: ["foo"], id: 12 }

Encoded

212["foo"]

    with a custom namespace

Packet

{ type: ACK, namespace: "/admin", data: ["bar"], id: 13 }

Encoded

3/admin,13["bar"]`

    with binary data

Packet

{ type: BINARY_ACK, namespace: "/", data: ["bar", <Buffer <01 02 03 04>>], id: 15 }

Encoded

61-15["bar",{"_placeholder":true,"num":0}]

+ <Buffer <01 02 03 04>>

Disconnection from a namespace

    with the main namespace

Packet

{ type: DISCONNECT, namespace: "/" }

Encoded

1

    with a custom namespace

{ type: DISCONNECT, namespace: "/admin" }

Encoded

1/admin,

Sample session

Here is an example of what is sent over the wire when combining both the Engine.IO and the Socket.IO protocols.

    Request n°1 (open packet)

GET /socket.io/?EIO=4&transport=polling&t=N8hyd6w
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
0{"sid":"lv_VI97HAXpY6yYWAAAC","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":5000,"maxPayload":1000000}

Details:

0           => Engine.IO "open" packet type
{"sid":...  => the Engine.IO handshake data

Note: the t query param is used to ensure that the request is not cached by the browser.

    Request n°2 (namespace connection request):

POST /socket.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
40

Details:

4           => Engine.IO "message" packet type
0           => Socket.IO "CONNECT" packet type

    Request n°3 (namespace connection approval)

GET /socket.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
40{"sid":"wZX3oN0bSVIhsaknAAAI"}

    Request n°4

socket.emit('hey', 'Jude') is executed on the server:

GET /socket.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
42["hey","Jude"]

Details:

4           => Engine.IO "message" packet type
2           => Socket.IO "EVENT" packet type
[...]       => content

    Request n°5 (message out)

socket.emit('hello'); socket.emit('world'); is executed on the client:

POST /socket.io/?EIO=4&transport=polling&t=N8hzxke&sid=lv_VI97HAXpY6yYWAAAC
> Content-Type: text/plain; charset=UTF-8
42["hello"]\x1e42["world"]
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
ok

Details:

4           => Engine.IO "message" packet type
2           => Socket.IO "EVENT" packet type
["hello"]   => the 1st content
\x1e        => separator
4           => Engine.IO "message" packet type
2           => Socket.IO "EVENT" packet type
["world"]   => the 2nd content

    Request n°6 (WebSocket upgrade)

GET /socket.io/?EIO=4&transport=websocket&sid=lv_VI97HAXpY6yYWAAAC
< HTTP/1.1 101 Switching Protocols

WebSocket frames:

< 2probe                                        => Engine.IO probe request
> 3probe                                        => Engine.IO probe response
> 5                                             => Engine.IO "upgrade" packet type
> 42["hello"]
> 42["world"]
> 40/admin,                                     => request access to the admin namespace (Socket.IO "CONNECT" packet)
< 40/admin,{"sid":"-G5j-67EZFp-q59rADQM"}       => grant access to the admin namespace
> 42/admin,1["tellme"]                          => Socket.IO "EVENT" packet with acknowledgement
< 461-/admin,1[{"_placeholder":true,"num":0}]   => Socket.IO "BINARY_ACK" packet with a placeholder
< <binary>                                      => the binary attachment (sent in the following frame)
... after a while without message
> 2                                             => Engine.IO "ping" packet type
< 3                                             => Engine.IO "pong" packet type
> 1                                             => Engine.IO "close" packet type

History
Difference between v5 and v4

The 5th revision (current) of the Socket.IO protocol is used in Socket.IO v3 and above (v3.0.0 was released in November 2020).

It is built on top of the 4th revision of the Engine.IO protocol (hence the EIO=4 query parameter).

List of changes:

    remove the implicit connection to the default namespace

In previous versions, a client was always connected to the default namespace, even if it requested access to another namespace.

This is not the case anymore, the client must send a CONNECT packet in any case.

Commits: 09b6f23 (server) and 249e0be (client)

    rename ERROR to CONNECT_ERROR

The meaning and the code number (4) are not modified: this packet type is still used by the server when the connection to a namespace is refused. But we feel the name is more self-descriptive.

Commits: d16c035 (server) and 13e1db7c (client).

    the CONNECT packet now can contain a payload

The client can send a payload for authentication/authorization purposes. Example:

{
  "type": 0,
  "nsp": "/admin",
  "data": {
    "token": "123"
  }
}

In case of success, the server responds with a payload contain the ID of the Socket. Example:

{
  "type": 0,
  "nsp": "/admin",
  "data": {
    "sid": "CjdVH4TQvovi1VvgAC5Z"
  }
}

This change means that the ID of the Socket.IO connection will now be different from the ID of the underlying Engine.IO connection (the one that is found in the query parameters of the HTTP requests).

Commits: 2875d2c (server) and bbe94ad (client)

    the payload CONNECT_ERROR packet is now an object instead of a plain string

Commits: 54bf4a4 (server) and 0939395 (client)
Difference between v4 and v3

The 4th revision of the Socket.IO protocol is used in Socket.IO v1 (v1.0.3 was released in June 2014) and v2 (v2.0.0 was released in May 2017).

The details of the revision can be found here: https://github.com/socketio/socket.io-protocol/tree/v4

It is built on top of the 3rd revision of the Engine.IO protocol (hence the EIO=3 query parameter).

List of changes:

    add a BINARY_ACK packet type

Previously, an ACK packet was always treated as if it may contain binary objects, with recursive search for such objects, which could hurt performance.

Reference: https://github.com/socketio/socket.io-parser/commit/ca4f42a922ba7078e840b1bc09fe3ad618acc065
Difference between v3 and v2

The 3rd revision of the Socket.IO protocol is used in early Socket.IO v1 versions (socket.io@1.0.0...1.0.2) (released in May 2014).

The details of the revision can be found here: https://github.com/socketio/socket.io-protocol/tree/v3

List of changes:

    remove the usage of msgpack to encode packets containing binary objects (see also 299849b)

Difference between v2 and v1

List of changes:

    add a BINARY_EVENT packet type

This was added during the work towards Socket.IO 1.0, in order to add support for binary objects. The BINARY_EVENT packets were encoded with msgpack.
Initial revision

This first revision was the result of the split between the Engine.IO protocol (low-level plumbing with WebSocket / HTTP long-polling, heartbeat) and the Socket.IO protocol. It was never included in a Socket.IO release, but paved the way for the next iterations.
Test suite

The test suite in the test-suite/ directory lets you check the compliance of a server implementation.

Usage:

    in Node.js: npm ci && npm test
    in a browser: simply open the index.html file in your browser

For reference, here is expected configuration for the JavaScript server to pass all tests:

import { Server } from "socket.io";

const io = new Server(3000, {
  pingInterval: 300,
  pingTimeout: 200,
  maxPayload: 1000000,
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  socket.emit("auth", socket.handshake.auth);

  socket.on("message", (...args) => {
    socket.emit.apply(socket, ["message-back", ...args]);
  });

  socket.on("message-with-ack", (...args) => {
    const ack = args.pop();
    ack(...args);
  })
});

io.of("/custom").on("connection", (socket) => {
  socket.emit("auth", socket.handshake.auth);
});

Edit this page
Last updated on May 28, 2026
Previous
The Engine.IO protocol

    Introduction
    Exchange protocol
        Connection to a namespace
        Sending and receiving data
        Acknowledgement
        Disconnection from a namespace
    Packet encoding
        Format
        Examples
    Sample session
    History
        Difference between v5 and v4
        Difference between v4 and v3
        Difference between v3 and v2
        Difference between v2 and v1
        Initial revision



-   [](https://socket.io/)

-   Miscellaneous
-   The Engine.IO protocol

Version: 4.x

The Engine.IO protocol
======================

This document describes the version 4.1 of the Engine.IO protocol.

**Table of content**

-   [Introduction](https://socket.io/docs/v4/engine-io-protocol/#introduction)
-   [Transports](https://socket.io/docs/v4/engine-io-protocol/#transports)
    -   [HTTP long-polling](https://socket.io/docs/v4/engine-io-protocol/#http-long-polling)
        -   [Request path](https://socket.io/docs/v4/engine-io-protocol/#request-path)
        -   [Query parameters](https://socket.io/docs/v4/engine-io-protocol/#query-parameters)
        -   [Headers](https://socket.io/docs/v4/engine-io-protocol/#headers)
        -   [Sending and receiving data](https://socket.io/docs/v4/engine-io-protocol/#sending-and-receiving-data)
            -   [Sending data](https://socket.io/docs/v4/engine-io-protocol/#sending-data)
            -   [Receiving data](https://socket.io/docs/v4/engine-io-protocol/#receiving-data)
    -   [WebSocket](https://socket.io/docs/v4/engine-io-protocol/#websocket)
    -   [WebTransport](https://socket.io/docs/v4/engine-io-protocol/#webtransport)
-   [Protocol](https://socket.io/docs/v4/engine-io-protocol/#protocol)
    -   [Handshake](https://socket.io/docs/v4/engine-io-protocol/#handshake)
    -   [Heartbeat](https://socket.io/docs/v4/engine-io-protocol/#heartbeat)
    -   [Upgrade](https://socket.io/docs/v4/engine-io-protocol/#upgrade)
    -   [Message](https://socket.io/docs/v4/engine-io-protocol/#message)
-   [Packet encoding](https://socket.io/docs/v4/engine-io-protocol/#packet-encoding)
    -   [HTTP long-polling](https://socket.io/docs/v4/engine-io-protocol/#http-long-polling-1)
    -   [WebSocket](https://socket.io/docs/v4/engine-io-protocol/#websocket-1)
    -   [WebTransport](https://socket.io/docs/v4/engine-io-protocol/#webtransport-1)
-   [History](https://socket.io/docs/v4/engine-io-protocol/#history)
    -   [From v2 to v3](https://socket.io/docs/v4/engine-io-protocol/#from-v2-to-v3)
    -   [From v3 to v4](https://socket.io/docs/v4/engine-io-protocol/#from-v3-to-v4)
    -   [From v4 to v4.1](https://socket.io/docs/v4/engine-io-protocol/#from-v4-to-v41)
-   [Test suite](https://socket.io/docs/v4/engine-io-protocol/#test-suite)

Introduction
------------

The Engine.IO protocol enables [full-duplex](https://en.wikipedia.org/wiki/Duplex_(telecommunications)#FULL-DUPLEX) and low-overhead communication between a client and a server.

It is based on the [WebSocket protocol](https://en.wikipedia.org/wiki/WebSocket) and uses [HTTP long-polling](https://en.wikipedia.org/wiki/Push_technology#Long_polling) as fallback if the WebSocket connection can't be established.

The reference implementation is written in [TypeScript](https://www.typescriptlang.org/):

-   server: <https://github.com/socketio/socket.io/tree/main/packages/engine.io>
-   client: <https://github.com/socketio/socket.io/tree/main/packages/engine.io-client>

The [Socket.IO protocol](https://github.com/socketio/socket.io/blob/main/docs/socket.io-protocol/v5-current.md) is built on top of these foundations, bringing additional features over the communication channel provided by the Engine.IO protocol.

Transports
----------

The connection between an Engine.IO client and an Engine.IO server can be established with:

-   [HTTP long-polling](https://socket.io/docs/v4/engine-io-protocol/#http-long-polling)
-   [WebSocket](https://socket.io/docs/v4/engine-io-protocol/#websocket)
-   [WebTransport](https://socket.io/docs/v4/engine-io-protocol/#webtransport)

### HTTP long-polling

The HTTP long-polling transport (also simply referred as "polling") consists of successive HTTP requests:

-   long-running `GET` requests, for receiving data from the server
-   short-running `POST` requests, for sending data to the server

#### Request path

The path of the HTTP requests is `/engine.io/` by default.

It might be updated by libraries built on top of the protocol (for example, the Socket.IO protocol uses `/socket.io/`).

#### Query parameters

The following query parameters are used:

| Name | Value | Description |
| --- | --- | --- |
| `EIO` | `4` | Mandatory, the version of the protocol. |
| `transport` | `polling` | Mandatory, the name of the transport. |
| `sid` | `<sid>` | Mandatory once the session is established, the session identifier. |

If a mandatory query parameter is missing, then the server MUST respond with an HTTP 400 error status.

#### Headers

When sending binary data, the sender (client or server) MUST include a `Content-Type: application/octet-stream` header.

Without an explicit `Content-Type` header, the receiver SHOULD infer that the data is plaintext.

Reference: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type>

#### Sending and receiving data

##### Sending data

To send some packets, a client MUST create an HTTP `POST` request with the packets encoded in the request body:

```
CLIENT                                                 SERVER  │                                                      │  │   POST /engine.io/?EIO=4&transport=polling&sid=...   │  │ ───────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────┘ │  │                        HTTP 200                      │  │                                                      │
```

The server MUST return an HTTP 400 response if the session ID (from the `sid` query parameter) is not known.

To indicate success, the server MUST return an HTTP 200 response, with the string `ok` in the response body.

To ensure packet ordering, a client MUST NOT have more than one active `POST` request. Should it happen, the server MUST return an HTTP 400 error status and close the session.

##### Receiving data

To receive some packets, a client MUST create an HTTP `GET` request:

```
CLIENT                                                SERVER  │   GET /engine.io/?EIO=4&transport=polling&sid=...   │  │ ──────────────────────────────────────────────────► │  │                                                   . │  │                                                   . │  │                                                   . │  │                                                   . │  │ ◄─────────────────────────────────────────────────┘ │  │                       HTTP 200                      │
```

The server MUST return an HTTP 400 response if the session ID (from the `sid` query parameter) is not known.

The server MAY not respond right away if there are no packets buffered for the given session. Once there are some packets to be sent, the server SHOULD encode them (see [Packet encoding](https://socket.io/docs/v4/engine-io-protocol/#packet-encoding)) and send them in the response body of the HTTP request.

To ensure packet ordering, a client MUST NOT have more than one active `GET` request. Should it happen, the server MUST return an HTTP 400 error status and close the session.

### WebSocket

The WebSocket transport consists of a [WebSocket connection](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), which provides a bidirectional and low-latency communication channel between the server and the client.

The following query parameters are used:

| Name | Value | Description |
| --- | --- | --- |
| `EIO` | `4` | Mandatory, the version of the protocol. |
| `transport` | `websocket` | Mandatory, the name of the transport. |
| `sid` | `<sid>` | Optional, depending on whether it's an upgrade from HTTP long-polling or not. |

If a mandatory query parameter is missing, then the server MUST close the WebSocket connection.

Each packet (read or write) is sent its own [WebSocket frame](https://datatracker.ietf.org/doc/html/rfc6455#section-5).

A client MUST NOT open more than one WebSocket connection per session. Should it happen, the server MUST close the WebSocket connection.

### WebTransport

The WebTransport transport consists of a [WebTransport bidirectional stream](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API), which provides a bidirectional and low-latency communication channel between the server and the client.

From the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API):

> The WebTransport API provides a modern update to WebSockets, transmitting data between client and server using [HTTP/3 Transport](https://datatracker.ietf.org/doc/html/draft-ietf-webtrans-http3/). WebTransport provides support for multiple streams, unidirectional streams, and out-of-order delivery. It enables reliable transport via streams and unreliable transport via UDP-like datagrams.

A client MUST NOT open more than one WebTransport stream per session. Should it happen, the server MUST close the WebTransport session.

Note: the current version of the protocol does not make use of the query parameters because they are not part of the WebTransport specification and are an implementation detail. This might change in the future.

Protocol
--------

An Engine.IO packet consists of:

-   a packet type
-   an optional packet payload

Here is the list of available packet types:

| Type | ID | Usage |
| --- | --- | --- |
| open | 0 | Used during the [handshake](https://socket.io/docs/v4/engine-io-protocol/#handshake). |
| close | 1 | Used to indicate that a transport can be closed. |
| ping | 2 | Used in the [heartbeat mechanism](https://socket.io/docs/v4/engine-io-protocol/#heartbeat). |
| pong | 3 | Used in the [heartbeat mechanism](https://socket.io/docs/v4/engine-io-protocol/#heartbeat). |
| message | 4 | Used to send a payload to the other side. |
| upgrade | 5 | Used during the [upgrade process](https://socket.io/docs/v4/engine-io-protocol/#upgrade). |
| noop | 6 | Used during the [upgrade process](https://socket.io/docs/v4/engine-io-protocol/#upgrade). |

### Handshake

To establish a connection, the client MUST send an HTTP `GET` request to the server:

-   HTTP long-polling first (by default)

```
CLIENT                                                    SERVER  │                                                          │  │        GET /engine.io/?EIO=4&transport=polling           │  │ ───────────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────────┘ │  │                        HTTP 200                          │  │                                                          │
```

-   WebSocket-only session

```
CLIENT                                                    SERVER  │                                                          │  │        GET /engine.io/?EIO=4&transport=websocket         │  │ ───────────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────────┘ │  │               HTTP 101 Switching Protocols               │  │                                                          │
```

-   WebTransport-only session

For a WebTransport-only session, the client MUST first send an `open` packet on the bidirectional stream.

```
CLIENT                                                    SERVER  │        (WebTransport session + bidirectional stream)     │  │ ───────────────────────────────────────────────────────► │  │                                                          │  │                       0 (open packet)                    │  │ ───────────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────────  │  │                        0{"sid":"..."}                    │  │                                                          │
```

If the server accepts the connection, then it MUST respond with an `open` packet with the following JSON-encoded payload:

| Key | Type | Description |
| --- | --- | --- |
| `sid` | `string` | The session ID. |
| `upgrades` | `string[]` | The list of available [transport upgrades](https://socket.io/docs/v4/engine-io-protocol/#upgrade). |
| `pingInterval` | `number` | The ping interval, used in the [heartbeat mechanism](https://socket.io/docs/v4/engine-io-protocol/#heartbeat) (in milliseconds). |
| `pingTimeout` | `number` | The ping timeout, used in the [heartbeat mechanism](https://socket.io/docs/v4/engine-io-protocol/#heartbeat) (in milliseconds). |
| `maxPayload` | `number` | The maximum number of bytes per chunk, used by the client to aggregate packets into [payloads](https://socket.io/docs/v4/engine-io-protocol/#packet-encoding). |

Example:

```
{  "sid": "lv_VI97HAXpY6yYWAAAC",  "upgrades": ["websocket"],  "pingInterval": 25000,  "pingTimeout": 20000,  "maxPayload": 1000000}
```

The client MUST send the `sid` value in the query parameters of all subsequent requests.

### Heartbeat

Once the [handshake](https://socket.io/docs/v4/engine-io-protocol/#handshake) is completed, a heartbeat mechanism is started to check the liveness of the connection:

```
CLIENT                                                 SERVER  │                   *** Handshake ***                  │  │                                                      │  │  ◄─────────────────────────────────────────────────  │  │                           2                          │  (ping packet)  │  ─────────────────────────────────────────────────►  │  │                           3                          │  (pong packet)
```

At a given interval (the `pingInterval` value sent in the handshake) the server sends a `ping` packet and the client has a few seconds (the `pingTimeout` value) to send a `pong` packet back.

If the server does not receive a `pong` packet back, then it SHOULD consider that the connection is closed.

Conversely, if the client does not receive a `ping` packet within `pingInterval + pingTimeout`, then it SHOULD consider that the connection is closed.

### Upgrade

By default, the client SHOULD create an HTTP long-polling connection and then upgrade to better transports if available.

To upgrade to WebSocket (or WebTransport), the client MUST:

-   pause the HTTP long-polling transport (no more HTTP request gets sent), to ensure that no packet gets lost
-   open a WebSocket connection (or WebTransport bidirectional stream) with the same session ID
-   send a `ping` packet with the string `probe` in the payload

The server MUST:

-   send a `noop` packet to any pending `GET` request (if applicable) to cleanly close HTTP long-polling transport
-   respond with a `pong` packet with the string `probe` in the payload

Finally, the client MUST send a `upgrade` packet to complete the upgrade:

```
CLIENT                                                 SERVER  │                                                      │  │   GET /engine.io/?EIO=4&transport=websocket&sid=...  │  │ ───────────────────────────────────────────────────► │  │  ◄─────────────────────────────────────────────────┘ │  │            HTTP 101 (WebSocket handshake)            │  │                                                      │  │            -----  WebSocket frames -----             │  │  ─────────────────────────────────────────────────►  │  │                         2probe                       │ (ping packet)  │  ◄─────────────────────────────────────────────────  │  │                         3probe                       │ (pong packet)  │  ─────────────────────────────────────────────────►  │  │                         5                            │ (upgrade packet)  │                                                      │
```

### Message

Once the [handshake](https://socket.io/docs/v4/engine-io-protocol/#handshake) is completed, the client and the server can exchange data by including it in a `message` packet.

Packet encoding
---------------

The serialization of an Engine.IO packet depends on the type of the payload (plaintext or binary) and on the transport.

The character encoding is UTF-8 for plain text and for base64-encoded binary payloads.

### HTTP long-polling

Due to the nature of the HTTP long-polling transport, multiple packets might be concatenated in a single payload in order to increase throughput.

Format:

```
<packet type>[<data>]<separator><packet type>[<data>]<separator><packet type>[<data>][...]
```

Example:

```
4hello\x1e2\x1e4worldwith:4      => message packet typehello  => message payload\x1e   => separator2      => ping packet type\x1e   => separator4      => message packet typeworld  => message payload
```

The packets are separated by the [record separator character](https://en.wikipedia.org/wiki/C0_and_C1_control_codes#Field_separators): `\x1e`

Binary payloads MUST be base64-encoded and prefixed with a `b` character:

Example:

```
4hello\x1ebAQIDBA==with:4         => message packet typehello     => message payload\x1e      => separatorb         => binary prefixAQIDBA==  => buffer <01 02 03 04> encoded as base64
```

The client SHOULD use the `maxPayload` value sent during the [handshake](https://socket.io/docs/v4/engine-io-protocol/#handshake) to decide how many packets should be concatenated.

### WebSocket

Each Engine.IO packet is sent in its own [WebSocket frame](https://datatracker.ietf.org/doc/html/rfc6455#section-5).

Format:

```
<packet type>[<data>]
```

Example:

```
4hellowith:4      => message packet typehello  => message payload (UTF-8 encoded)
```

Binary payloads are sent as is, without modification.

### WebTransport

WebTransport being a stream-based transport, a header containing details about the payload is sent before the payload itself.

The structure of the header is heavily inspired by the [WebSocket framing](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2).

It depends on the length of the payload:

| Payload length (in bytes) | Header length (in bytes) | Details |
| --- | --- | --- |
| `<= 125` | 1 | `x` + the length encoded over 7 bits |
| `> 125` and `<= 65 535` | 3 | `x1111110` + the length encoded over 2 bytes |
| `> 65 535` | 9 | `x1111111` + the length encoded over 8 bytes |

The `x` bit indicates whether the payload contains plaintext (`0`) or binary (`1`) data.

Example:

`socket.send("hello")` will be sent as:

```
header: buffer <06>with:0       => plaintext payload0000110 => 6 bytespayload: buffer <34 68 65 6c 6c 6f>with:0x34 = ASCII "4", the Engine.IO MESSAGE packet type0x68 = "h"0x65 = "e"0x6c = "l"0x6c = "l"0x6f = "o"
```

History
-------

### From v2 to v3

-   add support for binary data

The [2nd version](https://github.com/socketio/engine.io-protocol/tree/v2) of the protocol is used in Socket.IO `v0.9` and below.

The [3rd version](https://github.com/socketio/engine.io-protocol/tree/v3) of the protocol is used in Socket.IO `v1` and `v2`.

### From v3 to v4

-   reverse ping/pong mechanism

The ping packets are now sent by the server, because the timers set in the browsers are not reliable enough. We suspect that a lot of timeout problems came from timers being delayed on the client-side.

-   always use base64 when encoding a payload with binary data

This change allows to treat all payloads (with or without binary) the same way, without having to take in account whether the client or the current transport supports binary data or not.

Please note that this only applies to HTTP long-polling. Binary data is sent in WebSocket frames with no additional transformation.

-   use a record separator (`\x1e`) instead of counting of characters

Counting characters prevented (or at least makes harder) to implement the protocol in other languages, which may not use the UTF-16 encoding.

For example, `€` was encoded to `2:4€`, though `Buffer.byteLength('€') === 3`.

Note: this assumes the record separator is not used in the data.

The 4th version is included in Socket.IO `v3.0.0` (November 2020) and above.

### From v4 to v4.1

WebTransport support was added.

The 4.1 version is included in Socket.IO `v4.6.0` (June 2023).

Test suite
----------

The test suite in the `test-suite/` directory lets you check the compliance of a server implementation.

Usage:

-   in Node.js: `npm ci && npm test`
-   in a browser: simply open the `index.html` file in your browser

For reference, here is expected configuration for the JavaScript server to pass all tests:

```
import { listen } from "engine.io";const server = listen(3000, {  pingInterval: 300,  pingTimeout: 200,  maxPayload: 1e6,  cors: {    origin: "*"  }});server.on("connection", socket => {  socket.on("data", (...args) => {    socket.send(...args);  });});
```

[Edit this page](https://github.com/socketio/socket.io-website/edit/main/docs/categories/08-Miscellaneous/eio-protocol.md)

Last updated on **Jun 3, 2026**

Glossary
========

We will list here the terms that are related to the Socket.IO ecosystem:

-   [Adapter](https://socket.io/docs/v4/glossary/#adapter)
-   [Engine.IO](https://socket.io/docs/v4/glossary/#engineio)
-   [Namespace](https://socket.io/docs/v4/glossary/#namespace)
-   [Room](https://socket.io/docs/v4/glossary/#room)
-   [Transport](https://socket.io/docs/v4/glossary/#transport)

Adapter
-------

An Adapter is a server-side component which is responsible for:

-   storing the relationships between the Socket instances and the [rooms](https://socket.io/docs/v4/rooms/)
-   broadcasting events to [all](https://socket.io/docs/v4/broadcasting-events/) (or a subset of) clients

Besides the [in-memory adapter](https://github.com/socketio/socket.io-adapter/) which is included by default with the Socket.IO server, there are currently 5 official adapters:

-   the [Redis adapter](https://socket.io/docs/v4/redis-adapter/)
-   the [Redis Streams adapter](https://socket.io/docs/v4/redis-streams-adapter/)
-   the [MongoDB adapter](https://socket.io/docs/v4/mongo-adapter/)
-   the [Postgres adapter](https://socket.io/docs/v4/postgres-adapter/)
-   the [Cluster adapter](https://socket.io/docs/v4/cluster-adapter/)

The in-memory adapter can be extended to add support for other messaging systems, like RabbitMQ or Google Pub/Sub for example.

Please see the documentation [here](https://socket.io/docs/v4/adapter/).

Engine.IO
---------

Engine.IO is an internal component of Socket.IO, which is responsible for establishing the low-level connection between the server and the client.

You will find more information [here](https://socket.io/docs/v4/how-it-works/).

Namespace
---------

A Namespace is a concept that allows splitting the application logic on the server-side.

Please see the documentation [here](https://socket.io/docs/v4/namespaces/).

Room
----

A Room is a server-side concept that allows broadcasting data to a subset of clients.

Please see the documentation [here](https://socket.io/docs/v4/rooms/).

Transport
---------

A Transport represents the low-level way of establishing a connection between the server and the client.

There are currently three implemented transports:

-   HTTP long-polling
-   [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
-   [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

Please see the documentation [here](https://socket.io/docs/v4/how-it-works/#transports).
### Difference between v5 and v4

The 5th revision (current) of the Socket.IO protocol is used in Socket.IO v3 and above (`v3.0.0` was released in November 2020).

It is built on top of the 4th revision of [the Engine.IO protocol](https://github.com/socketio/engine.io-protocol) (hence the `EIO=4` query parameter).

List of changes:

-   remove the implicit connection to the default namespace

In previous versions, a client was always connected to the default namespace, even if it requested access to another namespace.

This is not the case anymore, the client must send a `CONNECT` packet in any case.

Commits: [09b6f23](https://github.com/socketio/socket.io/commit/09b6f2333950b8afc8c1400b504b01ad757876bd) (server) and [249e0be](https://github.com/socketio/socket.io-client/commit/249e0bef9071e7afd785485961c4eef0094254e8) (client)

-   rename `ERROR` to `CONNECT_ERROR`

The meaning and the code number (4) are not modified: this packet type is still used by the server when the connection to a namespace is refused. But we feel the name is more self-descriptive.

Commits: [d16c035](https://github.com/socketio/socket.io/commit/d16c035d258b8deb138f71801cb5aeedcdb3f002) (server) and [13e1db7c](https://github.com/socketio/socket.io-client/commit/13e1db7c94291c583d843beaa9e06ee041ae4f26) (client).

-   the `CONNECT` packet now can contain a payload

The client can send a payload for authentication/authorization purposes. Example:

```
{  "type": 0,  "nsp": "/admin",  "data": {    "token": "123"  }}
```

In case of success, the server responds with a payload contain the ID of the Socket. Example:

```
{  "type": 0,  "nsp": "/admin",  "data": {    "sid": "CjdVH4TQvovi1VvgAC5Z"  }}
```

This change means that the ID of the Socket.IO connection will now be different from the ID of the underlying Engine.IO connection (the one that is found in the query parameters of the HTTP requests).

Commits: [2875d2c](https://github.com/socketio/socket.io/commit/2875d2cfdfa463e64cb520099749f543bbc4eb15) (server) and [bbe94ad](https://github.com/socketio/socket.io-client/commit/bbe94adb822a306c6272e977d394e3e203cae25d) (client)

-   the payload `CONNECT_ERROR` packet is now an object instead of a plain string

Commits: [54bf4a4](https://github.com/socketio/socket.io/commit/54bf4a44e9e896dfb64764ee7bd4e8823eb7dc7b) (server) and [0939395](https://github.com/socketio/socket.io-client/commit/09393952e3397a0c71f239ea983f8ec1623b7c21) (client)

### Difference between v4 and v3

The 4th revision of the Socket.IO protocol is used in Socket.IO v1 (`v1.0.3` was released in June 2014) and v2 (`v2.0.0` was released in May 2017).

The details of the revision can be found here: <https://github.com/socketio/socket.io-protocol/tree/v4>

It is built on top of the 3rd revision of [the Engine.IO protocol](https://github.com/socketio/engine.io-protocol) (hence the `EIO=3` query parameter).

List of changes:

-   add a `BINARY_ACK` packet type

Previously, an `ACK` packet was always treated as if it may contain binary objects, with recursive search for such objects, which could hurt performance.

Reference: <https://github.com/socketio/socket.io-parser/commit/ca4f42a922ba7078e840b1bc09fe3ad618acc065>

### Difference between v3 and v2

The 3rd revision of the Socket.IO protocol is used in early Socket.IO v1 versions (`socket.io@1.0.0...1.0.2`) (released in May 2014).

The details of the revision can be found here: <https://github.com/socketio/socket.io-protocol/tree/v3>

List of changes:

-   remove the usage of msgpack to encode packets containing binary objects (see also [299849b](https://github.com/socketio/socket.io-parser/commit/299849b00294c3bc95817572441f3aca8ffb1f65))

### Difference between v2 and v1

List of changes:

-   add a `BINARY_EVENT` packet type

This was added during the work towards Socket.IO 1.0, in order to add support for binary objects. The `BINARY_EVENT` packets were encoded with [msgpack](https://msgpack.org/).

### Initial revision

This first revision was the result of the split between the Engine.IO protocol (low-level plumbing with WebSocket / HTTP long-polling, heartbeat) and the Socket.IO protocol. It was never included in a Socket.IO release, but paved the way for the next iterations.

Test suite
----------

The test suite in the [`test-suite/`](https://github.com/socketio/socket.io-protocol/tree/main/test-suite) directory lets you check the compliance of a server implementation.

Usage:

-   in Node.js: `npm ci && npm test`
-   in a browser: simply open the `index.html` file in your browser

For reference, here is expected configuration for the JavaScript server to pass all tests:

```
import { Server } from "socket.io";const io = new Server(3000, {  pingInterval: 300,  pingTimeout: 200,  maxPayload: 1000000,  cors: {    origin: "*"  }});io.on("connection", (socket) => {  socket.emit("auth", socket.handshake.auth);  socket.on("message", (...args) => {    socket.emit.apply(socket, ["message-back", ...args]);  });  socket.on("message-with-ack", (...args) => {    const ack = args.pop();    ack(...args);  })});io.of("/custom").on("connection", (socket) => {  socket.emit("auth", socket.handshake.auth);});
```

[Edit this page](https://github.com/socketio/socket.io-website/edit/main/docs/categories/08-Miscellaneous/sio-protocol.md)

Last updated on **May 28, 2026**

[Skip to main content](https://socket.io/docs/v4/#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](https://socket.io/blog/npm-package-provenance/).

[

![Socket.IO logo](https://socket.io/images/logo.svg)

**Socket.IO**](https://socket.io/)

[Docs](https://socket.io/docs/v4/#)

-   [](https://socket.io/docs/v4/)

-   [](https://socket.io/docs/v4/tutorial/introduction)

-   [](https://socket.io/get-started/)

-   [](https://socket.io/docs/v4/emit-cheatsheet/)

[Server API](https://socket.io/docs/v4/server-api/)[Client API](https://socket.io/docs/v4/client-api/)

[Ecosystem](https://socket.io/docs/v4/#)

-   [](https://socket.io/docs/v4/troubleshooting-connection-issues/)

-   [](https://stackoverflow.com/questions/tagged/socket.io)

-   [](https://github.com/socketio/socket.io/discussions)

-   [](https://socketio-slackin.herokuapp.com/)

-   * * * * *

-   [](https://socket.io/blog)

-   [](https://twitter.com/SocketIO)

-   * * * * *

-   [](https://cdn.socket.io)

-   [](https://admin.socket.io)

[About](https://socket.io/docs/v4/#)

-   [](https://socket.io/docs/v4/faq/)

-   [](https://socket.io/docs/v4/changelog/)

-   [](https://github.com/orgs/socketio/projects/3)

-   [](https://opencollective.com/socketio)

[4.x](https://socket.io/docs/v4/)

-   [](https://socket.io/docs/v4/)

-   [](https://socket.io/docs/v3/)

-   [](https://socket.io/docs/v2/)

-   * * * * *

-   [](https://socket.io/docs/v4/changelog/)

[English](https://socket.io/docs/v4/#)

-   [](https://socket.io/docs/v4/)

-   [](https://socket.io/es/docs/v4/)

-   [](https://socket.io/fr/docs/v4/)

-   [](https://socket.io/pt-br/docs/v4/)

-   [](https://socket.io/zh-CN/docs/v4/)

[](https://github.com/socketio/socket.io)

[![Socket.IO logo](https://socket.io/images/logo.svg)**Socket.IO**](https://socket.io/)

-   [Documentation](https://socket.io/docs/v4/#)

    -   [Introduction](https://socket.io/docs/v4/)
    -   [How it works](https://socket.io/docs/v4/how-it-works/)
    -   [Delivery guarantees](https://socket.io/docs/v4/delivery-guarantees)
    -   [Connection state recovery](https://socket.io/docs/v4/connection-state-recovery)
    -   [Logging and debugging](https://socket.io/docs/v4/logging-and-debugging/)
    -   [Testing](https://socket.io/docs/v4/testing/)
    -   [Troubleshooting](https://socket.io/docs/v4/troubleshooting-connection-issues/)
    -   [TypeScript](https://socket.io/docs/v4/typescript/)
    -   [Memory usage](https://socket.io/docs/v4/memory-usage/)
-   [Server](https://socket.io/docs/v4/#)

-   [Client](https://socket.io/docs/v4/#)

-   [Events](https://socket.io/docs/v4/#)

-   [Adapters](https://socket.io/docs/v4/#)

-   [Advanced](https://socket.io/docs/v4/#)

-   [Migrations](https://socket.io/docs/v4/#)

-   [Miscellaneous](https://socket.io/docs/v4/#)

    -   [FAQ](https://socket.io/docs/v4/faq/)
    -   [Glossary](https://socket.io/docs/v4/glossary/)
    -   [The Engine.IO protocol](https://socket.io/docs/v4/engine-io-protocol/)
    -   [The Socket.IO protocol](https://socket.io/docs/v4/socket-io-protocol/)

-   [](https://socket.io/)

-   Documentation
-   Introduction

Version: 4.x

Introduction
============

tip

If you are new to Socket.IO, we recommend checking out our [tutorial](https://socket.io/docs/v4/tutorial/introduction).

What Socket.IO is
-----------------

Socket.IO is a library that enables **low-latency**, **bidirectional** and **event-based** communication between a client and a server.

![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2.png)

The Socket.IO connection can be established with different low-level transports:

-   HTTP long-polling
-   [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
-   [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

Socket.IO will automatically pick the best available option, depending on:

-   the capabilities of the browser (see [here](https://caniuse.com/websockets) and [here](https://caniuse.com/webtransport))
-   the network (some networks block WebSocket and/or WebTransport connections)

You can find more details about that in the ["How it works" section](https://socket.io/docs/v4/how-it-works/).

### Server implementations

| Language | Website |
| --- | --- |
| JavaScript (Node.js) | - [Installation steps](https://socket.io/docs/v4/server-installation/)\
- [API](https://socket.io/docs/v4/server-api/)\
- [Source code](https://github.com/socketio/socket.io) |
| JavaScript (Deno) | <https://github.com/socketio/socket.io-deno> |
| Java (Active development) | <https://github.com/socketio4j/netty-socketio> |
| Java | <https://github.com/mrniko/netty-socketio> |
| Java | <https://github.com/trinopoty/socket.io-server-java> |
| Python | <https://github.com/miguelgrinberg/python-socketio> |
| Golang | <https://github.com/googollee/go-socket.io> |
| Rust | <https://github.com/Totodore/socketioxide> |

### Client implementations

| Language | Website |
| --- | --- |
| JavaScript (browser, Node.js or React Native) | - [Installation steps](https://socket.io/docs/v4/client-installation/)\
- [API](https://socket.io/docs/v4/client-api/)\
- [Source code](https://github.com/socketio/socket.io-client) |
| JavaScript (for WeChat Mini-Programs) | <https://github.com/weapp-socketio/weapp.socket.io> |
| Java | <https://github.com/socketio/socket.io-client-java> |
| C++ | <https://github.com/socketio/socket.io-client-cpp> |
| Swift | <https://github.com/socketio/socket.io-client-swift> |
| Dart | <https://github.com/rikulo/socket.io-client-dart> |
| Python | <https://github.com/miguelgrinberg/python-socketio> |
| .Net | <https://github.com/doghappy/socket.io-client-csharp> |
| Rust | <https://github.com/1c3t3a/rust-socketio> |
| Kotlin | <https://github.com/icerockdev/moko-socket-io> |
| PHP | <https://github.com/ElephantIO/elephant.io> |
| Golang | <https://github.com/maldikhan/go.socket.io> |

What Socket.IO is not
---------------------

caution

Socket.IO is **NOT** a WebSocket implementation.

Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.

```
// WARNING: the client will NOT be able to connect!const socket = io("ws://echo.websocket.org");
```

If you are looking for a plain WebSocket server, please take a look at [ws](https://github.com/websockets/ws) or [µWebSockets.js](https://github.com/uNetworking/uWebSockets.js).

There are also [discussions](https://github.com/nodejs/node/issues/19308) for including a WebSocket server in the Node.js core.

On the client-side, you might be interested in the [robust-websocket](https://github.com/nathanboktae/robust-websocket) package.

caution

Socket.IO is not meant to be used in a background service for mobile applications.

The Socket.IO library keeps an open TCP connection to the server, which may result in a high battery drain for your users. Please use a dedicated messaging platform like [FCM](https://firebase.google.com/docs/cloud-messaging) for this use case.

Features
--------

Here are the features provided by Socket.IO over plain WebSockets:

### HTTP long-polling fallback

The connection will fall back to HTTP long-polling in case the WebSocket connection cannot be established.

This feature was the #1 reason people used Socket.IO when the project was created more than ten years ago (!), as the browser support for WebSockets was still in its infancy.

Even if most browsers now support WebSockets (more than [97%](https://caniuse.com/mdn-api_websocket)), it is still a great feature as we still receive reports from users that cannot establish a WebSocket connection because they are behind some misconfigured proxy.

### Automatic reconnection

Under some particular conditions, the WebSocket connection between the server and the client can be interrupted with both sides being unaware of the broken state of the link.

That's why Socket.IO includes a heartbeat mechanism, which periodically checks the status of the connection.

And when the client eventually gets disconnected, it automatically reconnects with an exponential back-off delay, in order not to overwhelm the server.

### Packet buffering

The packets are automatically buffered when the client is disconnected, and will be sent upon reconnection.

More information [here](https://socket.io/docs/v4/client-offline-behavior/#buffered-events).

### Acknowledgements

Socket.IO provides a convenient way to send an event and receive a response:

*Sender*

```
socket.emit("hello", "world", (response) => {  console.log(response); // "got it"});
```

*Receiver*

```
socket.on("hello", (arg, callback) => {  console.log(arg); // "world"  callback("got it");});
```

You can also add a timeout:

```
socket.timeout(5000).emit("hello", "world", (err, response) => {  if (err) {    // the other side did not acknowledge the event in the given delay  } else {    console.log(response); // "got it"  }});
```

### Broadcasting

On the server-side, you can send an event to [all connected clients](https://socket.io/docs/v4/broadcasting-events/) or [to a subset of clients](https://socket.io/docs/v4/rooms/):

```
// to all connected clientsio.emit("hello");// to all connected clients in the "news" roomio.to("news").emit("hello");
```

This also works when [scaling to multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/).

### Multiplexing

Namespaces allow you to split the logic of your application over a single shared connection. This can be useful for example if you want to create an "admin" channel that only authorized users can join.

```
io.on("connection", (socket) => {  // classic users});io.of("/admin").on("connection", (socket) => {  // admin users});
```

More on that [here](https://socket.io/docs/v4/namespaces/).

Common questions
----------------

### Is Socket.IO still needed today?

That's a fair question, since WebSockets are supported [almost everywhere](https://caniuse.com/mdn-api_websocket) now.

That being said, we believe that, if you use plain WebSockets for your application, you will eventually need to implement most of the features that are already included (and battle-tested) in Socket.IO, like [reconnection](https://socket.io/docs/v4/#automatic-reconnection), [acknowledgements](https://socket.io/docs/v4/#acknowledgements) or [broadcasting](https://socket.io/docs/v4/#broadcasting).

### What is the overhead of the Socket.IO protocol?

`socket.emit("hello", "world")` will be sent as a single WebSocket frame containing `42["hello","world"]` with:

-   `4` being Engine.IO "message" packet type
-   `2` being Socket.IO "message" packet type
-   `["hello","world"]` being the `JSON.stringify()`-ed version of the arguments array

So, a few additional bytes for each message, which can be further reduced by the usage of a [custom parser](https://socket.io/docs/v4/custom-parser/).

info

The size of the browser bundle itself is [`10.4 kB`](https://bundlephobia.com/package/socket.io-client) (minified and gzipped).

You can find the details of the Socket.IO protocol [here](https://socket.io/docs/v4/socket-io-protocol/).

### Something does not work properly, please help?

Please check our [Troubleshooting guide](https://socket.io/docs/v4/troubleshooting-connection-issues/).

Next steps
----------

-   [Get started example](https://socket.io/get-started/chat)
-   [Server installation](https://socket.io/docs/v4/server-installation/)
-   [Client installation](https://socket.io/docs/v4/client-installation/)

[Edit this page](https://github.com/socketio/socket.io-website/edit/main/docs/categories/01-Documentation/index.md)

Last updated on **May 28, 2026**

[

Next

How it works

](https://socket.io/docs/v4/how-it-works/)

-   [What Socket.IO is](https://socket.io/docs/v4/#what-socketio-is)
    -   [Server implementations](https://socket.io/docs/v4/#server-implementations)
    -   [Client implementations](https://socket.io/docs/v4/#client-implementations)
-   [What Socket.IO is not](https://socket.io/docs/v4/#what-socketio-is-not)
-   [Features](https://socket.io/docs/v4/#features)
    -   [HTTP long-polling fallback](https://socket.io/docs/v4/#http-long-polling-fallback)
    -   [Automatic reconnection](https://socket.io/docs/v4/#automatic-reconnection)
    -   [Packet buffering](https://socket.io/docs/v4/#packet-buffering)
    -   [Acknowledgements](https://socket.io/docs/v4/#acknowledgements)
    -   [Broadcasting](https://socket.io/docs/v4/#broadcasting)
    -   [Multiplexing](https://socket.io/docs/v4/#multiplexing)
-   [Common questions](https://socket.io/docs/v4/#common-questions)
    -   [Is Socket.IO still needed today?](https://socket.io/docs/v4/#is-socketio-still-needed-today)
    -   [What is the overhead of the Socket.IO protocol?](https://socket.io/docs/v4/#what-is-the-overhead-of-the-socketio-protocol)
    -   [Something does not work properly, please help?](https://socket.io/docs/v4/#something-does-not-work-properly-please-help)
-   [Next steps](https://socket.io/docs/v4/#next-steps)

Documentation

-   [Guide](https://socket.io/docs/v4/)
-   [Tutorial](https://socket.io/docs/v4/tutorial/introduction)
-   [Examples](https://socket.io/get-started/)
-   [Server API](https://socket.io/docs/v4/server-api/)
-   [Client API](https://socket.io/docs/v4/client-api/)

Help

-   [Troubleshooting](https://socket.io/docs/v4/troubleshooting-connection-issues/)
-   [Stack Overflow](https://stackoverflow.com/questions/tagged/socket.io)
-   [GitHub Discussions](https://github.com/socketio/socket.io/discussions)
-   [Slack](https://socketio-slackin.herokuapp.com/)

News

-   [Blog](https://socket.io/blog)
-   [Twitter](https://twitter.com/SocketIO)

Tools

-   [CDN](https://cdn.socket.io)
-   [Admin UI](https://admin.socket.io)

About

-   [FAQ](https://socket.io/docs/v4/faq/)
-   [Changelog](https://socket.io/docs/v4/changelog/)
-   [Roadmap](https://github.com/orgs/socketio/projects/3)
-   [Become a sponsor](https://opencollective.com/socketio)

Copyright © 2026 Socket.IO