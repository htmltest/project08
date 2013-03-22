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

    });

    function nextScroll() {
        curAutoScroll += $(window).height() / 2;
        $.scrollTo(curAutoScroll, {duration: 500});
        timerScroll = window.setTimeout(nextScroll, 5000);
    }

    $(window).bind('load scroll', function() {
        var curScroll = $(window).scrollTop();
        var curHeight = $(window).height();

        if (curScroll + curHeight > 1660) {
            if (curScroll > prevScroll) {
                var steps = Math.ceil((curScroll + curHeight - 1660) / 50);
                if (steps > curStep) {
                    clearInterval(timer);
                    timer = null;
                    for (var i = 0; i < steps; i++) {
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
            }
        }

        $('.main-75').animate({'margin-right': -curScroll, 'margin-top': -curScroll}, 300, 'linear');
        $('.main-way').animate({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5}, 300, 'linear');
        $('.main-scroll').animate({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5}, 300, 'linear');
        $('.main-auto').animate({'margin-left': -curScroll, 'margin-top': -curScroll * 2.5}, 300, 'linear');
        $('.main-berry').animate({'margin-top': -curScroll * 2}, 300, 'linear');

        if (curScroll + curHeight > 1212) {
            $('.main-map').fadeIn(1000, function() {
                $('.main-belt').animate({'width': '100%'}, 1000, function() {
                    $('.main-step-1-photo-1').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                        $('.main-step-1-photo-2').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                            $('.main-step-1-text').fadeIn(1000);
                        });
                    });
                });
            });
        }

        if (curScroll + curHeight > 1820) {
            $('.main-step-2-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                animMainStep2Photo();
            });
        }

        if (curScroll + curHeight > 2242) {
            $('.main-step-3-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-berry-step-2-3').show().animate({'left': 1005, 'top': 782}, 1000, function() {
                    $('.main-berry-step-2-3').fadeOut(function() {
                        $('.main-berry-step-2-3').remove();
                    });
                    $('.main-step-3-text').fadeIn(1000);
                });
            });
        }

        if (curScroll + curHeight > 2583) {
            $('.main-step-4-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-step-4-text').fadeIn(1000, function() {
                    animMainStep4Photo();
                });
            });
        }

        if (curScroll + curHeight > 3225) {
            $('.main-step-5-photo-1').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-step-5-photo-2').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                    $('.main-step-5-text').fadeIn(1000);
                    animMainStep45Berry();
                    $('.main-berry-step-4-5').show().animate({'left': 903, 'top': 1499}, 2000, function() {
                        $('.main-berry-step-4-5').fadeOut(function() {
                            $('.main-berry-step-4-5').remove();
                        });
                    });
                });
            });
        }

        if (curScroll + curHeight > 3450) {
            $('.main-step-6-text').fadeIn(400, function() {
                $('.main-ship').animate({'margin-left': 0}, 1000, function() {
                    $('.main-map-2').fadeIn(1000, function() {
                        $('.main-step-6-city').fadeIn(600);
                    });
                });
            });
        }

        if (curScroll + curHeight > 3846) {
            $('.main-step-7-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-step-7-video').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                    $('.main-step-7-text').fadeIn(1000);
                });
            });
        }

        if (curScroll + curHeight > 4257) {
            $('.main-step-8-video').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-step-8-text').fadeIn(600);
                $('.main-berry-step-7-8').show().animate({'left': 976, 'top': 2914}, 2000, function() {
                    $('.main-berry-step-7-8').fadeOut(function() {
                        $('.main-berry-step-7-8').remove();
                    });
                });
            });
        }

        if (curScroll + curHeight > 4670) {
            $('.main-step-9-text').fadeIn(1000);
            $('.main-formula-1').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeOutBounce', function() {
                $('.main-formula-2').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInOutElastic', function() {
                    $('.main-formula-3').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInOutBounce', function() {
                        $('.main-formula-4').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInElastic', function() {
                            $('.main-formula-5').animate({'margin-top': 0, 'opacity': 1}, 500, 'easeInBounce', function() {
                                $('.main-step-9-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                                    animMainStep9Photo();
                                });
                            });
                        });
                    });
                });
            });
        }

        if (curScroll + curHeight > 5062) {
            $('.main-step-10-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-step-10-text').fadeIn(1000);
            });
        }

        if (curScroll + curHeight > 5371) {
            $('.main-step-11-text').fadeIn(500, function() {
                $('.main-step-11-arrow-left').animate({'height': 66}, 1000, function() {
                    $('.main-step-11-photo-2').animate({'margin-top': 0, 'opacity': 1}, 500, function() {
                        animMainStep11Photo2();
                        $('.main-step-11-termo-left').animate({'margin-top': 0, 'opacity': 1}, 500, function() {
                            $('.main-step-11-photo-1').fadeIn(400, function() {
                                $('.main-step-11-text-1').fadeIn(800, function() {
                                    $('.main-step-11-text-3').fadeIn(1000);
                                });
                            });
                        });
                    });
                });
                $('.main-step-11-arrow-right').animate({'height': 66}, 1000, function() {
                    $('.main-step-11-photo-3').animate({'margin-top': 0, 'opacity': 1}, 500, function() {
                        animMainStep11Photo3();
                        $('.main-step-11-termo-right').animate({'margin-top': 0, 'opacity': 1}, 600, function() {
                            $('.main-step-11-text-2').fadeIn(800);
                        });
                    });
                });
            });
        }

        if (curScroll + curHeight > 6032) {
            $('.main-step-12-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                $('.main-step-12-text').fadeIn(600);
                animMainStep12Photo();
            });
        }

        if (curScroll + curHeight > 6527) {
            $('.main-lorry').animate({'margin-left': 0}, 1000, function() {
                $('.main-step-13-photo').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                    $('.main-step-13-text').fadeIn(600);
                });
            });
        }

        if (curScroll + curHeight > 7000) {
            $('.main-girl').animate({'margin-left': 0}, 1000, function() {
                $('.main-step-14-photo').fadeIn(800, function() {
                    $('.main-step-14-text').fadeIn(600, function() {
                        $('.main-products-title').fadeIn(600, function() {
                            $('.main-product-1').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                                $('.main-product-2').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                                    $('.main-product-3').animate({'margin-top': 0, 'opacity': 1}, 400, function() {
                                        $('.main-header-test').animate({'opacity': 1}, 400, 'easeInBounce');
                                    });
                                });
                            });
                        });
                    });
                });
            });
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

    var mainStep2PhotoCur = 0;
    function animMainStep2Photo() {
        if (mainStep2PhotoCur < 4) {
            $('.main-step-2-photo').css({'background-position': 'left -' + (318 * mainStep2PhotoCur) + 'px'});
            mainStep2PhotoCur++;
            window.setTimeout(animMainStep2Photo, 1000);
        } else {
            $('.main-step-2-text').fadeIn(1000, function() {
                $('.main-step-2-photo').css({'background-position': 'left top'});
            });
        }
    }

    var mainStep4PhotoCur = 0;
    function animMainStep4Photo() {
        if (mainStep4PhotoCur < 4) {
            $('.main-step-4-photo').css({'background-position': 'left -' + (318 * mainStep4PhotoCur) + 'px'});
            mainStep4PhotoCur++;
            window.setTimeout(animMainStep4Photo, 1000);
        } else {
            $('.main-berry-step-3-4').show().animate({'left': 1501, 'top': 1196}, 2000, function() {
                $('.main-berry-step-3-4').fadeOut(function() {
                    $('.main-berry-step-3-4').remove();
                });
            });
        }
    }


    var mainStep45BerryCur = 0;
    function animMainStep45Berry() {
        if (mainStep45BerryCur < 6) {
            $('.main-berry-step-4-5').css({'background-position': 'left -' + (405 * mainStep45BerryCur) + 'px'});
            mainStep45BerryCur++;
            window.setTimeout(animMainStep45Berry, 200);
        }
    }

    var step7VideoCur   = 0;
    var step7VideoAll   = 157;
    var timerStep7Video = null;

    function animStep7Video() {
        if (step7VideoCur < step7VideoAll) {
            $('.main-step-7-video img').eq(step7VideoCur).hide();
            step7VideoCur++;
        } else {
            $('.main-step-7-video img').show();
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
    function animMainStep9Photo() {
        if (mainStep9PhotoCur < 4) {
            $('.main-step-9-photo').css({'background-position': 'left -' + (318 * mainStep9PhotoCur) + 'px'});
            mainStep9PhotoCur++;
            window.setTimeout(animMainStep9Photo, 500);
        } else {
            mainStep9PhotoCur = 0;
            window.setTimeout(animMainStep9Photo, 500);
        }
    }

    var mainStep11Photo2Cur = 0;
    function animMainStep11Photo2() {
        if (mainStep11Photo2Cur < 4) {
            $('.main-step-11-photo-2').css({'background-position': 'left -' + (184 * mainStep11Photo2Cur) + 'px'});
            mainStep11Photo2Cur++;
            window.setTimeout(animMainStep11Photo2, 1000);
        }
    }

    var mainStep11Photo3Cur = 0;
    function animMainStep11Photo3() {
        if (mainStep11Photo3Cur < 4) {
            $('.main-step-11-photo-3').css({'background-position': 'left -' + (184 * mainStep11Photo3Cur) + 'px'});
            mainStep11Photo3Cur++;
            window.setTimeout(animMainStep11Photo3, 1000);
        }
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
    function animMainStep14Photo() {
        if (mainStep14PhotoCur < 3) {
            $('.main-step-14-photo').css({'background-position': 'left -' + (699 * mainStep14PhotoCur) + 'px'});
            mainStep14PhotoCur++;
            window.setTimeout(animMainStep14Photo, 1000);
        } else {
            mainStep14PhotoCur = 0;
            window.setTimeout(animMainStep14Photo, 1000);
        }
    }

    $(window).load(function() {
        $('.page-main-loading').removeClass('page-main-loading');
        animStep7Video();
        animStep8Video();
        animMainStep14Photo();
    });

})(jQuery);