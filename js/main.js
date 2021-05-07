// TOUCHSCREEN CHECK ==============================================================================
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touchscreen');
} else {
	document.body.classList.add('_desktop');
}
//=================================================================================================

//WEBP checkbrowser ===============================================================================
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
//=================================================================================================

// WINDOW RESIZE EVENTS ===========================================================================
var winWidth = $(window).outerWidth();

$(window).on('resize', function () {
	winWidth = $(this).outerWidth();

	blockTransfer(winWidth);
});
//=================================================================================================

// BLOCKS TRANSFER (adaptive) =====================================================================
function blockTransfer(winWidth) {
	var headerLogo = $('.header-logo');
	var headerTopInner = $('.header-top__inner');
	var headerMenuMobile = $('.header-menu__mobile');
	var headerMenuBTNs = $('.header-menu__mobile-btns');

	var headerMenu = $('.header-menu');
	var headerBTN = $('.header-btn');
	var headerPhone = $('.header-phone');
	var headerCallbackWrapper = $('.header-callback__wrapper');

	if (winWidth < 993) {
		headerMenu.appendTo(headerMenuMobile);
		headerBTN.appendTo(headerMenuBTNs);
		headerCallbackWrapper.insertAfter(headerLogo);
		headerPhone.insertAfter(headerLogo);
	} else {
		headerBTN.insertAfter(headerLogo);
		headerMenu.insertAfter(headerLogo);
		headerPhone.appendTo(headerTopInner);
		headerCallbackWrapper.appendTo(headerTopInner);
	}

	if (winWidth < 577) {
		headerCallbackWrapper.appendTo(headerMenuBTNs);
	}

	if (winWidth <= 480) {
		headerPhone.prependTo(headerMenuMobile);
	}
}
blockTransfer(winWidth);
//=================================================================================================

// HEADER BURGER ==================================================================================
$('.header-burger').on('click', function () {
	$(this).toggleClass('active');
	$('.header-menu__mobile').toggleClass('active');
});
//=================================================================================================

// START QUIZ =====================================================================================
var steps = $('.start-step');
var prevStepBTN = $('.start-step__prev');
var nextStepBTN = $('.start-step__next');

$('.start-step--current').fadeIn();
$('.start-step:first').addClass('start-step--first')
$('.start-step:last').addClass('start-step--last')

// создаем буллиты
var dotsParent = $('.start-steps__dots');

for (var i = 0; i < steps.length; i++) {
	var stepID = i + 1;

	$('<span class="start-steps__dot" data-step-id="' + stepID + '"></span>').appendTo(dotsParent);
}
$('.start-steps__dot:first').addClass('active');

nextStepBTN.on('click', function () {
	if ($('.start-step--current').hasClass('start-step--last')) {
		return;
	}

	var error = validateStartStepsInputs();

	if (error === 0) {
		prevStepBTN.removeClass('disabled');

		$('.start-steps__dot.active')
			.removeClass('active')
			.next('.start-steps__dot')
			.addClass('active')

		$('.start-step--current')
			.removeClass('start-step--current')
			.hide()
			.next('.start-step')
			.addClass('start-step--current')
			.fadeIn(300);

		if ($('.start-step--current').hasClass('start-step--last')) {
			nextStepBTN.addClass('disabled');
		}
	}
});

prevStepBTN.on('click', function () {
	if ($('.start-step--current').hasClass('start-step--first')) {
		return;
	}

	nextStepBTN.removeClass('disabled');

	$('.start-steps__dot.active')
		.removeClass('active')
		.prev('.start-steps__dot')
		.addClass('active')

	$('.start-step--current')
		.removeClass('start-step--current')
		.hide()
		.prev('.start-step')
		.addClass('start-step--current')
		.fadeIn(300);

	if ($('.start-step--current').hasClass('start-step--first')) {
		prevStepBTN.addClass('disabled');
	}
});

function validateStartStepsInputs() {
	var error = 0;
	var currentStepInputs = $('.start-step--current').find('.form-input');

	currentStepInputs.each(function () {
		if ($(this).val() == '') {
			$(this).parent().removeClass('confirmed');
			$(this).parent().addClass('error');
			error++;
		} else {
			$(this).parent().removeClass('error');
			$(this).parent().addClass('confirmed');
		}
	});

	return error;
}
//=================================================================================================

