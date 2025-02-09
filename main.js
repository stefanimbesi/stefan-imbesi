document.addEventListener("DOMContentLoaded", () => {
	console.log("Script Loaded - Waiting for Mouse Move");

	// Custom Cursor Logic
	const $bigBall = document.querySelector(".cursor__ball--big");
	const $smallBall = document.querySelector(".cursor__ball--small");
	const $hoverables = document.querySelectorAll("a, button, .hoverable");

	// Set cursor position correction
	gsap.set([$bigBall, $smallBall], {
		xPercent: -50,
		yPercent: -50,
		opacity: 0, // Ensure the cursor is hidden by default
		position: "fixed"
	});

	// Move cursor with the mouse
	document.addEventListener("mousemove", (e) => {
		const { clientX: x, clientY: y } = e;
		console.log(`Mouse X: ${x}, Mouse Y: ${y}`); // Debugging log

		// Show the cursor balls
		gsap.to([$bigBall, $smallBall], {
			opacity: 1, // Make the cursor visible
			duration: 0.1
		});

		// Move the cursor balls
		gsap.to($bigBall, {
			duration: 0.2,
			x: x,
			y: y
		});

		gsap.to($smallBall, {
			duration: 0.1,
			x: x,
			y: y
		});
	});

	// Hide cursor when leaving viewport
	document.addEventListener("mouseleave", () => {
		console.log("Mouse Left the Viewport"); // Debugging log
		gsap.to([$bigBall, $smallBall], { duration: 0.3, opacity: 0 });
	});

	// Show cursor when entering viewport
	document.addEventListener("mouseenter", () => {
		console.log("Mouse Entered the Viewport"); // Debugging log
		gsap.to([$bigBall, $smallBall], { duration: 0.3, opacity: 1 });
	});

	// Hover effects
	$hoverables.forEach((hoverable) => {
		hoverable.addEventListener("mouseenter", () => {
			console.log("Hovered Over an Element"); // Debugging log
			gsap.to($bigBall, { duration: 0.3, scale: 2 });
		});
		hoverable.addEventListener("mouseleave", () => {
			gsap.to($bigBall, { duration: 0.3, scale: 1 });
		});
	});

	// Click effect
	document.addEventListener("mousedown", () => {
		console.log("Mouse Down (Click)"); // Debugging log
		gsap.to($bigBall, { duration: 0.1, scale: 0.8 });
	});

	document.addEventListener("mouseup", () => {
		console.log("Mouse Up (Release Click)"); // Debugging log
		gsap.to($bigBall, { duration: 0.1, scale: 1 });
	});

	// Text Reveal Animation
	console.log("Starting Text Reveal Animation"); // Debugging log
	const tl = gsap.timeline();

	// Animate the name and title
	tl.to(".name span, .title span", {
		y: 0, // Move text to its original position
		opacity: 1, // Fade in
		ease: "power4.out",
		delay: 0.2, // Delay before animation starts
		stagger: 0.2, // Stagger between lines
		duration: 1.5 // Animation duration
	});

	// Check if the device is mobile (you can adjust the breakpoint as needed)
	const isMobile = window.matchMedia("(max-width: 768px)").matches;

	if (isMobile) {
		// Mobile: Animate three lines separately
		tl.to(
			".about-mobile span",
			{
				y: 0,
				opacity: 1,
				ease: "power4.out",
				duration: 1.5,
				stagger: 0.2
			},
			"-=1"
		); // Start this animation slightly before the previous one ends

		tl.set(
			".about-desktop span",
			{
				y: 0,
				opacity: 1
			},
			"-=1"
		);
	} else {
		// Desktop: Animate two lines together
		tl.to(
			".about-desktop span",
			{
				y: 0,
				opacity: 1,
				ease: "power4.out",
				duration: 1.5,
				stagger: 0.2
			},
			"-=1"
		); // Start this animation slightly before the previous one ends

		tl.set(
			".about-mobile span",
			{
				y: 0,
				opacity: 1
			},
			"-=1"
		);
	}

	// Animate the social links
	tl.to(
		".social-links span",
		{
			y: 0,
			opacity: 1,
			ease: "power4.out",
			stagger: 0.2,
			duration: 1.5
		},
		"-=1"
	); // Start this animation slightly before the previous one ends

	// Log when the animation is complete
	tl.call(() => {
		console.log("Text Reveal Animation Complete");
	});
});
