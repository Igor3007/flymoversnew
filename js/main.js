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

// WINDOW EVENTS ==================================================================================
$(window).on('load', function() {
	testimonialsContentShowmore();
	setActiveTestimonialsContentOnLoad();
});

var winWidthOnLoad = $(window).outerWidth();
var winWidth = $(window).outerWidth();

$(window).on('resize', function () {
	winWidth = $(this).outerWidth();

	blockTransfer(winWidth);

	if (winWidthOnLoad !== winWidth) {
		testimonialsContentShowmore_reset();
		testimonialsContentShowmore();
	}
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
}
blockTransfer(winWidth);
//=================================================================================================

// HEADER BURGER ==================================================================================
$('.header-burger').on('click', function () {
	$(this).toggleClass('active');
	$('.header-menu__mobile').toggleClass('active');
	$('body').toggleClass('lock');
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

// WHY US TABS ================================================================================
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
//=============================================================================================

// STAR RATING ================================================================================
var starRating = $('.star-rating');

if (starRating.length) {
	starRating.each(function () {
		var currentValue = $(this).find('.star-rating__value').val();
		var currentValuePercent = currentValue / 0.05;

		$(this).find('.star-rating__result').css('width', currentValuePercent + '%');
	});
}
//=============================================================================================

// OWL SLIDER =================================================================================
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

// WHO SLIDER
var whoSlider = $('.who-slider');

if (whoSlider.length) {
	whoSlider.owlCarousel({
		lazyLoad: false,
		dots: false,
		nav: true,
		navContainer: false,
		navText: [arrowLeftSVG, arrowRightSVG],
		margin: 30,
		stagePadding: 0,
		center: false,
		startPosition: 0,
		loop: true,
		smartSpeed: 300,
		autoplay: true,
		autoplayTimeout: 8000,
		autoplayHoverPause: false,
		slideTransition: 'ease',
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 1
			},
			993: {
				items: 2
			},
			1200: {
				items: 3
			}
		}
	});
}

// =============================================
// TEAM SLIDER
var teamSlider = $('.team-slider');

if (teamSlider.length) {
	teamSlider.owlCarousel({
		lazyLoad: false,
		dots: false,
		nav: true,
		navContainer: false,
		navText: [arrowLeftSVG, arrowRightSVG],
		margin: 30,
		stagePadding: 0,
		center: true,
		startPosition: 0,
		loop: true,
		smartSpeed: 300,
		autoplay: true,
		autoplayTimeout: 8000,
		autoplayHoverPause: false,
		slideTransition: 'ease',
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			},
			993: {
				items: 4
			},
			1200: {
				items: 5
			},
		}
	});
}

// =============================================
// REVIEWS SLIDER
var reviewsSlider = $('.reviews-slider');

if (reviewsSlider.length) {
	reviewsSlider.owlCarousel({
		lazyLoad: false,
		dots: false,
		nav: true,
		navContainer: false,
		navText: [arrowLeftSVG, arrowRightSVG],
		margin: 30,
		stagePadding: 0,
		center: false,
		startPosition: 0,
		smartSpeed: 300,
		autoplay: false,
		slideTransition: 'ease',
		responsive: {
			0: {
				loop: false,
				items: 1
			},
			576: {
				loop: true,
				items: 2
			},
			768: {
				loop: false,
				items: 2
			},
			993: {
				loop: false,
				items: 2
			},
			1200: {
				loop: false,
				items: 3
			},
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
function findVideos() {
	var videos = document.querySelectorAll('.video');

	for (var i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}
findVideos();

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

// создаем URL видео для iFrame
function generateURL(id) {
	var query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}
//=================================================================================================

// TESTIMONIALS TABS ==============================================================================
var testimonialsNavBtn = $('.testimonials-nav__btn');

testimonialsNavBtn.on('click', function () {
	if (!$(this).hasClass('active')) {
		var parent = $(this).parents('.testimonials');
		var currentID = $(this).attr('data-testimonials-id');

		testimonialsContentShowmore_reset();

		testimonialsNavBtn.removeClass('active');
		$(this).addClass('active');

		if (currentID === 'all') {
			parent.find('.testimonials-item').slideUp(300);

			setTimeout(function () {
				parent.find('.testimonials-item').slideDown(300);
			}, 350);
		} else {
			parent.find('.testimonials-item').slideUp(300);

			setTimeout(function () {
				parent.find('.testimonials-item[data-testimonials-id="' + currentID + '"]').slideDown(300);
			}, 350);
		}
	}
});

// проверяем какая кнопка имеет класс active и отображаем соответствующий контент
function setActiveTestimonialsContentOnLoad() {
	var currentID = $('.testimonials-nav__btn.active').attr('data-testimonials-id');

	if(currentID == 'all') {
		$('.testimonials-item').slideUp(0);
		$('.testimonials-item').slideDown(0);
	} else {
		$('.testimonials-item').slideUp(0);
		$('.testimonials-item[data-testimonials-id="' + currentID + '"]').slideDown(0);
	}
}
//=================================================================================================

// TESTIMONIALS COMMENTS SHOWMORE BTN =============================================================
function testimonialsContentShowmore() {
	var testimonialsItemContentInner = $('.testimonials-item__content-inner');
	var testimonialsItemContentInner_height = testimonialsItemContentInner.outerHeight();
	var testimonialsItemContentInner_contentHeight = testimonialsItemContentInner.height();
	var testimonialsItemContentInner_paddings = (testimonialsItemContentInner_height - testimonialsItemContentInner_contentHeight);
	var testimonialsItemShowmoreBtn = $('.testimonials-item__comment-showmore-btn');

	testimonialsItemContentInner.each(function () {
		var currentCommentHeight = $(this).find('.testimonials-item__comment').outerHeight();

		if (testimonialsItemContentInner_contentHeight < currentCommentHeight) {
			$(this).addClass('showmore');
		} else {
			$(this).removeClass('showmore');
		}
	});

	testimonialsItemShowmoreBtn.off('click');
	testimonialsItemShowmoreBtn.on('click', function () {
		var currentWrapper = $(this).parents('.showmore');
		var currentCommentHeight = currentWrapper.find('.testimonials-item__comment').outerHeight();
	
		$(this).toggleClass('active');
	
		if ($(this).hasClass('active')) {
			currentWrapper.css('height', currentCommentHeight + 50 + testimonialsItemContentInner_paddings + 'px');	// 50 высота блока с кнопкой .testimonials-item__comment-showmore
			$(this).text('Hide');
		} else {
			currentWrapper.css('height', testimonialsItemContentInner_height + 'px');
			$(this).text('Show completely');
		}
	});
}

// закрываем все showmore (длинные) комментарии
function testimonialsContentShowmore_reset() {
	$('.testimonials-item__content-inner').removeAttr('style');
	$('.testimonials-item__comment-showmore-btn').removeClass('active').text('Show completely');
}
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

		//CHECKBOX
		if ($(this).attr('type') == 'checkbox') {
			if ($(this).is(':checked')) {
				$(this).parent().removeClass('error');
			} else {
				$(this).parent().addClass('error');
				error++;
			}
		}
	});

	return error;
}

// E-MAIL validation
function emailValidation(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val());
}
//=============================================================================================