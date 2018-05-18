$(document).ready(() => {

	const initDOM = () => {
		let basketContainer = ".ys-basket";

		let html = "";
		html += '<div class="ys-basket"><div class="header">';
		html += '<span>RASTGELE YEMEK</span><ul><li><a href="javascript: void(0);" class="getRandomOne"><i class="ys-icons ys-icons-Standard-icons-repeatable-white"></i></a></li></ul>';
		html += '</div>';
		html += '<div class="location">';
		html += '<a class="restaurantInfo restName" href="#">';
		html += 'YÜKLENİYOR';
		html += '</a>';
		html += '</div>';

		html += '<div class="noItem" style="border-bottom-left-radius: 0px;border-bottom-right-radius: 0px">';
		html += '<div style="clear:both;"></div>';
		html += '<img class="restLogo" style="float:left" src="https://www.yemeksepeti.com/assets/images/buttonLoading.gif" width="64"/>';
		html += '<ul style="float: right;width: 65%;">';
		html += '<li class="minimumPay"  style="display: inline-block;width: 100%;font-size:9px"> </li>';
		html += '<li class="speed"  style="display: inline-block;width: 100%;font-size:9px"> </li>';
		html += '<li class="flavour"  style="display: inline-block;width: 100%;font-size:9px"> </li>';
		html += '<li class="service"  style="display: inline-block;width: 100%;font-size:9px"> </span>';
		html += '</ul>';
		html += '<div style="clear:both;"></div>';
		html += '</div>';
		html += '<div class="itemList">';
		html += '<table>';
		html += '<tbody class="items"><tr><td class="item-name">';
		html += '<a href="javascript:void(0);" class="randomItemName">...</a>';
		html += '<span></span>';
		html += '</td>';
		html += '<td class="item-count">';
		html += '<span class="id-button d">-</span>';
		html += '<input type="text" name="txtCount" class="txtCount ys-input-mini" title="Ürün Adedi" disabled value="1">';
		html += '<span class="id-button i">+</span>';
		html += '</td>';
		html += '<td class="item-price randomItemPrice">';
		html += '... TL';
		html += '</td>';
		html += '<td class="item-actions">';
		html += '<a href="javascript:void(0);" class="item-actions-delete"><i class="ys-icons ys-icons-smallClose"></i></a>';
		html += '</td></tr></tbody>';
		html += '</table>';
		html += '<div class="actions">';
		html += '<button class="ys-btn ys-btn-block ys-btn-primary confirm-basket ys-btn-yellowerror addToBasketRandom">SEPETE EKLE</button>';
		html += '<span class="basketMessage descriptionRandom" style="margin:13px 0px;"></span>';
		html += '</div>';
		html += '</div>';
		html += '';
		html += '</div>';

		$(html).insertBefore(basketContainer);


	};

	initDOM();

	const getRandom = () => {

		const getCookie = (name) => {
			const cookieString=RegExp(""+name+"[^;]+").exec(document.cookie);
			return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,"") : ""); 
		}

		const tokens = {
			token: getCookie('loginToken'),
			areaId: getCookie('selectedAreaId'),
			catalogName: getCookie('catalogName')
		}

		const selected = {
			restaurant: {

			},
			menu: {

			}
		}

		const urls = {
			restaurants: 'https://service.yemeksepeti.com/YS.WebServices/CatalogService.svc/SearchRestaurants'
		}

		const restaurants = [

		]

		const menu = [

		]

		const fillDOM = () => {

			let logo = $(".restLogo");
			let restaurantName = $(".restName");
			let minimumPay = $(".minimumPay");
			let flavour = $(".flavour");
			let speed = $(".speed");
			let service = $(".service");
			let description = $(".descriptionRandom");
			let itemName = $(".randomItemName");
			let itemPrice = $(".randomItemPrice");
			let addToBasketRandom = $(".addToBasketRandom");


			logo.attr("src",selected.restaurant.img);
			restaurantName.html(selected.restaurant.name);
			restaurantName.attr("href",selected.restaurant.url);	
			minimumPay.html("Min. Paket Tutarı: " + selected.restaurant.minimumPay + " TL");
			speed.html("Hız: " + selected.restaurant.speed);
			flavour.html("Lezzet: " + selected.restaurant.flavour);
			service.html("Servis: " + selected.restaurant.serving);
			description.html(restaurants.length + " adet restoran ve " + menu.length + " adet ürün içinden bu ürün seçildi.");
			itemName.html(selected.menu.productName);
			itemPrice.html(selected.menu.price);
			addToBasketRandom.attr("onClick",'document.location.href = "https:' + selected.restaurant.url + '?' + selected.menu.productId + '"');

			


		}		


		const setRandomMenu = () => {
			if (menu.length >= 1) {
				selected.menu = menu[Math.floor(Math.random()*menu.length)];
				fillDOM();
			}
		}

		const getMenu = () => {
			if (selected.restaurant.hasOwnProperty('url')) {
				$.ajax({
					beforeSend: (request) => {
					// request.setRequestHeader("Origin",		"https://www.yemeksepeti.com");
					// request.setRequestHeader("User-Agent",	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 OPR/52.0.2871.99");
					request.setRequestHeader("Referer-Type","https://www.yemeksepeti.com");
				},
				url: selected.restaurant.url,
				//url:"https://www.yemeksepeti.com/waf-waf-waffle-more-bornova-kucukpark-izmir",
				success: (data) => {
					let selectableHTML = $(data);
					let products = selectableHTML.find(".listBody li");
					

					products.each((i,obj) => {
						let productName = $(obj).find(".table-row .productName a").html();
						let productId = $(obj).find(".table-row .productName a").data("product-id");
						let price = $(obj).find(".newPrice").html();
						let hasImageExpression = '<i class="ys-icons ys-icons-foto" data-imagepath="(.*?)" data-productname="(.*?)"></i>';

						if (typeof productName != "undefined") {
							
							let hasImage = productName.match(hasImageExpression);

							if (hasImage != null) {
								productName = hasImage[2];
							}

							let isCoke = productName.match("(Fanta|Ayran|Coca Cola|Cola|Kola|Su|Soda|Sprite|Cappy|Schweppes|Lipton|Şalgam|Gazoz|Fuse Tea|gazozu|Tea|Ice Tea)");

							if (isCoke == null) {
								if (parseFloat(selected.restaurant.minimumPay) <= parseFloat(price)) {
									menu.push({
										productName: productName,
										productId: productId,
										price: price
									});		
								}
							}		
						}

					});

					setTimeout(() => { setRandomMenu() },100);
				},
			});
			}
		}



		const setRestaurant = () => {
			if (restaurants.length >= 1) {
				selected.restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
				getMenu();
			}
		}



		$.ajax({
			type: "POST",
			url: urls.restaurants,
		// beforeSend: (request) => {
		// 	// request.setRequestHeader("Origin",		"https://www.yemeksepeti.com");
		// 	// request.setRequestHeader("User-Agent",	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 OPR/52.0.2871.99");
		// 	request.setRequestHeader("Content-Type","application/json");
		// 	request.setRequestHeader("Referer-Type","https://www.yemeksepeti.com");
		// },
		data: JSON.stringify({"ysRequest":{"PageNumber":"1","PageRowCount":"500","Token":tokens.token,"CatalogName":tokens.catalogName,"Culture":"tr-TR","LanguageId":"tr-TR"},"searchRequest":{"SortField":2,"SortDirection":1,"OpenOnly":true,"AreaId":tokens.areaId}}),
		success: (data) => {
			let list = data.d.ResultSet.searchResponseList;
			
			list.forEach((i,k) => {
				let isWater = i.DisplayName.match("(Su|Damacana|Nestle|Erikli|Sardes|Kaynak Su)");

				if (isWater == null) {
					restaurants.push({
						name:i.DisplayName,
						img:i.ImageFullPath.replace("/Category","Category"),
						time:i.DeliveryTime,
						flavour:i.DetailedFlavour,
						serving:i.DetailedServing,
						speed:i.DetailedSpeed,
						minimumPay:i.MinimumDeliveryPriceText,
						url:"//www.yemeksepeti.com" + i.SeoUrl

					});
				}
			});

			setTimeout(() => { setRestaurant() },100);

		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
	});

	}

	getRandom();

	$("body").on("click",".getRandomOne",function() {
		
		let logo = $(".restLogo");
		let restaurantName = $(".restName");
		let minimumPay = $(".minimumPay");
		let flavour = $(".flavour");
		let speed = $(".speed");
		let service = $(".service");
		let description = $(".descriptionRandom");
		let itemName = $(".randomItemName");
		let itemPrice = $(".randomItemPrice");
		let addToBasketRandom = $(".addToBasketRandom");


		logo.attr("src","https://www.yemeksepeti.com/assets/images/buttonLoading.gif");
		restaurantName.html("...");
		restaurantName.attr("href","...");	
		minimumPay.html("Min. Paket Tutarı: ... TL");
		speed.html("Hız: ...");
		flavour.html("Lezzet: ...");
		service.html("Servis: ...");
		description.html("...");
		itemName.html("...");
		itemPrice.html("...");
		addToBasketRandom.attr("onClick",'document.location.href = "#"');
		getRandom();

	});
	
});