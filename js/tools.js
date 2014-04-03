var wayNextSpeed    = 500;  // скорость прокрутки "Следующие этапы производства"

(function($) {

    $(document).ready(function() {

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

        $('.content-input').each(function() {
            if ($(this).find('input').val() == '') {
                $(this).find('span').show();
            }
        });

        $('.content-input input').focus(function() {
            $(this).parent().find('span').hide();
        });

        $('.content-input input').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').show();
            }
        });

        $('.content-input-file input').change(function() {
            $(this).parent().find('span').html($(this).val());
        });

        // "Следующие этапы производства"
        $('.way-next-slider').each(function() {
            $('.way-next-slider').data('curIndex', 0);
            $('.way-next-slider').data('disableAnimation', false);
            if ($('.way-next-slider-item').length < 3) {
                $('.way-next-down').addClass('disabled');
            }
        });

        $('.way-next-down').click(function() {
            if (!$(this).hasClass('disabled')) {
                if (!$('.way-next-slider').data('disableAnimation')) {
                    $('.way-next-slider').data('disableAnimation', true);
                    $('.way-next-up').removeClass('disabled');
                    var curIndex = $('.way-next-slider').data('curIndex');
                    curIndex++;
                    if (curIndex + 2 == $('.way-next-slider-item').length) {
                        $('.way-next-down').addClass('disabled');
                    }
                    $('.way-next-slider').data('curIndex', curIndex);

                    var curTop = Number($('.way-next-slider-content').css('top').replace(/px/, ''));
                    var curHeight = $('.way-next-slider-item').eq(curIndex - 1).height() + 2;
                    $('.way-next-slider-content').animate({'top': curTop - curHeight}, wayNextSpeed, function() {
                        $('.way-next-slider').data('disableAnimation', false);
                    });
                }
            }
            return false;
        });

        $('.way-next-up').click(function() {
            if (!$(this).hasClass('disabled')) {
                if (!$('.way-next-slider').data('disableAnimation')) {
                    $('.way-next-slider').data('disableAnimation', true);
                    $('.way-next-down').removeClass('disabled');
                    var curIndex = $('.way-next-slider').data('curIndex');
                    curIndex--;
                    if (curIndex == 0) {
                        $('.way-next-up').addClass('disabled');
                    }
                    $('.way-next-slider').data('curIndex', curIndex);

                    var curTop = Number($('.way-next-slider-content').css('top').replace(/px/, ''));
                    var curHeight = $('.way-next-slider-item').eq(curIndex).height() + 2;
                    $('.way-next-slider-content').animate({'top': curTop + curHeight}, wayNextSpeed, function() {
                        $('.way-next-slider').data('disableAnimation', false);
                    });
                }
            }
            return false;
        });

        // форма "Задать вопрос"
        $('.expert-btn a').click(function() {
            $('body').append('<div class="window-gallery-loading"><div></div></div>');
            $('#window-question-expert').show();
            $('#window-question-expert').css({'margin-top':-$('#window-question-expert').height() / 2});
            $('.window-gallery-loading').remove();
            return false;
        });

        // пример окна с текстом
        $('.expert-text-window').click(function() {
            $('#window-text').show();
            $('#window-text').css({'margin-top':-$('#window-text').height() / 2});
            return false;
        });

        $('.window-close').click(function() {
            $('.window').hide();
            $('.window-gallery-loading').remove();
            return false;
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.window').length == 0) {
                $('.window').hide();
            }
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

        //видео
        $('.video-item a').click(function () {
            var curLink = $(this);
            var curIndex = $('.gallery-item a').index(curLink);
            $('.window-gallery').data('curIndex', curIndex);
            var el = document.createElement("iframe");
            document.body.appendChild(el);
            el.id = 'iframe';
            el.src = curLink.attr('href');
            $('.window-gallery-big').html('');
            $('.window-gallery-big').append(el);
            $('.window-gallery-title').html(curLink.attr('title'));
            $('.window-gallery-download a').attr('href', curLink.attr('rel'));
            $('.window-gallery-loading').remove();
            $('.window').show();
            $('.window').css({ 'margin-top': -$('.window').height() / 2 });
            $('.window').css({ 'margin-left': -$('.window').width() / 2 });

            return false;
        });

        // фотогалерея
        $('.gallery-item a').click(function() {
            var curLink = $(this);
            if (curLink.parents().filter('.video-item').length == 0) {
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
            }

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
            if ($('.product-other-content ul li').length < 5) {
                $('.product-other-up').hide();
                $('.product-other-down').hide();
            }
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

        $('#question-expert').submit(function() {
            if ($('#question-expert input[name="theme"]').val() == '0') {
                $('#window-error .window-error-text').html('Выберите тему');
                $('#window-question-expert').hide();
                $('#window-error').show();
                $('#window-error').css({'margin-top':-$('#window-error').height() / 2});
                window.setTimeout(function() {
                    $('#window-error').hide();
                    $('#window-question-expert').show();
                }, 2000);
            } else {
                if ($('#question-expert input[name="expert"]').val() == '0') {
                    $('#window-error .window-error-text').html('Выберите эксперта');
                    $('#window-question-expert').hide();
                    $('#window-error').show();
                    $('#window-error').css({'margin-top':-$('#window-error').height() / 2});
                    window.setTimeout(function() {
                        $('#window-error').hide();
                        $('#window-question-expert').show();
                    }, 2000);
                } else {
                    if (!(/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test($('#question-expert input[name="email"]').val())) {
                        $('#window-error .window-error-text').html('Введите корректный e-mail');
                        $('#window-question-expert').hide();
                        $('#window-error').show();
                        $('#window-error').css({'margin-top':-$('#window-error').height() / 2});
                        window.setTimeout(function() {
                            $('#window-error').hide();
                            $('#window-question-expert').show();
                        }, 2000);
                    } else {
                        if (($('#question-expert textarea[name="text"]').val() == '') || ($('#question-expert textarea[name="text"]').val() == 'Введите Ваш вопрос')) {
                            $('#window-error .window-error-text').html('Введите Ваш вопрос');
                            $('#window-question-expert').hide();
                            $('#window-error').show();
                            $('#window-error').css({'margin-top':-$('#window-error').height() / 2});
                            window.setTimeout(function() {
                                $('#window-error').hide();
                                $('#window-question-expert').show();
                            }, 2000);
                        } else {
                            $('#window-question-expert').hide();
                            $('#window-success').show();
                            $('#window-success').css({'margin-top':-$('#window-success').height() / 2});
                            window.setTimeout(function() {
                                $('#window-success').hide();
                            }, 5000);
                        }
                    }
                }
            }
            return false;
        });

        $('.expert-content-detail-link').click(function() {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);
            curLink.parent().parent().find('.expert-content-detail').slideToggle();
            return false;
        });

        $('.product-press-more-link a').click(function() {
            $(this).parent().hide();
            $('.product-press-more').slideDown();
            return false;
        });

        $('.product-video-ctrl a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.product-video-ctrl li').index(curLi);
                $('.product-video-ctrl li').removeClass('active');
                curLi.addClass('active');
                if (curIndex == 0) {
                    $('.product-video-play').html('<iframe width="605" height="360" src="http://www.youtube.com/embed/ryb21KEyYBw" frameborder="0" allowfullscreen></iframe>');
                    $('.product-video-play').show();
                    $('.product-video-frames').hide();
                } else {
                    $('.product-video-play').hide();
                    $('.product-video-play').html('1');
                    $('.product-video-frames').show();
                }
            }
            return false;
        });

        $('.product-video-frames-list').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', false);
            curSlider.find('ul').width(curSlider.find('li').length * 605);
            $('.product-video-frames-prev').hide();
        });

        $('.product-video-frames-next').click(function() {
            var curSlider = $('.product-video-frames-list');
            if (!curSlider.data('disableAnimation')) {
                curSlider.data('disableAnimation', true);

                $('.product-video-frames-detail-item').hide()

                var curIndex = curSlider.data('curIndex');
                curIndex++;
                $('.product-video-frames-prev').show();
                if (curIndex == curSlider.find('li').length) {
                    curIndex = curSlider.find('li').length - 1;
                }
                if (curIndex == curSlider.find('li').length - 1) {
                    $('.product-video-frames-next').hide();
                }
                curSlider.data('curIndex', curIndex);
                curSlider.find('ul').animate({'left': -curIndex * 605}, function() {
                    curSlider.data('disableAnimation', false);
                });
            }
            return false;
        });

        $('.product-video-frames-prev').click(function() {
            var curSlider = $('.product-video-frames-list');
            if (!curSlider.data('disableAnimation')) {
                curSlider.data('disableAnimation', true);

                $('.product-video-frames-detail-item').hide()

                var curIndex = curSlider.data('curIndex');
                curIndex--;
                $('.product-video-frames-next').show();
                if (curIndex == -1) {
                    curIndex = 0;
                }
                if (curIndex == 0) {
                    $('.product-video-frames-prev').hide();
                }
                curSlider.data('curIndex', curIndex);
                curSlider.find('ul').animate({'left': -curIndex * 605}, function() {
                    curSlider.data('disableAnimation', false);
                });
            }
            return false;
        });

        $('.product-video-frames-list a').click(function() {
            var curIndex = $('.product-video-frames-list a').index($(this));
            if ($('.product-video-frames-detail-item:eq(' + curIndex + ')').css('display') == 'block') {
                $('.product-video-frames-detail-item').hide();
            } else {
                $('.product-video-frames-detail-item').hide();
                $('.product-video-frames-detail-item').eq(curIndex).show();
            }
            return false;
        });

        $('.catalogue-rubric-1 a img, .catalogue-rubric-2 a img, .catalogue-rubric-3 a img, .catalogue-rubric-4 a img').load(function() {
            $(this).parent().css({'background': 'none'});
        });

        // gold poll
        $('.gold-3-poll-item span input:checked').parent().addClass('checked');
        $('.gold-3-poll-item div').click(function() {
            var curName = $(this).find('span input').attr('name');
            $('.gold-3-poll-item span input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).find('span').addClass('checked');
            $(this).find('span input').prop('checked', true).trigger('change');
        });

        $('.gold-3-poll-form form').submit(function() {
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.gold-3-poll-container').html(html);
                $('.gold-3-result').each(function() {
                    var curBlock = $(this);
                    var curWidth = curBlock.find('.gold-3-result-line div').width() + 10;
                    var newWidth = curBlock.find('.gold-3-result-line').width() * Number(curBlock.find('.gold-3-result-text span').html()) / 100;
                    if (curWidth > newWidth) {
                        newWidth = curWidth;
                    }
                    curBlock.find('.gold-3-result-line div').animate({'width': newWidth}, 1500);
                });
            });
            return false;
        });

        $('.header-search-link a').click(function() {
            $('.header-search-form').animate({'width': 171});
            $('.header-search-form-input input').focus();
            return false;
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.header-search').length == 0) {
                if ($('.header-search-form-input input').val() == '') {
                    $('.header-search-form').animate({'width': 0});
                }
            }
        });

    });

    $(document).ready(function() {
        $('.main-gold img').stop(true, true);
        $('.main-gold img').eq(1).fadeIn(3000, function() {
            $('.main-gold img').eq(2).fadeIn(3000, function() {
                $('.main-gold img').eq(1).hide();
                $('.main-gold img').eq(2).fadeOut(3000);
            });
        });
        window.setInterval(function() {
            $('.main-gold img').stop(true, true);
            $('.main-gold img').eq(1).fadeIn(3000, function() {
                $('.main-gold img').eq(2).fadeIn(3000, function() {
                    $('.main-gold img').eq(1).hide();
                    $('.main-gold img').eq(2).fadeOut(3000);
                });
            });
        }, 9000);
    });

    $(document).ready(function() {
        var mainSunSpeed = 4000;

        $('.main-sun').each(function() {
            $('.main-sun-bg-1 img').attr('src', $('.main-sun-bg-1 img').attr('src'));
            $('.main-sun-bg-1 img').load(function() {
                window.setTimeout(function() {
                    $('.main-sun-text-1').fadeOut(mainSunSpeed / 2, 'linear');
                    $('.main-sun-text-2').fadeIn(mainSunSpeed / 2, 'linear');
                }, mainSunSpeed / 2);
                $('.main-sun-bg-2').fadeIn(mainSunSpeed);
            });
        });
    });

    $(window).load(function() {
        if ($('.main-new-berry-img').length > 0) {
            var rotationNewBerry = function() {
                $('.main-new-berry-img').rotate({
                    animateTo: 15,
                    duration: 2000,
                    easing: $.easing.easeInQuad,
                    callback: function() {
                        $('.main-new-berry-img').rotate({
                            animateTo: -15,
                            duration: 2000,
                            easing: $.easing.easeInQuad,
                            callback: rotationNewBerry
                        });
                    }
                });
            }
            rotationNewBerry();
        }
    });

})(jQuery);