// SELECT STYLE ===================================================================================
$('.form-select').each(function () {
	var currentSelect = $(this);
	var currentOptionName = currentSelect.find('option:selected').text(); // отсюда берем имя изначально выбранного пункта
	var selectOption = currentSelect.find('option');
	var selectOptionLength = selectOption.length;

	// длительность анимации
	var duration = 300;

	// прячем настоящий SELECT
	currentSelect.hide();

	// создаем родителя для SELECT
	currentSelect.wrap('<div class="form-select__wrapper"></div>');

	// создаем родителя для фейкового списка SELECT с опеределенным плейсхолдером для стилизации
	$('<div>', {
		class: 'select-fake',
		html: '<span class="select-fake__label">' + currentOptionName + '</span>'
	}).insertAfter(currentSelect);
	var selectFake = currentSelect.next('.select-fake');

	// создаем фейковый список SELECT
	$('<ul>', { class: 'select-list' }).insertAfter(selectFake);
	var selectList = selectFake.next('.select-list');

	// создаем пункты списка в соответсвии с количеством OPTION из настоящего SELECT и подставляем их названия
	for (var i = 0; i < selectOptionLength; i++) {
		$('<li>', {
			class: 'select-item',
			html: $('<span>', {
				text: selectOption.eq(i).text()
			})
		})
			.attr('data-value', selectOption.eq(i).val())
			.appendTo(selectList);
	}

	// переменаая для всех пунктов из фейкового списка
	var selectItem = selectList.find('li');

	// присваиваем класс SELECTED нужному пункту из фейкового списка
	selectItem.each(function () {
		if ($(this).find('span').text() == currentSelect.find('option:selected').text()) {
			$(this).addClass('selected');
		}
	});

	// сворачиваем фейковый список
	selectList.slideUp(0);

	// разворачиваем фейковый список при клике на его родителя
	selectFake.on('click', function () {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			selectList.slideDown(duration);

			selectItem.off('mouseup', function () { });

			selectItem.on('mouseup', function () {
				var chooseItem = $(this).data('value');

				selectItem.removeClass('selected');
				$(this).addClass('selected');

				currentSelect.val(chooseItem).change();
				selectFake.find('.select-fake__label').text($(this).find('span').text());

				selectList.slideUp(duration);
				selectFake.removeClass('on');
			});

		} else {
			$(this).removeClass('on');
			selectList.slideUp(duration);
		}
	});
});
//=================================================================================================

// AIR-DATEPICKER =================================================================================
$.fn.datepicker.language['en'] = {
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	today: 'Today',
	clear: 'Clear',
	dateFormat: 'mm/dd/yyyy',
	timeFormat: 'hh:ii aa',
	firstDay: 1
};

$('.datepicker-here').datepicker({
	language: 'en',
	minDate: new Date(),
	autoClose: true
});
//=================================================================================================

// FORMS ==========================================================================================
$('form').on('submit', function (e) {
	e.preventDefault();
	var form = $(this);

	var error = formValidate(form);

	if (error === 0) {

		// скрипт отправки формы, если все норм

	} else {

		// если форма заполнена не корректно

	}
});

function formValidate(form) {
	var error = 0;
	var formRequiredFields = form.find('.req');

	formRequiredFields.each(function () {


		if ($(this).attr('type') == 'email') {
			if (emailValidation($(this))) {
				$(this).parent().addClass('error');

				error++;
			} else {
				$(this).parent().removeClass('error');
				$(this).parent().addClass('confirmed');
			}

		} else if ($(this).val() === '') {
			$(this).parent().addClass('error');

			error++;
		} else {
			$(this).parent().removeClass('error');
			$(this).parent().addClass('confirmed');
		}
	});

	return error;
}

// E-MAIL validation
function emailValidation(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val());
}
//=============================================================================================

// WHY US TABS ================================================================================
if ($('.whyus').length) {
	var whyusNavBTN = $('.whyus-nav__btn');

	whyusNavBTN.on('click', function () {
		if (!$(this).hasClass('active')) {
			var currentID = $(this).attr('data-whyus-id');
			var parent = $(this).parents('.whyus');

			parent.find('.whyus-content__item').slideUp(300);
			parent.find('.whyus-content__item[data-whyus-id=' + currentID + ']').slideDown(300);

			whyusNavBTN.removeClass('active');
			$(this).addClass('active');
		}
	});
}
//=============================================================================================

// STAR RATING ================================================================================
var starRating = $('.star-rating');

