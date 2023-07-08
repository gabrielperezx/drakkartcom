(function () {
	/* ----- ----- Funciones ----- ----- */

	function fullpageFW() {
		let fullpageFW = document.querySelector('#fullpage');
		if (document.body.contains(fullpageFW)) {
			var seccionesPagina = fullpage('#fullpage', {
				// ──────────────────────────────────────────────────
				//   :::::: Opciones Basicas
				// ──────────────────────────────────────────────────
				autoScrolling: true, // Se activa el scroll.
				fitToSection: false, // Acomoda el scroll automaticamente para que la seccion se muestre en pantalla.
				fitToSectionDelay: 300, // Delay antes de acomodar la seccion automaticamente.
				easing: 'easeInOutCubic', // Funcion de tiempo de la animacion.
				scrollingSpeed: 700, // Velocidad del scroll. Valores: en milisegundos.
				css3: true, // Si usara CSS3 o javascript.
				easingcss3: 'ease-out', // Curva de velocidad del efecto.
				loopBottom: false,
				scrollOverflow: false,
				normalScrollElements: '.productos__sa2-container',

				// ──────────────────────────────────────────────────
				//   :::::: Barra de navegación
				// ──────────────────────────────────────────────────
				menu: '#menu', // Menu de navegación.
				anchors: ['inicio', 'nosotros', 'productos', 'regalos'], // Anclas, las usamos para identificar cada seccion y poder acceder a ellas con el menu.
			});
		}
	}

	function productos() {
		let productos = document.querySelector('.productos');
		if (document.body.contains(productos)) {
			const productPopup = Swal.mixin({
				showConfirmButton: false,
				customClass: {
					htmlContainer: 'productos__sa2-html',
					popup: 'productos__sa2-popup',
					container: 'productos__sa2-container',
				},
			});

			const products = document.querySelectorAll('.productos__image'),
				productBrand = [' Metalica', ' Nirvana', ' Rolling Stone', ' One Piece', ' Moai', ' Thrasher', ' Travis Scott'],
				productPrice = [132, 312, 798, 95, 229, 150, 262];

			products.forEach((e, i) => {
				e.addEventListener('click', () => {
					productPopup.fire({
						html: '<div class="productos__animation"><div class="productos__first"><img class="productos__first-image" src="media/product-0' + (i + 1) + '.webp" alt=""></div><div class="productos__second"><div class="productos__info"><p class="productos__modelo"><span class="texto-negro">Franeja</span><span class="texto-primario">' + productBrand[i] + '</span></p><p class="productos__descripcion texto-negro">Lorem, ipsum dolor.</p><p class="productos__precio texto-negro">' + productPrice[i] + '</p></div></div></div>',
					});
					document.body.style.backgroundColor = 'black';
					productContainer = document.querySelector('.productos__sa2-container');
					productContainer.addEventListener('click', () => {
						setTimeout(function () {
							document.body.style.backgroundColor = 'white';
						}, 500);
					});
				});
			});
		}
	}

	function tShirtDesigner() {
		// 3 de marzo de 2010
		let tShirt = document.querySelector('.tshirt');
		if (document.body.contains(tShirt)) {
			let canvas = new fabric.Canvas('desingCanvas');
			const fileUpload = document.getElementById('fileUpload'),
				node = document.getElementById('desing_container'),
				node_button = document.getElementById('btn_dowload'),
				shirtImage = document.getElementById('shirtImage'),
				shirtColor = document.getElementById('shirtColor'),
				shirtView = document.getElementById('shirtView'),
				shirtArea = document.querySelector('.tshirt__area'),
				selectsShirt = document.querySelectorAll('.selectsShirt');

			function ifColorA() {
				if (shirtColor.value == 'black') {
					shirtArea.classList.add('border', 'border-2', 'border-white');
				} else {
					shirtArea.classList.add('border', 'border-2', 'border-black');
				}
			}

			function ifColorR() {
				if (shirtColor.value == 'black') {
					shirtArea.classList.remove('border', 'border-2', 'border-black');
				} else {
					shirtArea.classList.remove('border', 'border-2', 'border-white');
				}
			}

			selectsShirt.forEach((e) => {
				e.addEventListener('change', () => {
					let urlName = '../media/' + shirtColor.value + '-' + shirtView.value + '-shirt.webp';
					shirtImage.src = urlName;
				});
			});

			fileUpload.addEventListener(
				'change',
				function (e) {
					if (!fileUpload.value == '') {
						node_button.disabled = false;
						fileUpload.disabled = true;
					}

					ifColorA();

					var reader = new FileReader();

					reader.onload = function (event) {
						var imgObj = new Image();
						imgObj.src = event.target.result;

						// When the picture loads, create the image in Fabric.js
						imgObj.onload = function () {
							var img = new fabric.Image(imgObj);

							img.scaleToWidth(200);
							img.set({ borderColor: '#0000FF', cornerColor: '#0000FF' });
							canvas.centerObject(img);
							canvas.add(img);
							canvas.renderAll();
						};
					};

					// If the user selected a picture, load it
					if (e.target.files[0]) {
						reader.readAsDataURL(e.target.files[0]);
					}
				},
				false
			);

			document.addEventListener(
				'keydown',
				function (e) {
					var keyCode = e.keyCode;

					if (keyCode == 46 || keyCode == 8) {
						canvas.remove(canvas.getActiveObject());
						fileUpload.disabled = false;
						node_button.disabled = true;
						fileUpload.value = null;
					}
				},
				false
			);

			node_button.addEventListener('click', () => {
				ifColorR();
				domtoimage.toJpeg(node, { quality: 1 }).then(function (dataUrl) {
					var link = document.createElement('a');
					link.download = 'drakkart-desing.jpeg';
					link.href = dataUrl;
					link.click();
				});
			});

			shirtArea.addEventListener('mouseover', () => {
				ifColorA();
			});

			shirtArea.addEventListener('mouseleave', () => {
				ifColorR();
				canvas.discardActiveObject().renderAll();
			});

			canvas.on('object:moving', function (e) {
				var obj = e.target;
				// if object is too big ignore
				if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
					return;
				}
				obj.setCoords();
				// top-left  corner
				if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
					obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
					obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
				}
				// bot-right corner
				if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
					obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
					obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
				}
			});
		}
	}

	/* ----- ----- Declaraciones ----- ----- */
	fullpageFW();
	productos();

	window.onload = function () {
		tShirtDesigner();
	};
})();
