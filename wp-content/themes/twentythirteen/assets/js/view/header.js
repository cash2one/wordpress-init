window.onload=function(){
    //调用gotop.js
    /*$.getScript("/hengtian-offical-website-cms/wp-content/themes/twentytwelve/build/js/view/gotop.js",function(){
        gototop();
    })*/
    if(screen.width<=768){
        $("#img-Hengtian").attr('src','http://localhost:8080/hengtian-offical-website-cms/wp-content/themes/twentytwelve/build/img/ht_blue_logo.png'); 
    }

}