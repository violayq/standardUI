/**
 * Created by jh on 2016/9/22.
 */
$(function () {
    //初始化左侧菜单导航
    var data = [
        {
            "id": "1",
            "parentId": "0",
            "title": "页面",
            "iconClass": "fa fa-desktop",
            "url": "",
            "orderNum": 1
        },
        {
            "id": "2",
            "parentId": "0",
            "title": "表单",
            "iconClass": "fa fa-columns",
            "url": "",
            "orderNum": 2
        },
        {
            "id": "11",
            "parentId": "1",
            "title": "查询1",
            "iconClass": "icon-circle",
            "url": "searchResult.html",
            "orderNum": 1
        },
        {
            "id": "12",
            "parentId": "1",
            "title": "查询2",
            "iconClass": "icon-circle",
            "url": "searchResult2.html",
            "orderNum": 2
        },
        {
            "id": "13",
            "parentId": "1",
            "title": "404页面",
            "iconClass": "icon-circle",
            "url": "404.html",
            "orderNum": 3
        },
        {
            "id": "14",
            "parentId": "1",
            "title": "500页面",
            "iconClass": "icon-circle",
            "url": "500.html",
            "orderNum": 4
        },
        {
            "id": "15",
            "parentId": "1",
            "title": "身份过期",
            "iconClass": "icon-circle",
            "url": "expire.html",
            "orderNum": 5
        },
        {
            "id": "21",
            "parentId": "2",
            "title": "基本表单",
            "iconClass": "icon-circle",
            "url": "form-single.html",
            "orderNum": 1
        },
        {
            "id": "22",
            "parentId": "2",
            "title": "双列表单",
            "iconClass": "icon-circle",
            "url": "form-double.html",
            "orderNum": 2
        },
        {
            "id": "23",
            "parentId": "2",
            "title": "分组表单",
            "iconClass": "icon-circle",
            "url": "form-single-block.html",
            "orderNum": 3
        },
        {
            "id": "111",
            "parentId": "11",
            "title": "查询11",
            "iconClass": "icon-circle",
            "url": "searchResult.html",
            "orderNum": 1
        },
        {
            "id": "112",
            "parentId": "11",
            "title": "查询12",
            "iconClass": "icon-circle",
            "url": "searchResult.html",
            "orderNum": 1
        }
    ];

    $('#side-menu').metisMenu({
        data: data,
        container: '.main-content',
        onSelect: function () {
            $('.main-breadcrumb').find('li:gt(0)').remove();
            updateBreadcrumb($('.main-breadcrumb'), $(this));
        }
    });

    var menuWidth = $('.navbar-static-side').width();
    //展开菜单导航和折叠菜单导航事件
    $('.navbar-minimalize').click(function () {
        $("body.coodo-layout").toggleClass("mini-navbar");

        var west = $('body.coodo-layout>.coodo-layout-west');
        var center = $('body.coodo-layout>.coodo-layout-center');
        var newMenuW = $('.navbar-static-side').width();

        if ($("body.coodo-layout").hasClass('mini-navbar')) {
            $(this).addClass('navbar-minimalize-vertical')
            center.width(center.width() + (menuWidth - newMenuW));
            west.width(newMenuW);
        } else {
            $(this).removeClass('navbar-minimalize-vertical')
            center.width(center.width() - (menuWidth - newMenuW));
            west.width(menuWidth);
        }
        var childLayout = center.find('>.coodo-layout');
        if(childLayout.length){
            childLayout.layout('resize', {width:center.width(), height:center.height()});
        }
    });

   /* $("#side-menu").on('click', '>li', function () {
        $("body.coodo-layout").hasClass("mini-navbar") && NavToggle()
    });*/

    // 更换皮肤
    $('.nav-banner-control :first > ul > li').click(function () {
        $("head [href^='skin']").attr('href', $(this).attr('value'));
    });
});

function updateBreadcrumb(ol, li) {
    var parent = li.parent().prev('a');
    if (parent.length) {
        updateBreadcrumb(ol, parent.parent().eq(0));
    }
    ol.append('<li>' + li.find('>a>.nav-label').text() + '</li>');
}

function NavToggle() {
    $(".navbar-minimalize").trigger("click");
}
