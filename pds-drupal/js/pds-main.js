Drupal.behaviors.modal = {
	attach(context) {
		const modals = document.querySelectorAll(".pds-modal");

		modals.forEach((modal) => {
			const modalId = modal.id;
			const modalNum = modalId.substring(modalId.indexOf("modal--") + 7);
			const openBtn = document.getElementById(`modalBtn--${modalNum}`);
			const currentModal = document.getElementById(`modal--${modalNum}`);
			const closeBtn = currentModal.querySelector(".pds-close-btn");

			// Open modal via open button.
			openBtn.addEventListener("click", (e) => {
				e.preventDefault();
				currentModal.style.display = "block";
				openBtn.disabled = true;
			});

			// Close modal via close button.
			closeBtn.addEventListener("click", (e) => {
				e.preventDefault();
				currentModal.style.display = "none";
				openBtn.disabled = false;
			});

			// Close modal via "esc" key.
			window.addEventListener("keydown", function (event) {
				if (event.key === "Escape") {
					currentModal.style.display = "none";
					openBtn.disabled = false;
				}
			});

			// Close modal by clicking outside of modal content area.
			window.onclick = function (e) {
				if (e.target == modal) {
					currentModal.style.display = "none";
					openBtn.disabled = false;
				}
			};
		});
	},
};

Drupal.behaviors.tabset = {
	attach(context) {
		const tabsetClass = "pds-tabset";

		const keys = {
			left: "ArrowLeft",
			right: "ArrowRight",
			home: "Home",
			end: "End",
		};

		let tabsets = document.querySelectorAll(`.${tabsetClass}`);
		tabsets = Array.prototype.slice.call(tabsets);

		tabsets.forEach((tabset) => {
			let tabs = tabset.querySelectorAll(`.${tabsetClass}__tab`);
			tabs = Array.prototype.slice.call(tabs);

			let panels = tabset.querySelectorAll(`.${tabsetClass}__panel`);
			panels = Array.prototype.slice.call(panels);

			tabs.forEach((tab) => {
				tab.addEventListener("keydown", handleKeys);

				tab.addEventListener("click", (event) => {
					const { currentTarget: currentTab } = event;
					const otherTabs = tabs.filter((element) => element !== currentTab);

					currentTab.removeAttribute("tabindex");
					currentTab.setAttribute("aria-selected", true);
					otherTabs.forEach((otherTab) => {
						otherTab.setAttribute("tabindex", "-1");
						otherTab.setAttribute("aria-selected", false);
					});

					const currentPanelId = currentTab.getAttribute("aria-controls");
					const currentPanel = document.querySelector(`#${currentPanelId}`);
					const otherPanels = panels.filter((element) => element !== currentPanel);

					currentPanel.removeAttribute("hidden");
					otherPanels.forEach((otherPanel) => {
						otherPanel.setAttribute("hidden", "hidden");
					});
				});
			});
		});

		function handleKeys(event) {
			let delay = false;

			const { key: currentKey, currentTarget: currentTab } = event;

			const {
				parentNode: { parentNode: currentTabpanel, children: tabs },
				previousElementSibling: previousElement,
				nextElementSibling: nextElement,
			} = currentTab;

			const firstTab = tabs[0];
			const lastTab = tabs[tabs.length - 1];

			const {
				dataset: { delay: hasDelay },
			} = currentTabpanel;

			delay = hasDelay !== undefined ? true : false;

			switch (currentKey) {
				case keys.left:
					if (!isTab(previousElement)) {
						activateTab(lastTab, delay);
					} else {
						activateTab(previousElement, delay);
					}
					event.preventDefault();
					break;
				case keys.right:
					if (!isTab(nextElement)) {
						activateTab(firstTab, delay);
					} else {
						activateTab(nextElement, delay);
					}
					event.preventDefault();
					break;
				case keys.home:
					activateTab(firstTab, delay);
					event.preventDefault();
					break;
				case keys.end:
					activateTab(lastTab, delay);
					event.preventDefault();
					break;
			}
		}

		function isTab(element) {
			return element && element.classList.contains(`${tabsetClass}__tab`);
		}

		function activateTab(element, delay) {
			if (delay) {
				setTimeout(function () {
					element.focus();
					element.click();
				}, 300);
			} else {
				element.focus();
				element.click();
			}
		}
	},
};
