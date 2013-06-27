define(["jquery.jeditable-focus"]),function($){$.fn.editable=function(e,t){if("disable"==e){$(this).data("disabled.editable",!0);return}if("enable"==e){$(this).data("disabled.editable",!1);return}if("destroy"==e){$(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");return}var n=$.extend({},$.fn.editable.defaults,{target:e},t),r=$.editable.types[n.type].plugin||function(){},i=$.editable.types[n.type].submit||function(){},s=$.editable.types[n.type].buttons||$.editable.types.defaults.buttons,o=$.editable.types[n.type].content||$.editable.types.defaults.content,u=$.editable.types[n.type].element||$.editable.types.defaults.element,a=$.editable.types[n.type].reset||$.editable.types.defaults.reset,f=n.callback||function(){},l=n.onedit||function(){},c=n.onsubmit||function(){},h=n.onreset||function(){},p=n.onerror||a;return n.tooltip&&$(this).attr("title",n.tooltip),n.autowidth="auto"==n.width,n.autoheight="auto"==n.height,this.each(function(){var e=this,t=$(e).width(),d=$(e).height();$(this).data("event.editable",n.event),$.trim($(this).html())||$(this).html(n.placeholder),$(this).bind(n.event,function(h){if(!0===$(this).data("disabled.editable"))return;if(e.editing)return;if(!1===l.apply(this,[n,e]))return;h.preventDefault(),h.stopPropagation(),n.tooltip&&$(e).removeAttr("title"),0==$(e).width()?(n.width=t,n.height=d):(n.width!="none"&&(n.width=n.autowidth?$(e).width():n.width),n.height!="none"&&(n.height=n.autoheight?$(e).height():n.height)),$(this).html().toLowerCase().replace(/(;|")/g,"")==n.placeholder.toLowerCase().replace(/(;|")/g,"")&&$(this).html(""),e.editing=!0,e.revert=$(e).text(),$(e).html("");var v=$("<form />");n.cssclass&&("inherit"==n.cssclass?v.attr("class",$(e).attr("class")):v.attr("class",n.cssclass)),n.style&&("inherit"==n.style?(v.attr("style",$(e).attr("style")),v.css("display",$(e).css("display"))):v.attr("style",n.style));var m=u.apply(v,[n,e]),g;if(n.loadurl){var y=setTimeout(function(){m.disabled=!0,o.apply(v,[n.loadtext,n,e])},100),b={};b[n.id]=e.id,$.isFunction(n.loaddata)?$.extend(b,n.loaddata.apply(e,[e.revert,n])):$.extend(b,n.loaddata),$.ajax({type:n.loadtype,url:n.loadurl,data:b,async:!1,success:function(e){window.clearTimeout(y),g=e,m.disabled=!1}})}else n.data?(g=n.data,$.isFunction(n.data)&&(g=n.data.apply(e,[e.revert,n]))):g=e.revert;o.apply(v,[g,n,e]),m.attr("name",n.name),m.attr("maxlength",n.maxlength),s.apply(v,[n,e]),$(e).append(v),r.apply(v,[n,e]),$(":input:visible:enabled:first",v).focus(),n.select&&m.select(),m.keydown(function(t){t.keyCode==27&&(t.preventDefault(),a.apply(v,[n,e]))});var y;"cancel"==n.onblur?m.blur(function(t){a.apply(v,[n,e])}):"submit"==n.onblur?m.blur(function(e){v.submit()}):$.isFunction(n.onblur)?m.blur(function(t){n.onblur.apply(e,[m.val(),n])}):m.blur(function(e){}),v.submit(function(t){y&&clearTimeout(y),t.preventDefault();if(!1!==c.apply(v,[n,e])&&!1!==i.apply(v,[n,e]))if($.isFunction(n.target)){var r=n.target.apply(e,[m.val(),n]);$(e).text(r),e.editing=!1,f.apply(e,[e.innerHTML,n]),$.trim($(e).html())||$(e).html(n.placeholder)}else{var s={};s[n.name]=m.val(),s[n.id]=e.id,$.isFunction(n.submitdata)?$.extend(s,n.submitdata.apply(e,[e.revert,n])):$.extend(s,n.submitdata),"PUT"==n.method&&(s._method="put"),$(e).html(n.indicator);var o={type:"POST",data:s,dataType:"html",url:n.target,success:function(t,r){o.dataType=="html"&&$(e).html(t),e.editing=!1,f.apply(e,[t,n]),$.trim($(e).html())||$(e).html(n.placeholder)},error:function(t,r,i){p.apply(v,[n,e,t])}};$.extend(o,n.ajaxoptions),$.ajax(o)}return $(e).attr("title",n.tooltip),!1})}),this.reset=function(t){this.editing&&!1!==h.apply(t,[n,e])&&($(e).text(e.revert),e.editing=!1,$.trim($(e).html())||$(e).html(n.placeholder),n.tooltip&&$(e).attr("title",n.tooltip))}})},$.editable={types:{defaults:{element:function(e,t){var n=$('<input type="hidden"></input>');return $(this).append(n),n},content:function(e,t,n){$(":input:first",this).val(e)},reset:function(e,t){t.reset(this)},buttons:function(e,t){var n=this;if(e.submit){if(e.submit.match(/>$/))var r=$(e.submit).click(function(){r.attr("type")!="submit"&&n.submit()});else{var r=$('<button type="submit" />');r.html(e.submit)}$(this).append(r)}if(e.cancel){if(e.cancel.match(/>$/))var i=$(e.cancel);else{var i=$('<button type="cancel" />');i.html(e.cancel)}$(this).append(i),$(i).click(function(r){if($.isFunction($.editable.types[e.type].reset))var i=$.editable.types[e.type].reset;else var i=$.editable.types.defaults.reset;return i.apply(n,[e,t]),!1})}}},text:{element:function(e,t){var n=$("<input />");return e.width!="none"&&n.width(e.width),e.height!="none"&&n.height(e.height),n.attr("autocomplete","off"),$(this).append(n),n}},textarea:{element:function(e,t){var n=$("<textarea />");return e.rows?n.attr("rows",e.rows):e.height!="none"&&n.height(e.height),e.cols?n.attr("cols",e.cols):e.width!="none"&&n.width(e.width),$(this).append(n),n}},select:{element:function(e,t){var n=$("<select />");return $(this).append(n),n},content:function(data,settings,original){if(String==data.constructor)eval("var json = "+data);else var json=data;for(var key in json){if(!json.hasOwnProperty(key))continue;if("selected"==key)continue;var option=$("<option />").val(key).append(json[key]);$("select",this).append(option)}$("select",this).children().each(function(){($(this).val()==json["selected"]||$(this).text()==$.trim(original.revert))&&$(this).prop("selected",!0)})}}},addInputType:function(e,t){$.editable.types[e]=t}},$.fn.editable.defaults={name:"value",id:"id",type:"text",width:"auto",height:"auto",event:"click.editable",onblur:"cancel",loadtype:"GET",loadtext:"Loading...",placeholder:"Click to edit",loaddata:{},submitdata:{},ajaxoptions:{},maxlength:1e3}}(jQuery);