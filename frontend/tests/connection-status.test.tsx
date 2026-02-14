import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import ConnectionStatus from "../components/ConnectionStatus";
import React from "react";

test("ConnectionStatus renders connected label", () => {
  const html = renderToStaticMarkup(<ConnectionStatus status="connected" />);
  assert.match(html, /Connected/);
});

test("ConnectionStatus renders reconnecting label", () => {
  const html = renderToStaticMarkup(<ConnectionStatus status="reconnecting" />);
  assert.match(html, /Reconnecting/);
});

test("ConnectionStatus renders disconnected label", () => {
  const html = renderToStaticMarkup(<ConnectionStatus status="disconnected" />);
  assert.match(html, /Disconnected/);
});
