Drupal.behaviors.modal = {
	attach(context) {
		const openBtn = document.getElementById("openBtn");
		const closeBtn = document.querySelector(".modal .close-btn");
		const modal = closeBtn.closest(".modal");

		// Open modal via open button.
		openBtn.addEventListener("click", (e) => {
			e.preventDefault();
			modal.style.display = "block";
			openBtn.style.display = "none";
		});

		// Close modal via close button.
		closeBtn.addEventListener("click", (e) => {
			e.preventDefault();
			modal.style.display = "none";
			openBtn.style.display = "block";
		});

		// Close modal via "esc" key.
		window.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				modal.style.display = "none";
				openBtn.style.display = "block";
			}
		});

		// Close modal by clicking outside of modal content area.
		window.onclick = function (e) {
			if (e.target == modal) {
				modal.style.display = "none";
				openBtn.style.display = "block";
			}
		};
	},
};
