(function ($) {
    "use strict";

    jQuery(document).ready(function () {
        $(window).on("load", function () {
            // 02. primary navbar sticky
            var initialScroll = $(window).scrollTop();
            if (initialScroll >= 100) {
                $(".primary-navbar").addClass("navbar-active");
            }

            // 03. progress wrap sticky
            var initialScroll = $(window).scrollTop();
            if (initialScroll >= 100) {
                $(".progress-wrap").addClass("active-progress");
            }
        });

        // 18. scroll to top with progress
        if ($(".progress-wrap").length > 0) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "stroke-dashoffset 10ms linear";
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateProgress();
            $(window).scroll(updateProgress);
            var offset = 50;
            var duration = 1000;
            $(window).on("scroll", function () {
                if ($(this).scrollTop() > offset) {
                    $(".progress-wrap").addClass("active-progress");
                } else {
                    $(".progress-wrap").removeClass("active-progress");
                }
            });
            $(".progress-wrap").on("click", function (event) {
                event.preventDefault();
                $("html, body").animate({
                        scrollTop: 0,
                    },
                    duration
                );
                return false;
            });
        }

        // Pricing Plan Change Trigger
        function pricingTrigger() {
            $("[data-plan-active]").each(function () {
                var id = $(this).attr("data-plan-id");
                var plan = $(this).attr("data-plan-active");
                if (plan == "monthly") {
                    $("[data-pricing-trigger='" + id + "'][data-target='monthly']")?.addClass("active");
                    $("[data-pricing-trigger='" + id + "'][data-target='yearly']")?.removeClass("active");
                    $("[data-pricing-trigger='" + id + "'].toggle")?.attr("data-target", "yearly");
                    $("[data-pricing-trigger='" + id + "'].toggle")?.removeClass("active");
                } else if (plan == "yearly") {
                    $("[data-pricing-trigger='" + id + "'][data-target='monthly']")?.removeClass("active");
                    $("[data-pricing-trigger='" + id + "'][data-target='yearly']")?.addClass("active");
                    $("[data-pricing-trigger='" + id + "'].toggle")?.addClass("active");
                    $("[data-pricing-trigger='" + id + "'].toggle")?.attr("data-target", "monthly");
                }

            })
            $('[data-pricing-trigger]').on('click', function (e) {
                var id = $(e.target).attr('data-pricing-trigger');
                var target = $(e.target).attr('data-target');
                $("[data-plan-id='" + id + "'] .dynamic-value").each(function () {
                    let yearPrice = $(this).attr('data-yearly');
                    let monthPrice = $(this).attr('data-monthly');

                    if (target == 'monthly') {
                        $(this).text(monthPrice);
                        $("[data-pricing-trigger][data-target='monthly']:not(.toggle)").addClass("active");
                        $("[data-pricing-trigger][data-target='yearly']:not(.toggle)").removeClass("active");
                        $("[data-pricing-trigger].toggle")?.removeClass("active");
                        $("[data-pricing-trigger].toggle").attr("data-target", "yearly");
                    }
                    if (target == 'yearly') {
                        $(this).text(yearPrice);
                        $("[data-pricing-trigger][data-target='monthly']:not(.toggle)").removeClass("active");
                        $("[data-pricing-trigger][data-target='yearly']:not(.toggle)").addClass("active");
                        $("[data-pricing-trigger].toggle")?.removeClass("active");
                        $("[data-pricing-trigger].toggle")?.addClass("active")
                        $("[data-pricing-trigger].toggle").attr("data-target", "monthly");
                    }
                });
            });
        }

        pricingTrigger();

        inlineSVG.init({
            svgSelector: '.inline-svg', // the class attached to all images that should be inlined
            initClass: 'inline-svg-active', // class added to <html>
        });

        let device_width = window.innerWidth;

        // 21. gsap register
        gsap.registerPlugin(
            ScrollTrigger,
            ScrollToPlugin,
        );

        // 22. gsap config
        gsap.config({
            nullTargetWarn: false,
            debug: false,
        });

        // 23. target id
        $('a[href^="#"]').on("click", function (event) {
            event.preventDefault();

            var target = $(this).attr("href");

            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 50,
                },
                duration: 0.5,
                ease: "power3.inOut",
            });
        });

        // 24. smooth scroll
        if (device_width > 576) {
            const smoother = ScrollSmoother.create({
                smooth: 2.2,
                effects: device_width < 992 ? false : true,
                smoothTouch: false,
                normalizeScroll: false,
                ignoreMobileResize: true,
            });
        }

        if ($(".home-2_content-image-3").length > 0) {
            if (device_width > 576) {
                var tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".home-2_content-image-3",
                        start: "center center",
                        end: "+=100%",
                        scrub: true,
                        pin: false,
                    },
                });
                tl.to(".home-2_content-image-3", {
                    opacity: .8,
                    scale: .5,
                    y: "50%",
                    duration: 2,
                });
            }
        }
    });
})(jQuery);

