$("footer").load("/common/footer.html",function(){
	if($('footer').attr('title')=='home'){
		loadFooter(0);
    }
    if($('footer').attr('title')=='my_centre'){
		loadFooter(1);
    }
});
function loadFooter(i){
	$('footer ul li').eq(i).addClass('active');
}
function loadUrl(url,_this){
	if(($(_this).index()==2&&user_id<0)||($(_this).index()==3&&user_id<0)){
		location.href="/register/register.html";
		return false;
	}
	location.href=url;
}