import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import MessageList from "../components/MessageList";
import React from "react";

const messages = [
  {
    id: "m1",
    content: "Hello",
    senderId: "u1",
    receiverId: "u2",
    roomId: "r1",
    timestamp: new Date("2026-02-12T10:00:00.000Z").toISOString(),
  },
  {
    id: "m2",
    content: "Hi there",
    senderId: "u2",
    receiverId: "u1",
    roomId: "r1",
    timestamp: new Date("2026-02-12T10:01:00.000Z").toISOString(),
  },
];

test("MessageList renders message contents", () => {
  const html = renderToStaticMarkup(<MessageList messages={messages} currentUserId="u1" />);
  assert.match(html, /Hello/);
  assert.match(html, /Hi there/);
});

test("MessageList applies outgoing alignment class", () => {
  const html = renderToStaticMarkup(<MessageList messages={messages} currentUserId="u1" />);
  assert.match(html, /justify-end/);
});
