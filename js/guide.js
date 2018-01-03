/**
 * Created by wangwenqian on 2017/12/31.
 */
var carousels = $('.carousel');
carousels.carousel({
    interval: false
});
carousels.each(function() {
    var $obj = $(this);
    var $inner = $obj.find('.carousel-inner');

    var id = 'uuid' + new Date().getTime();
    $obj.addClass(id);

    if ($obj.data('shift') === 1) {
        var items = $obj.find('.item > [class*="col-"]'),
            visibleCnt = $obj.find('.item:first [class*="col-"]').length,
            wrapper = "";

        // 内置CSS样式
        var rule_base = '.carousel.' + id + ' .carousel-inner > .item',
            styles = $('<style></style>'),
            rules = [];
        rules[0] = rule_base + '.next {left: ' + (100 / visibleCnt) + '%; transform: none;}';
        rules[1] = rule_base + '.active {left: 0;}';
        rules[2] = rule_base + '.active.left {left: -' + (100 / visibleCnt) + '%; transform: none;}';
        rules[3] = rule_base + '.next.left {left: 0;}';
        rules[4] = rule_base + '.active.right {left: ' + (100 / visibleCnt) + '%; transform: none;}';
        rules[5] = rule_base + '.prev.right {left: 0;}';
        rules[6] = rule_base + '.prev {left: -' + (100 / visibleCnt) + '%; transform: none;}';
        for (var i = 0; i < rules.length; i++) {
            styles.append(rules[i]);
        }
        $obj.prepend(styles);

        // 重构旋转木马的HTML结构
        for (var i = 0; i < $(items).length; i++) {
            var $item = $(items[i]);
            var parent = $item.parent();
            if (parent.hasClass('item')) {
                if (!wrapper.length) {
                    wrapper = parent.clone().removeClass('active').html('');
                }
                $item.unwrap();
            }

            var itemGroup = [$item];
            for (var x = 1; x < visibleCnt; x++) {
                var a = i + x;
                var next = $(items[a]);
                if (!next.length) {
                    next = $(items[(a - $(items).length)]);
                }
                itemGroup[x] = next.clone();
            }
            var newSet = wrapper.clone().html(itemGroup);
            if (i == 0) {
                newSet.addClass('active');
            }
            newSet.appendTo($inner);
        }
    }
});

//nav fixed
var body_wid = document.documentElement.clientWidth;//获取屏幕宽度
var h1 = $(".navbar-default").offset().top;
var h2 = $('.navbar-default').outerHeight() + h1;
var ss = $(document).scrollTop();

$(window).scroll(function () {
    var s = $(document).scrollTop();
    if (s > h2) {
        $('.navbar-default').addClass('n_top_01');
        $('header').css('padding-top','60px');

        if (s > ss) {
            $('.navbar-default').removeClass('n_top_02');
        } else {
            $('.navbar-default').addClass('n_top_02');
        }
        ss = s;
    }
});