"use strict"

// Ждем загрузку контента
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const clouds = document.querySelector('.parallax-background__clouds');
		const mountains = document.querySelector('.parallax-background__mountains');
    const forest = document.querySelector('.parallax-background__forest');
    const human = document.querySelector('.parallax-background__human');

		// Коэффициенты
		const forClouds = 40;
    const forMountains = 20;
    const forForest = 30;
		const forHuman = 50;

		// Скорость анимации
		const speed = 0.08;

		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
      mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
      forest.style.cssText = `transform: translate(${positionX / forForest}%,${positionY / forForest}%);`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			// Получение ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// Ноль по середине
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});

		// Parallax при скролле

		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (_entries, _observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setBackgroundItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.gallary'));

		function setBackgroundItemsStyle(scrollTopProcent) {
			gallary.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
      human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 5}%);`;
      forest.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
		}


	}
}