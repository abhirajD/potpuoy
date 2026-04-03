---
title: "Reversibility is a Design Property, Not a Fallback"
date: 2026-03-28
type: note
summary: "Treating reversibility as an afterthought inverts the correct order — it should be a first-class constraint that shapes decisions before they are made."
tags: ["mental-model", "tradeoffs"]
domain: ["decision-making"]
status: published
---

Most decisions are treated as reversible until they're not, at which point reversibility
is mourned as something that was lost rather than something that was never designed in.

The right framing: reversibility is a property you design for, or a property you sacrifice.
It is not a default state that erodes. It is a choice, usually made implicitly, usually
made early, almost always consequential later.

The test is simple. Before making a decision with structural implications, ask: what would
it cost to undo this? If the answer is unclear, the cost is probably high. If the answer
requires a sentence, the cost is probably acceptable. If the answer is "it's complicated,"
stop and make the cost explicit before proceeding.

This applies everywhere decisions accumulate: architecture, naming, data models, contractual
commitments, organizational structure, publishing infrastructure. In each case, the moment
you stop being able to answer the reversal question is the moment you've stopped designing
and started drifting.
