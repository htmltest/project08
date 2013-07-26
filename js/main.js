var canvas;
var ctx;

var distancePerPoint    = 10;
var drawFPS             = 50;
var prevScroll          = 0;
var curStep             = -1;
var countSteps          = 0;
var points              = [];
var timer;

var curAutoScroll       = 0;
var timerScroll;

(function($) {

    $(window).load(function() {

        canvas          = document.getElementById('main-line');
        ctx             = canvas.getContext('2d');
        ctx.lineWidth   = 2;
        ctx.strokeStyle = '#fff';

        countSteps = $('path').length;
        for (var i = 0; i < countSteps; i++) {
            $('path').eq(countSteps - i - 1).attr('id', 'path-' + i);
        }
        var rotationBerry = function() {
            $('.main-berry img').rotate({
                animateTo: 15,
                duration: 2000,
                easing: $.easing.easeInQuad,
                callback: function() {
                    $('.main-berry img').rotate({
                        animateTo: -15,
                        duration: 2000,
                        easing: $.easing.easeInQuad,
                        callback: rotationBerry
                    });
                }
            });
        }
        rotationBerry();

        var rotationShip = function() {
            $('.main-ship img').rotate({
                animateTo: 2,
                duration: 2000,
                easing: $.easing.easeInCirc,
                callback: function() {
                    $('.main-ship img').rotate({
                        animateTo: -2,
                        duration: 2000,
                        easing: $.easing.easeInCirc,
                        callback: rotationShip
                    });
                }
            });
        }
        rotationShip();

        var rotationLorryBody = function() {
            $('.main-lorry-body img').rotate({
                animateTo: 1,
                duration: 500,
                easing: $.easing.easeInOutCirc,
                callback: function() {
                    $('.main-lorry-body img').rotate({
                        animateTo: -1,
                        duration: 500,
                        easing: $.easing.easeOutBounce,
                        callback: rotationLorryBody
                    });
                }
            });
        }
        rotationLorryBody();

        var rotationLorryWheelLeft = function() {
            $('.main-lorry-wheel-left img').rotate({
                angle: 0,
                animateTo: 360,
                duration: 300,
                easing: $.easing.easeInCirc,
                callback: rotationLorryWheelLeft
            });
        }
        rotationLorryWheelLeft();

        var rotationLorryWheelRight = function() {
            $('.main-lorry-wheel-right img').rotate({
                angle: 0,
                animateTo: 360,
                duration: 300,
                easing: $.easing.easeInCirc,
                callback: rotationLorryWheelRight
            });
        }
        rotationLorryWheelRight();

        $('.main-auto').click(function() {
            curAutoScroll = $(window).scrollTop();
            nextScroll();
            return false;
        });

        $(document).bind('mousedown keydown', function() {
            window.clearTimeout(timerScroll);
            timerScroll = null;
        });

        $(window).bind('mousedown keydown', function() {
            window.clearTimeout(timerScroll);
            timerScroll = null;
        });

    });

    function nextScroll() {
        curAutoScroll += 6;
        $.scrollTo(curAutoScroll, {duration: 0});
        if ($(window).scrollTop() + $(window).height() < $('.wrapper').height()) {
            timerScroll = window.setTimeout(nextScroll, 10);
        }
    }

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

    $(window).bind('load scroll', function() {
        var curScroll = $(window).scrollTop();
        var curHeight = $(window).height();

        if (curScroll + curHeight > 1660) {
            if (curScroll > prevScroll) {
                var steps = Math.ceil((curScroll + curHeight - 1660) / 50);
                var stepsPrev = Math.ceil((curScroll - 1660) / 50) - 1;
                if (stepsPrev < 0) {
                    stepsPrev = 0;
                }
                if (steps > curStep) {
                    clearInterval(timer);
                    timer = null;
                    for (var i = stepsPrev; i < steps; i++) {
                        curStep = i;
                        if (curStep < countSteps) {
                            points = [];
                            buildPathPrev();
                        }
                    }
                    curStep = steps;
                    if (curStep < countSteps) {
                        points = [];
                        timer = setInterval(buildPath, 1000 / drawFPS);
                    }

                }
                prevScroll = curScroll;
            } else {
                var steps = Math.ceil((curScroll + curHeight - 1660) / 50);
                curStep = steps;
                clearInterval(timer);
                timer = null;
                ctx.clearRect(0, (curScroll + curHeight - 1660), 99999, 99999);
                prevScroll = curScroll;
            }
        }

        $('.main-banner-animation').css({'margin-right': -curScroll, 'margin-top': -curScroll});
        $('.main-gold, .main-gold-btn').css({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5});
        $('.main-way').css({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5});
        $('.main-scroll').css({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5});
        $('.main-auto').css({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5});
        $('.main-berry').css({'margin-top': -curScroll * 2});

        var curRate = 0;

        if (curScroll + curHeight > 912) {
            if (curScroll < 1468) {
                curRate = (curScroll + curHeight - 912) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-map').css({'opacity': curRate});
            }
        } else {
            $('.main-map').css({'opacity': 0});
        }

        if (curScroll + curHeight > 1224) {
            if (curScroll < 1423) {
                curRate = (curScroll + curHeight - 1224) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-belt').width(Math.round(curRate * 100) + '%');
            }
        } else {
            $('.main-belt').width(0);
        }

        if (curScroll + curHeight > 886) {
            if (curScroll < 1191) {
                curRate = (curScroll + curHeight - 886) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-1-photo-1').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 886) / (curHeight / 2))});
            }
        } else {
            $('.main-step-1-photo-1').css({'opacity': 0});
        }

        if (curScroll + curHeight > 985) {
            if (curScroll < 1156) {
                curRate = (curScroll + curHeight - 985) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-1-photo-2').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 886) / (curHeight / 2))});
            }
        } else {
            $('.main-step-1-photo-2').css({'opacity': 0});
        }

        if (curScroll + curHeight > 972) {
            if (curScroll < 1060) {
                curRate = (curScroll + curHeight - 972) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-1-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 886) / (curHeight / 2))});
            }
        } else {
            $('.main-step-1-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 1520) {
            if (curScroll < 1838) {
                curRate = (curScroll + curHeight - 1520) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-2-photo img').stop(true, true);
                    $('.main-step-2-photo img').eq(1).animate({'opacity': 1}, 300, function() {
                        $('.main-step-2-photo img').eq(2).animate({'opacity': 1}, 300, function() {
                            $('.main-step-2-photo img').eq(3).animate({'opacity': 1}, 300);
                        });
                    });
                } else {
                    $('.main-step-2-photo img:gt(0)').css({'opacity': 0});
                }
                $('.main-step-2-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 1520) / (curHeight / 2))});
            }
        } else {
            $('.main-step-2-photo').css({'opacity': 0});
            $('.main-step-2-photo img:gt(0)').css({'opacity': 0});
        }

        if (curScroll + curHeight > 1601) {
            if (curScroll < 1689) {
                curRate = (curScroll + curHeight - 1601) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-2-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 1601) / (curHeight / 2))});
            }
        } else {
            $('.main-step-2-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 1942) {
            if (curScroll < 2251) {
                curRate = (curScroll + curHeight - 1942) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-berry-step-2-3').css({'left': 1393 - (388 * curRate), 'top': 360 + (422 * curRate)});
                } else {
                    $('.main-berry-step-2-3').show();
                    $('.main-berry-step-2-3').css({'left': 1393 - (388 * curRate), 'top': 360 + (422 * curRate)});
                }
            }
        } else {
            $('.main-berry-step-2-3').hide();
        }

        if (curScroll + curHeight > 1942) {
            if (curScroll < 2251) {
                curRate = (curScroll + curHeight - 1942) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-3-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 1942) / (curHeight / 2))});
            }
        } else {
            $('.main-step-3-photo').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2076) {
            if (curScroll < 2164) {
                curRate = (curScroll + curHeight - 2076) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-3-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 2076) / (curHeight / 2))});
            }
        } else {
            $('.main-step-3-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2383) {
            if (curScroll < 2601) {
                curRate = (curScroll + curHeight - 2383) / (curHeight / 2);
                $('.main-berry-step-2-3').hide();
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-berry-step-3-4').css({'left': 1005 + (496 * curRate), 'top': 782 + (414 * curRate)});
                    if (curScroll + curHeight > 2759) {
                        $('.main-berry-step-3-4').hide();
                    }
                } else {
                    $('.main-berry-step-3-4').show();
                    $('.main-berry-step-3-4').css({'left': 1005 + (496 * curRate), 'top': 782 + (414 * curRate)});
                }
            }
        } else {
            $('.main-berry-step-3-4').hide();
        }

        if (curScroll + curHeight > 2283) {
            if (curScroll < 2601) {
                curRate = (curScroll + curHeight - 2283) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-4-photo img').stop(true, true);
                    $('.main-step-4-photo img').eq(1).animate({'opacity': 1}, 300, function() {
                        $('.main-step-4-photo img').eq(2).animate({'opacity': 1}, 300, function() {
                            $('.main-step-4-photo img').eq(3).animate({'opacity': 1}, 300);
                        });
                    });
                } else {
                    $('.main-step-4-photo img:gt(0)').css({'opacity': 0});
                }
                $('.main-step-4-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 2283) / (curHeight / 2))});
            }
        } else {
            $('.main-step-4-photo').css({'opacity': 0});
            $('.main-step-4-photo img:gt(0)').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2356) {
            if (curScroll < 2422) {
                curRate = (curScroll + curHeight - 2356) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-4-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 2356) / (curHeight / 2))});
            }
        } else {
            $('.main-step-4-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2759) {
            if (curScroll < 3081) {
                curRate = (curScroll + curHeight - 2759) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-5-photo-1').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 2759) / (curHeight / 2))});
            }
        } else {
            $('.main-step-5-photo-1').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2759) {
            if (curScroll < 3081) {
                curRate = (curScroll + curHeight - 2759) / (curHeight / 2);
                $('.main-berry-step-3-4').hide();
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-berry-step-4-5').css({'left': 1401 - (498 * curRate), 'top': 1023 + (476 * curRate)});
                    if (curScroll + curHeight > 3661) {
                        $('.main-berry-step-4-5').hide();
                    }
                } else {
                    if (curRate < 1 / 7) {
                        $('.main-berry-step-4-5').css({'background-position': 'left top'});
                    } else if (curRate < 1 / 7 * 2) {
                        $('.main-berry-step-4-5').css({'background-position': 'left -405px'});
                    } else if (curRate < 1 / 7 * 3) {
                        $('.main-berry-step-4-5').css({'background-position': 'left -810px'});
                    } else if (curRate < 1 / 7 * 4) {
                        $('.main-berry-step-4-5').css({'background-position': 'left -1215px'});
                    } else if (curRate < 1 / 7 * 5) {
                        $('.main-berry-step-4-5').css({'background-position': 'left -1620px'});
                    } else {
                        $('.main-berry-step-4-5').css({'background-position': 'left -2025px'});
                    }
                    $('.main-berry-step-4-5').hide();
                    $('.main-berry-step-4-5').show();
                    $('.main-berry-step-4-5').css({'left': 1401 - (498 * curRate), 'top': 1023 + (476 * curRate)});
                }
            }
        } else {
            $('.main-berry-step-4-5').hide();
        }

        if (curScroll + curHeight > 2725) {
            if (curScroll < 2874) {
                curRate = (curScroll + curHeight - 2725) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-5-photo-2').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 2759) / (curHeight / 2))});
            }
        } else {
            $('.main-step-5-photo-2').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2626) {
            if (curScroll < 2714) {
                curRate = (curScroll + curHeight - 2626) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-5-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 2759) / (curHeight / 2))});
            }
        } else {
            $('.main-step-5-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2828) {
            if (curScroll < 2872) {
                curRate = (curScroll + curHeight - 2828) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-6-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 2828) / (curHeight / 2))});
            }
        } else {
            $('.main-step-6-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 3150) {
            if (curScroll < 3575) {
                curRate = (curScroll + curHeight - 3150) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-map-2').css({'opacity': curRate});
            }
        } else {
            $('.main-map-2').css({'opacity': 0});
        }

        if (curScroll + curHeight > 3350) {
            if (curScroll < 3382) {
                curRate = (curScroll + curHeight - 3350) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-6-city').css({'opacity': curRate});
            }
        } else {
            $('.main-step-6-city').css({'opacity': 0});
        }

        if (curScroll + curHeight > 2828) {
            if (curScroll < 3077) {
                curRate = (curScroll + curHeight - 2828) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-ship').css({'margin-left': 2000 * (1 - curRate)});
            }
        } else {
            $('.main-ship').css({'margin-left': 0});
        }

        if (curScroll + curHeight > 3661) {
            if (curScroll < 3857) {
                curRate = (curScroll + curHeight - 3661) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-7-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 3661) / (curHeight / 2))});
            }
        } else {
            $('.main-step-7-photo').css({'opacity': 0});
        }

        if (curScroll + curHeight > 3661) {
            if (curScroll < 4008) {
                curRate = (curScroll + curHeight - 3661) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-7-video').css({'margin-top': 0});
                } else {
                    $('.main-step-7-video').css({'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 3661) / (curHeight / 2))});
                }
            }
        }

        if (curScroll + curHeight > 3661) {
            if (curScroll < 3727) {
                curRate = (curScroll + curHeight - 3661) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-7-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 3661) / (curHeight / 2))});
            }
        } else {
            $('.main-step-7-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 3261) {
            if (curScroll < 4008) {
                curRate = (curScroll + curHeight - 3261) / (curHeight / 2);
                $('.main-berry-step-4-5').hide();
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-berry-step-5-7').show();
                    $('.main-berry-step-5-7').css({'left': 1003 + (506 * curRate), 'top': 1600 + (787 * curRate)});
                    if (curScroll + curHeight > 4100) {
                        $('.main-berry-step-5-7').hide();
                    }
                } else {
                    $('.main-berry-step-5-7').show();
                    $('.main-berry-step-5-7').css({'left': 1003 + (506 * curRate), 'top': 1600 + (787 * curRate)});
                }
            }
        } else {
            $('.main-berry-step-5-7').hide();
        }

        if (curScroll + curHeight > 3957) {
            if (curScroll < 4219) {
                curRate = (curScroll + curHeight - 3957) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-8-video').css({'opacity': 1, 'margin-top': 0});
                } else {
                    $('.main-step-8-video').css({'opacity': 1, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 3957) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-8-video').css({'opacity': 1});
        }

        if (curScroll + curHeight > 3957) {
            if (curScroll < 4023) {
                curRate = (curScroll + curHeight - 3957) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-8-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 3957) / (curHeight / 2))});
            }
        } else {
            $('.main-step-8-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 4100) {
            if (curScroll < 4670) {
                curRate = (curScroll + curHeight - 4100) / (curHeight / 2);
                $('.main-berry-step-5-7').hide();
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-berry-step-7-8').show();
                    $('.main-berry-step-7-8').css({'left': 1550 - (583 * curRate), 'top': 2386 + (600 * curRate)});
                    if (curScroll + curHeight > 4670) {
                        $('.main-berry-step-7-8').hide();
                    }
                } else {
                    $('.main-berry-step-7-8').show();
                    $('.main-berry-step-7-8').css({'left': 1550 - (583 * curRate), 'top': 2386 + (600 * curRate)});
                }
            }
        } else {
            $('.main-berry-step-7-8').hide();
        }

        if (curScroll + curHeight > 4249) {
            if (curScroll < 4293) {
                curRate = (curScroll + curHeight - 4249) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-9-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 4249) / (curHeight / 2))});
            }
        } else {
            $('.main-step-9-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 4370) {
            if (curScroll < 4688) {
                curRate = (curScroll + curHeight - 4370) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-9-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 4370) / (curHeight / 2))});
            }
        } else {
            $('.main-step-9-photo').css({'opacity': 0});
        }

        if (curScroll + curHeight > 4670) {
            if (curScroll < 4988) {
                $('.main-berry-step-7-8').hide();
                $('.main-formula-1').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeOutBounce', function() {
                    $('.main-formula-2').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInOutElastic', function() {
                        $('.main-formula-3').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInOutBounce', function() {
                            $('.main-formula-4').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInElastic', function() {
                                $('.main-formula-5').animate({'margin-top': 0, 'opacity': 1}, 500);
                            });
                        });
                    });
                });
            }
        } else {
            $('.main-formula-1').stop(true, true).css({'margin-top': -500, 'opacity': 0});
            $('.main-formula-2').stop(true, true).css({'margin-top': 500, 'opacity': 0});
            $('.main-formula-3').stop(true, true).css({'margin-top': 500, 'opacity': 0});
            $('.main-formula-4').stop(true, true).css({'margin-top': 500, 'opacity': 0});
            $('.main-formula-5').stop(true, true).css({'margin-top': 500, 'opacity': 0});
        }

        if (curScroll + curHeight > 5062) {
            if (curScroll < 5106) {
                curRate = (curScroll + curHeight - 5062) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-10-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 5062) / (curHeight / 2))});
            }
        } else {
            $('.main-step-10-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5062) {
            if (curScroll < 5405) {
                curRate = (curScroll + curHeight - 5062) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-10-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5062) / (curHeight / 2))});
            }
        } else {
            $('.main-step-10-photo').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5096) {
            if (curScroll < 5140) {
                curRate = (curScroll + curHeight - 5096) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-11-text').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5096) / (curHeight / 2))});
            }
        } else {
            $('.main-step-11-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5476) {
            if (curScroll < 5531) {
                curRate = (curScroll + curHeight - 5476) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-text-1').css({'opacity': curRate, 'margin-top': 0});
                } else {
                    $('.main-step-11-text-1').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5476) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-11-text-1').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5476) {
            if (curScroll < 5531) {
                curRate = (curScroll + curHeight - 5476) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-text-2').css({'opacity': curRate, 'margin-top': 0});
                } else {
                    $('.main-step-11-text-2').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5476) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-11-text-2').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5600) {
            if (curScroll < 5648) {
                curRate = (curScroll + curHeight - 5600) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-text-3').css({'opacity': curRate, 'margin-top': 0});
                } else {
                    $('.main-step-11-text-3').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5600) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-11-text-3').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5371) {
            if (curScroll < 5790) {
                curRate = (curScroll + curHeight - 5371) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-11-photo-1').css({'opacity': curRate});
            }
        } else {
            $('.main-step-11-photo-1').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5466) {
            if (curScroll < 5532) {
                curRate = (curScroll + curHeight - 5466) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-11-arrow-left').css({'height': 66 * curRate});
            }
        } else {
            $('.main-step-11-arrow-left').css({'height': 0});
        }

        if (curScroll + curHeight > 5470) {
            if (curScroll < 5536) {
                curRate = (curScroll + curHeight - 5470) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-11-arrow-right').css({'height': 66 * curRate});
            }
        } else {
            $('.main-step-11-arrow-right').css({'height': 0});
        }

        if (curScroll + curHeight > 5268) {
            if (curScroll < 5452) {
                curRate = (curScroll + curHeight - 5268) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-photo-2').css({'opacity': curRate, 'margin-top': 0});
                    $('.main-step-11-photo-2 img').stop(true, true);
                    $('.main-step-11-photo-2 img').eq(1).animate({'opacity': 1}, 300, function() {
                        $('.main-step-11-photo-2 img').eq(2).animate({'opacity': 1}, 300, function() {
                            $('.main-step-11-photo-2 img').eq(3).animate({'opacity': 1}, 300);
                        });
                    });
                } else {
                    $('.main-step-11-photo-2').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5268) / (curHeight / 2))});
                    $('.main-step-11-photo-2 img:gt(0)').css({'opacity': 0});
                }
            }
        } else {
            $('.main-step-11-photo-2').css({'opacity': 0});
            $('.main-step-11-photo-2 img:gt(0)').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5268) {
            if (curScroll < 5452) {
                curRate = (curScroll + curHeight - 5268) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-photo-3').css({'opacity': curRate, 'margin-top': 0});
                    $('.main-step-11-photo-3 img').stop(true, true);
                    $('.main-step-11-photo-3 img').eq(1).animate({'opacity': 1}, 300, function() {
                        $('.main-step-11-photo-3 img').eq(2).animate({'opacity': 1}, 300, function() {
                            $('.main-step-11-photo-3 img').eq(3).animate({'opacity': 1}, 300);
                        });
                    });
                } else {
                    $('.main-step-11-photo-3').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 5268) / (curHeight / 2))});
                    $('.main-step-11-photo-3 img:gt(0)').css({'opacity': 0});
                }
            }
        } else {
            $('.main-step-11-photo-3').css({'opacity': 0});
            $('.main-step-11-photo-3 img:gt(0)').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5242) {
            if (curScroll < 5308) {
                curRate = (curScroll + curHeight - 5242) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-termo-left').css({'opacity': curRate, 'margin-top': 0});
                } else {
                    $('.main-step-11-termo-left').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 5242) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-11-termo-left').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5242) {
            if (curScroll < 5308) {
                curRate = (curScroll + curHeight - 5242) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-11-termo-right').css({'opacity': curRate, 'margin-top': 0});
                } else {
                    $('.main-step-11-termo-right').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 5242) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-11-termo-right').css({'opacity': 0});
        }

        if (curScroll + curHeight > 5785) {
            if (curScroll < 5330) {
                curRate = (curScroll + curHeight - 5785) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-12-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 5785) / (curHeight / 2))});
            }
        } else {
            $('.main-step-12-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 6032) {
            if (curScroll < 6416) {
                curRate = (curScroll + curHeight - 6032) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-12-photo img').stop(true, true);
                    $('.main-step-12-photo img').eq(1).animate({'opacity': 1}, 300, function() {
                        $('.main-step-12-photo img').eq(2).animate({'opacity': 1}, 300, function() {
                            $('.main-step-12-photo img').eq(3).animate({'opacity': 1}, 300);
                        });
                    });
                } else {
                    $('.main-step-12-photo img:gt(0)').css({'opacity': 0});
                }
                $('.main-step-12-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 6032) / (curHeight / 2))});
            }
        } else {
            $('.main-step-12-photo').css({'opacity': 0});
            $('.main-step-12-photo img:gt(0)').css({'opacity': 0});
        }

        if (curScroll + curHeight > 6527) {
            if (curScroll < 6571) {
                curRate = (curScroll + curHeight - 6527) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-13-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 6527) / (curHeight / 2))});
            }
        } else {
            $('.main-step-13-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 6527) {
            if (curScroll < 6821) {
                curRate = (curScroll + curHeight - 6527) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-13-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 6527) / (curHeight / 2))});
            }
        } else {
            $('.main-step-13-photo').css({'opacity': 0});
        }

        if (curScroll + curHeight > 6527) {
            if (curScroll < 6684) {
                curRate = (curScroll + curHeight - 6527) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-lorry').css({'margin-left': -2000 * (1 - curRate)});
            }
        } else {
            $('.main-lorry').css({'margin-left': -2000});
        }

        if (curScroll + curHeight > 6820) {
            if (curScroll < 6864) {
                curRate = (curScroll + curHeight - 6820) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-step-14-text').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 6820) / (curHeight / 2))});
            }
        } else {
            $('.main-step-14-text').css({'opacity': 0});
        }

        if (curScroll + curHeight > 6410) {
            if (curScroll < 7109) {
                curRate = (curScroll + curHeight - 6410) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                    $('.main-step-14-photo').css({'opacity': 1, 'margin-top': 0});
                } else {
                    $('.main-step-14-photo').css({'opacity': curRate, 'margin-top': curHeight / 2 * (1 - (curScroll + curHeight - 6410) / (curHeight / 2))});
                }
            }
        } else {
            $('.main-step-14-photo').css({'opacity': 0});
        }

        if (curScroll + curHeight > 6888) {
            if (curScroll < 7121) {
                curRate = (curScroll + curHeight - 6888) / (curHeight / 2);
                if (curRate > 1) {
                    curRate = 1;
                }
                $('.main-girl').css({'margin-left': 2000 * (1 - curRate)});
            }
        } else {
            $('.main-girl').css({'margin-left': 2000});
        }

        if (curScroll + curHeight > 7200) {
            curRate = (curScroll + curHeight - 7200) / (curHeight / 3);
            if (curRate > 1) {
                curRate = 1;
                $('.main-products-title').css({'opacity': 1, 'margin-top': 0});
            } else {
                $('.main-products-title').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 7200) / (curHeight / 3))});
            }
        } else {
            $('.main-products-title').css({'opacity': 0});
        }

        if (curScroll + curHeight > 7300) {
            curRate = (curScroll + curHeight - 7300) / (curHeight / 3);
            if (curRate > 1) {
                curRate = 1;
                $('.main-product-1').css({'opacity': 1, 'margin-top': 0});
            } else {
                $('.main-product-1').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 7300) / (curHeight / 3))});
            }
        } else {
            $('.main-product-1').css({'opacity': 0});
        }

        if (curScroll + curHeight > 7400) {
            curRate = (curScroll + curHeight - 7400) / (curHeight / 3);
            if (curRate > 1) {
                curRate = 1;
                $('.main-product-2').css({'opacity': 1, 'margin-top': 0});
            } else {
                $('.main-product-2').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 7400) / (curHeight / 3))});
            }
        } else {
            $('.main-product-2').css({'opacity': 0});
        }

        if (curScroll + curHeight > 7450) {
            curRate = (curScroll + curHeight - 7450) / (curHeight / 3);
            if (curRate > 1) {
                curRate = 1;
                $('.main-product-3').css({'opacity': 1, 'margin-top': 0});
            } else {
                $('.main-product-3').css({'opacity': curRate, 'margin-top': curHeight / 3 * (1 - (curScroll + curHeight - 7450) / (curHeight / 3))});
            }
        } else {
            $('.main-product-3').css({'opacity': 0});
        }

        if (curScroll + curHeight > 7450) {
            $('.main-header-test').animate({'opacity': 1}, 1000, 'easeInBounce');
        } else {
            $('.main-header-test').stop(true, true).css({'opacity': 0});
        }
    });

    function buildPathPrev() {
        var orig = document.getElementById('path-' + curStep);
        var pathLength = orig.getTotalLength();
        points = [];
        var nextPoint = points.length * distancePerPoint;
        while (nextPoint < pathLength) {
            points.push(orig.getPointAtLength(nextPoint));
            nextPoint = points.length * distancePerPoint;
        }
        points.push(orig.getPointAtLength(pathLength));
        redrawCanvas();
    }

    function buildPath() {
        var orig = document.getElementById('path-' + curStep);
        var nextPoint = points.length * distancePerPoint;
        var pathLength = orig.getTotalLength();
        if (nextPoint <= pathLength){
            points.push(orig.getPointAtLength(nextPoint));
            redrawCanvas();
        } else {
            clearInterval(timer);
            timer = null;
            curStep++;
        }
    }

    function redrawCanvas() {
        clearCanvas();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.clearRect(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y);
    }

    var step7VideoCur   = 0;
    var step7VideoAll   = 157;
    var timerStep7Video = null;

    function animStep7Video() {
        if (step7VideoCur < step7VideoAll) {
            $('.main-step-7-video img').eq(step7VideoCur).css({'display': 'none'});
            step7VideoCur++;
        } else {
            $('.main-step-7-video img').css({'display': 'block'});
            step7VideoCur = 0;
        }
        timerStep7Video = window.setTimeout(animStep7Video, 80);
    }

    var step8VideoCur   = 0;
    var step8VideoAll   = 118;
    var timerStep8Video = null;

    function animStep8Video() {
        if (step8VideoCur < step8VideoAll) {
            $('.main-step-8-video img').eq(step8VideoCur).hide();
            step8VideoCur++;
        } else {
            $('.main-step-8-video img').show();
            step8VideoCur = 0;
        }
        timerStep8Video = window.setTimeout(animStep8Video, 80);
    }

    var mainStep9PhotoCur = 0;
    var mainStep9PhotoNew = 0;
    function animMainStep9Photo() {
        mainStep9PhotoNew = mainStep9PhotoCur + 1;
        if (mainStep9PhotoNew == 4) {
            mainStep9PhotoNew = 0;
        }
        $('.main-step-9-photo img').eq(mainStep9PhotoCur).css({'z-index': 2});
        $('.main-step-9-photo img').eq(mainStep9PhotoNew).css({'z-index': 1, 'display': 'block'});
        $('.main-step-9-photo img').eq(mainStep9PhotoCur).fadeOut(500, function() {
            mainStep9PhotoCur = mainStep9PhotoNew;
            animMainStep9Photo();
        });
    }

    var mainStep12PhotoCur = 0;
    function animMainStep12Photo() {
        if (mainStep12PhotoCur < 4) {
            $('.main-step-12-photo').css({'background-position': 'left -' + (384 * mainStep12PhotoCur) + 'px'});
            mainStep12PhotoCur++;
            window.setTimeout(animMainStep12Photo, 1000);
        }
    }

    var mainStep14PhotoCur = 0;
    var mainStep14PhotoNew = 0;
    function animMainStep14Photo() {
        mainStep14PhotoNew = mainStep14PhotoCur + 1;
        if (mainStep14PhotoNew == 3) {
            mainStep14PhotoNew = 0;
        }
        $('.main-step-14-photo img').eq(mainStep14PhotoCur).css({'z-index': 2});
        $('.main-step-14-photo img').eq(mainStep14PhotoNew).css({'z-index': 1, 'display': 'block'});
        $('.main-step-14-photo img').eq(mainStep14PhotoCur).fadeOut(1000, function() {
            mainStep14PhotoCur = mainStep14PhotoNew;
            animMainStep14Photo();
        });
    }

    $(window).load(function() {
        $('.page-main-loading').removeClass('page-main-loading');
        animStep7Video();
        animStep8Video();
        animMainStep9Photo();
        animMainStep14Photo();
        var curURL = location.href;
        if (curURL.indexOf('autoplay', 0) != -1) {
            $('.main-auto').trigger('click');
        }
    });

})(jQuery);