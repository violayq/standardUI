/**
 * Created by jh on 2016/9/22.
 */
$(function() {
    //当添加新选项卡时，如果选项卡超过ul的宽度，设置scrollLeft
    $('.mainTabs').tabs({
        fit: true,
        singlePages: false,
        scrolled: true,
        onAdd: function () {
            var pos = $('.mainTabs').find('>ul.nav').scrollLeft();
            var id = $(this).attr('id');
            var currentLI = $('a[href="#' + id + '"]').parent();
            $('.mainTabs').find('>ul.nav').animate({scrollLeft: pos + currentLI.width()}, 400);
            $(this).addClass('animated');
            //1s后移除animated样式
            var that = this;
            setTimeout(function () {
                $(that).removeClass('animated');
            }, 1000);
        }
    });

    //左侧菜单导航
    var data = [
        {id: "1", parentId: "0", title: "页面", iconClass: "fa fa-desktop", url: "", orderNum: 1},
        {id: "2", parentId: "0", title: "表单", iconClass: "fa fa-columns", url: "", orderNum: 2},
        {id: "5", parentId: "0", title: "其它", iconClass: "fa fa-asterisk", url: "", orderNum: 3},
        {id: "3", parentId: "1", title: "查询1", iconClass: "icon-circle", url: "searchResult4.html", orderNum: 1},
        {id: "4", parentId: "2", title: "基本表单", iconClass: "icon-circle", url: "form-single3.html", orderNum: 1},
        {id: "6", parentId: "5", title: "Toastr通知", iconClass: "icon-circle", url: "toastr_notifications.html", orderNum: 1},
        {id: "7", parentId: "1", title: "查询2", iconClass: "icon-circle", url: "searchResult5.html", orderNum: 2}
    ];
    $('#side-menu').metisMenu({
        data: data,
        onSelect: function () {
            updateTabs($('.mainTabs'), $(this));
        }
    });

    var menuWidth = $('.navbar-static-side').width();
    //展开菜单导航和折叠菜单导航事件
    $('.navbar-minimalize').click(function () {
        $("body.coodo-layout").toggleClass("mini-navbar");

        var west = $('body.coodo-layout>.coodo-layout-west');
        var center = $('body.coodo-layout>.coodo-layout-center');
        var newMenuW = $('.navbar-static-side').width();

        if($("body.coodo-layout").hasClass('mini-navbar')){
            $(this).addClass('navbar-minimalize-vertical')
            center.width(center.width() + (menuWidth - newMenuW));
            west.width(newMenuW);
        } else {
            $(this).removeClass('navbar-minimalize-vertical')
            center.width(center.width() - (menuWidth - newMenuW));
            west.width(menuWidth);
        }
    });

    /*$("#side-menu").on('click', '>li', function () {
        $("body.coodo-layout").hasClass("mini-navbar") && NavToggle()
    });*/

    // 更换皮肤
    $('.nav-banner-control :first > ul > li').click(function() {
        $("head [href^='skin']").attr('href', $(this).attr('value'));
    });
});

function updateTabs(target, li) {
    var opts = target.tabs('options');
    var param = {};
    var url = li.find('>a').attr('href');
    var title = $.trim(li.find('>a>.nav-label').text());

    if (target.tabs('exists', title)) {
        target.tabs('select', title);
        return false;
    }

    param.closable = true;
    param.title = title;
    if (url != null && url != '') {
        if (opts.singlePages) {
            $.ajax({
                url: url,
                dataType: 'html',
                success: function (res) {
                    param.content = res;
                    target.tabs('add', param);
                    target.tabs('select', title);
                    $.parser.parse($(target.tabs('getTab', title)));
                }
            });
        } else {
            param.content = url;
            target.tabs('add', param);
            target.tabs('select', title);
        }
    }
}

function NavToggle() {
    $(".navbar-minimalize").trigger("click");
}