if(starRating.length) {
	starRating.each(function(){
		var currentValue = $(this).find('.star-rating__value').val();
		var currentValuePercent = currentValue / 0.05;

		$(this).find('.star-rating__result').css('width', currentValuePercent + '%');
	});
}
//=============================================================================================

// OWL SLIDER =================================================================================
// WHO SLIDER
var whoSlider = $('.who-slider');

if (whoSlider.length) {
	whoSlider.owlCarousel({
		lazyLoad: false,
		dots: false,
		nav: true,
		navContainer: false,
		items: 3,
		margin: 30,
		stagePadding: 0,
		center: false,
		startPosition: 0,
		loop: true,
		smartSpeed: 300,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		slideTransition: 'linear',
		responsive: {
			0: {
				//items:1
			},
			600: {
				//items:3
			},
			1000: {
				//items:5
			}
		}
	});
}



// =============================================
// TEAM SLIDER
var teamSlider = $('.team-slider');

var arrowLeftSVG = `
	<svg width="14" height="8" viewBox="0 0 14 8" fill="none">
		<path d="M0.246592 3.64645C0.0513305 3.84171 0.0513306 4.15829 0.246593 4.35355L3.42857 7.53553C3.62384 7.7308 3.94042 7.7308 4.13568 7.53553C4.33094 7.34027 4.33094 7.02369 4.13568 6.82843L1.30725 4L4.13568 1.17157C4.33094 0.976311 4.33094 0.659729 4.13568 0.464467C3.94042 0.269204 3.62384 0.269204 3.42857 0.464467L0.246592 3.64645ZM13.4001 3.5L0.600146 3.5L0.600146 4.5L13.4001 4.5L13.4001 3.5Z" fill="currentColor"/>
	</svg>
`;

var arrowRightSVG = `
	<svg width="14" height="8" viewBox="0 0 14 8" fill="none">
		<path d="M13.7537 4.35355C13.9489 4.15829 13.9489 3.84171 13.7537 3.64645L10.5717 0.464466C10.3764 0.269204 10.0598 0.269204 9.86456 0.464466C9.6693 0.659728 9.6693 0.976311 9.86456 1.17157L12.693 4L9.86456 6.82843C9.6693 7.02369 9.6693 7.34027 9.86456 7.53553C10.0598 7.7308 10.3764 7.7308 10.5717 7.53553L13.7537 4.35355ZM0.600098 4.5L13.4001 4.5V3.5L0.600098 3.5L0.600098 4.5Z" fill="currentColor"/>
	</svg>
`;

if (teamSlider.length) {
	teamSlider.owlCarousel({
		lazyLoad: false,
		dots: false,
		nav: true,
		navContainer: false,
		navText: [arrowLeftSVG, arrowRightSVG],
		items: 5,
		margin: 30,
		stagePadding: 0,
		center: true,
		startPosition: 0,
		loop: true,
		smartSpeed: 300,
		autoplay: true,
		autoplayTimeout: 8000,
		autoplayHoverPause: false,
		slideTransition: 'linear',
		responsive: {
			0: {
				//items:1
			},
			600: {
				//items:3
			},
			1000: {
				//items:5
			}
		}
	});
}
//=============================================================================================

// BAGUETTEBOX GALLERY ========================================================================
if ($('.baguettebox-gallery').length) {
	baguetteBox.run('.baguettebox-gallery');
}
//=============================================================================================

// YOUTUBE VIDEO ==============================================================================
// находим все блоки с классом видео
function findVideos() {
	var videos = document.querySelectorAll('.video');

	for (var i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

// настройки видео
function setupVideo(video) {
	var link = video.querySelector('.video-link');
	var videoPlayer = video.querySelector('.video-player');
	var id = parseVideoURL(link);

	video.addEventListener('click', function () {
		var iframe = createIframe(id);

		// при клике на новое видео - закрываются предыдущие
		var videoPlayers = document.querySelectorAll('.video-player');
		for (var j = 0; j < videoPlayers.length; j++) {
			videoPlayers[j].innerHTML = '';
		}

		videoPlayer.appendChild(iframe);
	});

	video.classList.add('video--enabled');
}

// получаем ID нужного видео из атрибута HREF элемента с классом .video-link
function parseVideoURL(link) {
	var regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
	var url = link.href;
	var match = url.match(regexp);

	return match[1];
}

// создаем iFrame с опеределенными атрибутами
function createIframe(id) {
	var iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video-iframe');

	return iframe;
}

// создаем ссылку на определенное видео для iFrame
function generateURL(id) {
	var query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
//=================================================================================================