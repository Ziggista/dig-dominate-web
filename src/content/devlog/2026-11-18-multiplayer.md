---
title: Multiplayer is in
date: 2026-11-18
build: in development
summary: Up to four lairs on one map, over LAN or a direct IP address, with pause, rejoin and a lobby with seats.
---

The first version of multiplayer is now in the game. It has passed our automated tests, and the next step is trying it between real PCs.

## How it works

- Open **Main menu > Multiplayer**, type your name, and choose **Host game** or **Join game**.
- One player hosts and the others connect to the host's address. On a home network that is the host's LAN address. Over the internet the host needs to forward a port.
- The host picks the map and how many seats are for people. Maps decide how many lairs fit: some take two, some three, and the largest take four.
- At least one seat is always a CPU rival, so a match can be one, two or three people plus CPU.
- The lobby shows every seat. Players press **Ready**, and the host presses **Start**.
- Up to four more people can join as spectators to watch without giving orders.

## When someone drops

- If a player's connection drops, the match pauses and waits for them to rejoin with **Rejoin match**.
- The host decides what happens next: keep waiting, close the seat, or hand the lair to a CPU rival.

## Still to come

- Online play through a game platform, so nobody has to type an IP address or forward a port.
- Team matches (two against two).
- A head-to-head duel between two people with no CPU on the map.
