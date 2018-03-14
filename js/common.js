/**
 * Created by jh on 2016/12/16.
 */
function redirect(url) {
    if (!url) return;
    url = url.replace(/\@\@\@\@\@\@/g, '&');
    top.$('.mainTabs').tabs('getSelected').src = url;
}
function openForTabs(param) {
    top.$('.mainTabs').tabs('add', param);
    top.$('.mainTabs').tabs('select', param.title);
}