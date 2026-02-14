import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ChatHeader } from "../components/ChatHeader";
import React from "react";

test("ChatHeader renders app title", () => {
  const html = renderToStaticMarkup(
    <ChatHeader
      status="connected"
      onLogout={() => {}}
    />
  );
  assert.match(html, /RealTime Chat App/);
});

test("ChatHeader renders logout button", () => {
  const html = renderToStaticMarkup(
    <ChatHeader
      status="connected"
      onLogout={() => {}}
    />
  );
  assert.match(html, /Logout/);
});
