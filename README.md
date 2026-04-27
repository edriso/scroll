# Doom Scroll

A simple visual representation of doom scrolling. A red swing boat hangs in the dark. Scroll, and it swings. The more you scroll, the higher it goes. Stop, and it slowly comes back to rest.

## What it does

- A swing boat sits in the center of the screen, hanging from ropes
- Scrolling makes it swing
- The swing builds up speed the more you scroll
- It slows down naturally when you stop
- Short messages appear below the boat as the swing picks up
- The boat glows red at high speed, reflecting the increasing intensity of doom scrolling

## How to run

Open `index.html` in any browser. No build step, no dependencies, nothing to install.

## The idea

The motion of scrolling up and down mirrors the movement of a swing. Same rhythm, same momentum, and the longer you go, the harder it is to stop.

That dizzy feeling of going too high on a swing boat as a kid is not that different from what doom scrolling does to your brain. It just happens more slowly, and you don’t notice until it’s already too late. Your focus shrinks, your mood dips, and you feel drained, but you can’t stop.

This project makes that invisible habit feel physical. It’s a slow, invisible ride that gradually wears you down.

## SVG approach

The swing boat is an inline SVG within the HTML. This keeps it as a single file with no extra requests, allowing CSS and JavaScript to interact with it directly and avoiding issues with gradient IDs that would break in an external image file.
