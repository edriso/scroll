# Doom Scroll

A simple visual about doom scrolling. A red swing boat hangs in the dark. Scroll and it swings. The more you scroll, the higher it goes. Stop, and it slowly comes back to rest.

## What it does

- A swing boat sits in the center of the screen, hanging from ropes
- Scrolling makes it swing
- The swing builds up speed the more you scroll
- It slows down naturally when you stop
- Short messages appear below the boat as the swing picks up
- The boat glows red at high speed

## How to run

Open `index.html` in any browser. No build step, no dependencies, nothing to install.

## The idea

The finger motion of scrolling up and down looks exactly like a swing. Same rhythm, same momentum, and the longer you go the harder it is to stop.

That dizzy feeling of going too high on a swing boat as a kid is not that different from what doom scrolling does to your brain. It just happens slower, and you do not notice until it is already done.

This project tries to make that invisible habit feel physical.

## SVG approach

The swing boat is inline SVG inside the HTML. This keeps it as a single file with no extra requests, lets CSS and JavaScript interact with it directly, and avoids issues with gradient IDs that would break in an external image file.
