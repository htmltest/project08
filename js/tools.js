var wayNextSpeed    = 500;  // скорость прокрутки "Следующие этапы производства"

(function($) {

    $(document).ready(function() {

        // Поиск
        $('.header-search-input input').focus(function() {
            if ($(this).val() == 'Поиск') {
                $(this).val('');
            }
        });

        $('.header-search-input input').blur(function() {
            if ($(this).val() == '') {
                $(this).val('Поиск');
            }
        });

        // Поделиться +
        $('.footer-social-more-link').click(function() {
            $('.footer-social-more-window').slideToggle();
            return false;
        });

        $('.footer-social-more-window-close').click(function() {
            $('.footer-social-more-window').slideUp();
            return false;
        });

        // стилизация селектов
        if ($('.content-select').length > 0) {
            var params = {
                changedEl: '.content-select select',
                visRows: 5,
                scrollArrows: true
            }
            cuSel(params);
        }

        // radio
        $('.content-form-radio span input:checked').parent().addClass('checked');
        $('.content-form-radio div').click(function() {
            var curName = $(this).find('span input').attr('name');
            $('.content-form-radio span input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).find('span').addClass('checked');
            $(this).find('span input').prop('checked', true).trigger('change');
        });

        // checkbox
        $('.content-form-checkbox span input:checked').parent().addClass('checked');
        $('.content-form-checkbox div').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('span input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
        });

        // "Следующие этапы производства"
        $('.way-next-slider').each(function() {
            $('.way-next-slider').data('curIndex', 0);
            if ($('.way-next-slider-item').length < 3) {
                $('.way-next-down').addClass('disabled');
            }
        });

        $('.way-next-down').click(function() {
            if (!$(this).hasClass('disabled')) {
                $('.way-next-up').removeClass('disabled');
                var curIndex = $('.way-next-slider').data('curIndex');
                curIndex++;
                if (curIndex + 3 == $('.way-next-slider-item').length) {
                    $('.way-next-down').addClass('disabled');
                }
                $('.way-next-slider').data('curIndex', curIndex);

                var curTop = Number($('.way-next-slider-content').css('top').replace(/px/, ''));
                var curHeight = $('.way-next-slider-item').eq(curIndex + 2).height();
                $('.way-next-slider-content').animate({'top': curTop - curHeight}, wayNextSpeed);
            }
            return false;
        });

        $('.way-next-up').click(function() {
            if (!$(this).hasClass('disabled')) {
                $('.way-next-down').removeClass('disabled');
                var curIndex = $('.way-next-slider').data('curIndex');
                curIndex--;
                if (curIndex == 0) {
                    $('.way-next-up').addClass('disabled');
                }
                $('.way-next-slider').data('curIndex', curIndex);

                var curTop = Number($('.way-next-slider-content').css('top').replace(/px/, ''));
                var curHeight = $('.way-next-slider-item').eq(curIndex + 3).height();
                $('.way-next-slider-content').animate({'top': curTop + curHeight}, wayNextSpeed);
            }
            return false;
        });

        // форма "Задать вопрос"
        $('.expert-btn a').click(function() {
            $('.window').show();
            $('.window').css({'margin-top':-$('.window').height() / 2});
            return false;
        });

        $('.window-close').click(function() {
            $('.window').hide();
            $('.window-gallery-loading').remove();
            return false;
        });

        $('body').keypress(function(e) {
            if (e.keyCode == 27) {
                $('.window').hide();
                $('.window-gallery-loading').remove();
                $('.product-window').hide();
                if ($.browser.msie && $.browser.version < 8) {
                    $('.content').css({'z-index': 'auto', 'position': 'static'});
                }
            }
        });

        $('body').keydown(function(e) {
            if (e.keyCode == 27) {
                $('.window').hide();
                $('.window-gallery-loading').remove();
                $('.product-window').hide();
                if ($.browser.msie && $.browser.version < 8) {
                    $('.content').css({'z-index': 'auto', 'position': 'static'});
                }
            }
        });

        // фотогалерея
        $('.gallery-item a').click(function() {
            var curLink = $(this);
            var curIndex = $('.gallery-item a').index(curLink);
            $('.window-gallery').data('curIndex', curIndex);
            $('body').append('<div class="window-gallery-loading"><div></div><img src="' + curLink.attr('href') + '" /></div>');
            $('.window-gallery-big img').attr('src', curLink.attr('href'));
            $('.window-gallery-big img').load(function() {
                $('.window-gallery-title').html(curLink.attr('title'));
                $('.window-gallery-download a').attr('href', curLink.attr('rel'));
                $('.window-gallery-loading').remove();
                $('.window').show();
                $('.window').css({'margin-top': -$('.window').height() / 2});
                $('.window').css({'margin-left': -$('.window').width() / 2});
            });

            return false;
        });

        $('.window-gallery-prev').click(function() {
            var curIndex = $('.window-gallery').data('curIndex');
            curIndex--;
            if (curIndex < 0) {
                curIndex = $('.gallery-item a').length - 1;
            }
            $('.gallery-item a').eq(curIndex).trigger('click');
            return false;
        });

        $('.window-gallery-next').click(function() {
            var curIndex = $('.window-gallery').data('curIndex');
            curIndex++;
            if (curIndex >= $('.gallery-item a').length) {
                curIndex = 0;
            }
            $('.gallery-item a').eq(curIndex).trigger('click');
            return false;
        });

        // карусель в описании продукции
        $('.product-other').each(function() {
            $(this).data('curIndex', 0);
        });

        $('.product-other-up').click(function() {
            if (!$(this).hasClass('disabled')) {
                var curSlider = $('.product-other');
                var curIndex = curSlider.data('curIndex');
                curIndex--;
                $('.product-other-down').removeClass('disabled');
                if (curIndex <= 0) {
                    curIndex = 0;
                    $('.product-other-up').addClass('disabled');
                }
                curSlider.data('curIndex', curIndex);
                curSlider.find('ul').animate({'top': -curIndex * curSlider.find('li:first').height()}, wayNextSpeed);
            }
            return false;
        });

        $('.product-other-down').click(function() {
            if (!$(this).hasClass('disabled')) {
                var curSlider = $('.product-other');
                var curIndex = curSlider.data('curIndex');
                curIndex++;
                $('.product-other-up').removeClass('disabled');
                if (curIndex >= curSlider.find('li').length - 4) {
                    curIndex = curSlider.find('li').length - 4;
                    $('.product-other-down').addClass('disabled');
                }
                curSlider.data('curIndex', curIndex);
                curSlider.find('ul').animate({'top': -curIndex * curSlider.find('li:first').height()}, wayNextSpeed);
            }
            return false;
        });

        // ингридиенты
        $('.product-link-window').click(function() {
            $('.product-window').hide();
            $(this).parent().find('.product-window').show();
            if ($.browser.msie && $.browser.version < 8) {
                var curContent = $(this).parent().find('.product-window .product-window-content');
                curContent.css({'padding-top': (curContent.parent().height() - curContent.height()) / 2 + 'px'});
                $('.content').css({'z-index': '2', 'position': 'relative'});
            }
            return false;
        });

        $('.product-window-close').click(function() {
            $('.product-window').hide();
            if ($.browser.msie && $.browser.version < 8) {
                $('.content').css({'z-index': 'auto', 'position': 'static'});
            }
            return false;
        });

    });

})(jQuery);