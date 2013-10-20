/*! nice Validator 0.5.1
 * (c) 2012-2013 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function(e,t){"use strict";function i(s,a){var l,u,o=this;return!o instanceof i?new i(s,a):(E(a)&&(a={valid:a}),a=a||{},a.valid&&(o.isAjaxSubmit=!0),u=P(s,"data-"+h+"-option"),u=u&&"{"===u.charAt(0)?Function("return "+u)():{},l=X[a.theme||u.theme||U.theme],o.options=e.extend({},U,l,u,a),o.$el=e(s),o.rules=new n(o.options.rules,!0),o.messages=new r(o.options.messages,!0),o.elements={},o.fields={},o.deferred={},o.errors={},o.isValid=!0,o._init(),t)}function n(e,t){var i=t?t===!0?this:t:n.prototype;if(H(e))for(var r in e)i[r]=s(e[r])}function r(e,t){var i=t?t===!0?this:t:r.prototype;if(H(e))for(var n in e){if(!e[n])return;i[n]=e[n]}}function s(t){switch(e.type(t)){case"function":return t;case"array":return function(e){return t[0].test(e.value)||t[1]||!1};case"regexp":return function(e){return t.test(e.value)}}}function a(t){var i="";return e.map(t.split(" "),function(e){i+=","+("#"===e.charAt(0)?e:'[name="'+e+'"]')}),i.substring(1)}function l(t){if(t&&t.tagName){var i=t;switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":i=t.form||e(t).closest(".n-"+h);break;default:i=e(t).closest(".n-"+h)}return e(i).data(h)||e(i)[h]().data(h)}}function u(t){var i=l(t);i?(P(t,M)&&i._parse(t),e(t).trigger("focusin")):P(t,M,null)}function o(i,n){var r=e.trim(P(i,M+"-"+n));if(r)return r=Function("return "+r)(),r?s(r):t}function d(e,t,i){var n=t.msg;return H(n)&&i&&(n=n[i]),I(n)||(n=P(e,"data-msg-"+i)||P(e,"data-msg")||""),n}function f(e){var t;return e&&(t=C.exec(e)),t?t[1]:""}function c(e){return"INPUT"===e.tagName&&"checkbox"===e.type||"radio"===e.type}function g(e){return Date.parse(e.replace(/\.|\-/g,"/"))}var h="validator",p="n-ok",m="n-error",v="n-tip",y="n-loading",b="n-valid",k="n-invalid",_="msg-box",w="aria-invalid",M="data-rule",x="data-target",O="data-tip",$="data-inputstatus",A="novalidate",R=":verifiable",V=/(\w+)(?:\[(.*)\]$|\((.*)\)$)?/,S=/(?:([^:;\(\[]*):)?(.*)/,j=/[^\x00-\xff]/g,C=/^.*(top|right|bottom|left).*$/,T=/(?:(post|get):)?(.+)/i,q=/<|>/g,F=e.noop,N=e.proxy,E=e.isFunction,D=e.isArray,I=function(e){return"string"==typeof e},H=function(e){return e&&"[object Object]"===Object.prototype.toString.call(e)},L=!window.XMLHttpRequest,P=function(e,i,n){return n===t?e.getAttribute(i):(null===n?e.removeAttribute(i):e.setAttribute(i,""+n),t)},W=window.console||{log:F,info:F,warn:F},U={debug:0,timely:1,theme:"default",stopOnError:!1,ignore:"",beforeSubmit:F,valid:F,invalid:F,msgWrapper:"span",msgMaker:function(e){var t,i={error:m,ok:p,tip:v,loading:y}[e.type];return t='<span class="msg-wrap '+i+'" role="alert">',t+=(e.arrow||"")+(e.icon||"")+'<span class="n-msg">'+e.msg+"</span>",t+="</span>"},msgIcon:'<span class="n-icon"></span>',msgArrow:"",msgClass:"",defaultMsg:"{0} is not valid.",loadingMsg:"Validating..."},X={"default":{formClass:"n-default",msgClass:"n-right",showOk:""}};e.fn[h]=function(t){var n=this,r=arguments;return n.is(":input")?n:(!n.is("form")&&(n=this.find("form")),!n.length&&(n=this),n.each(function(){if(I(t)){if("_"===t.charAt(0))return;var n=e(this).data(h);n&&n[t].apply(n,Array.prototype.slice.call(r,1))}else new i(this,t)}),this)},e.fn.isValid=function(e,i){var n,r,s=l(this[0]);return s?(i===t&&(i=!0),s.checkOnly=i,n=this.is(":input")?this:this.find(R),r=s._multiValidate(n,function(t){E(e)&&e.call(null,t),s.checkOnly=!1},!0),E(e)?this:r):!0},e.expr[":"].verifiable=function(e){var t=e.nodeName.toLowerCase();return("input"===t&&"submit"!==e.type&&"button"!==e.type&&"reset"!==e.type||"select"===t||"textarea"===t)&&e.disabled===!1&&null===P(e,A)},i.prototype={_init:function(){var t=this,i=t.options,n=t.fields;D(i.groups)&&e.map(i.groups,function(i){if(!I(i.fields)||!E(i.callback))return null;var r=t.$el.find(a(i.fields)),s=function(){return i.callback.call(t,r)};e.extend(s,i),e.map(i.fields.split(" "),function(e){n[e]=n[e]||{},n[e].group=s})}),H(i.fields)&&e.each(i.fields,function(e,t){t&&(n[e]=I(t)?{rule:t}:t)}),t.$el.find(R).each(function(){t._parse(this)}),t.msgOpt={type:"error",pos:f(i.msgClass),cls:i.msgClass,style:i.msgStyle,icon:i.msgIcon,arrow:i.msgArrow,show:i.msgShow,hide:i.msgHide},t.$el.data(h)||(t.$el.on("submit."+h+" validate."+h,N(t,"_submit")).on("reset."+h,N(t,"_reset")).on("showtip."+h,N(t,"_showTip")).on("validated.field."+h,R,N(t,"_validatedField")).on("validated.rule."+h,R,N(t,"_validatedRule")).on("focusin."+h+" click."+h+" showtip."+h,R,N(t,"_focus")).on("focusout."+h+" validate."+h,R,N(t,"_blur")).on("click."+h,"input:radio,input:checkbox",N(t,"_click")),i.timely>=2&&t.$el.on("keyup."+h+" paste."+h,R,N(t,"_blur")).on("change."+h,"select",N(t,"_click")),t.$el.data(h,t).addClass("n-"+h+" "+i.formClass),P(t.$el[0],A,!0))},_multiValidate:function(i,n,r){var s=this,a=s.options;return a.ignore&&(i=i.not(a.ignore)),s.isValid=!0,s.deferred={},i.each(function(e,i){var n=s.getField(i);if(n)return s._validate(i,n,r),!s.isValid&&a.stopOnError?!1:t}),e.when.apply(null,e.map(s.deferred,function(e){return e})).done(function(){n.call(s,s.isValid)}),e.isEmptyObject(s.deferred)?s.isValid:t},_submit:function(i,n){var r,s=this,a=s.options,l=i.target;if(P(l,"novalidateonce"))return P(l,"novalidateonce",null),t;if("only"!==n&&("validate"!==i.type||s.$el[0]===l)){if(s.submiting)return E(s.submiting)&&s.submiting.call(s),i.preventDefault(),t;if(s.isAjaxSubmit===t)if(null===P(l,"action"))s.isAjaxSubmit=!0;else{var u=e[e._data?"_data":"data"](s.$el[0],"events");s.isAjaxSubmit=u&&u.valid&&e.map(u.valid,function(e){return-1!==e.namespace.indexOf("form")?1:null}).length?!0:!1}if(a.beforeSubmit.call(s,l)===!1)return s.isAjaxSubmit&&i.preventDefault(),t;s._reset(),s.submiting=!0,r=s._multiValidate(s.$el.find(R),function(t){var i,n="focus.field",r=t||2===a.debug?"valid":"invalid";if(!t){var u=s.$el.find(":input."+k+":first");u.trigger(n),L&&u.trigger(n),i=e.map(s.errors,function(e){return e})}s.submiting=!1,a[r].call(s,l,i),s.$el.trigger(r+".form",[l,i]),t&&!s.isAjaxSubmit&&e(l).trigger("submit",["only"])},!0),(!r||s.isAjaxSubmit)&&i.preventDefault()}},_reset:function(t){var i=this;i.errors={},i.isValid=!0,t&&i.$el.find(":verifiable").each(function(t,n){i.hideMsg(n),P(n,$,null),P(n,w,null),e(n).removeClass(b+" "+k)})},_focus:function(e){var t=e.target;if("showtip"!==e.type){if(this.submiting)return;if(""!==t.value&&("false"===P(t,w)||"tip"===P(t,$)))return}this.showMsg(t,{msg:P(t,O),type:"tip"})},_blur:function(t,i){var n,r,s=this,a=s.options,l=t.target,u=t.type,o=100;if(!i&&"paste"!==u){if("validate"===u)r=!0,o=0;else{if(P(l,"notimely"))return;if(a.timely>=2&&"keyup"!==u)return}if(a.ignore&&e(l).is(a.ignore))return;if("keyup"===u){var d=t.keyCode,f={8:1,9:1,16:1,32:1,46:1};if(9===d&&!l.value)return;if(48>d&&!f[d])return;o=a.timely>=100?a.timely:500}}n=s.getField(l),n&&(o?(n.timeout&&clearTimeout(n.timeout),n.timeout=setTimeout(function(){s._validate(l,n,r)},o)):s._validate(l,n,r))},_click:function(e){this._blur(e,!0)},_showTip:function(e){var t=this;t.$el[0]===e.target&&t.$el.find("input,select,textarea").filter(":verifiable").each(function(){t.showMsg(this,{msg:P(this,O),type:"tip"})})},_parse:function(e){var i,n=this,r=e.name;return(e.id&&"#"+e.id in n.fields||!e.name)&&(r="#"+e.id),r?(i=n.fields[r]||{},i.rule||(i.rule=P(e,M)||""),P(e,M,null),i.rule&&(i.key=r,i.required=-1!==i.rule.indexOf("required"),i.must=i.must||!!i.rule.match(/match|checked/),i.required&&P(e,"aria-required",!0),("timely"in i&&!i.timely||!n.options.timely)&&P(e,"notimely",!0),I(i.target)&&P(e,x,i.target),I(i.tip)&&P(e,O,i.tip),n.fields[r]=n._parseRule(i)),t):P(e,M,null)},_parseRule:function(i){var n,r=S.exec(i.rule);if(r)return i.display=r[1],i.rules=[],n=(r[2]||"").split(";"),e.map(n,function(n){var r=V.exec(n);return r?(r[3]&&(r[2]=r[3]),i.rules.push({method:r[1],params:r[2]?e.trim(r[2]).split(", "):t}),t):null}),i.vid=0,i.rid=i.rules[0].method,i},_validatedField:function(t,i,n){var r=this,s=r.options,a=t.target,l=i.isValid=!!n.valid;l?n.type="ok":r.submiting&&(r.errors[i.key]=n.msg),e(a).attr(w,!l).addClass(l?b:k).removeClass(l?k:b).trigger((l?"valid":"invalid")+".field",[i,n]),i.old.ret=n,r.elements[i.key]=a,(i.msgMaker||s.msgMaker&&!r.checkOnly)&&(!n.showOk&&n.msg||n.showOk&&s.showOk!==!1?r.showMsg(a,n,i):r.hideMsg(a,n))},_validatedRule:function(i,n,r,s){n=n||a.getField(u);var a=this,l=a.options,u=i.target,o="",f=n.rid,c=!1,g=!1;if(s=s||{},r===!0||r===t?c=!0:(o=d(u,n,f),o||(I(r)?(o=r,r={error:o}):H(r)&&(r.error?o=r.error:(c=!0,r.ok&&I(r.ok)&&(g=!0),o=r.ok))),s.msg=(c?o:o||a.messages[f]||U.defaultMsg).replace("{0}",n.display||"")),c){if(s.valid=!0,!g){var h=n.ok||P(u,"data-ok");h?(g=!0,s.msg=h):I(l.showOk)&&(g=!0,s.msg=l.showOk)}s.showOk=g,e(u).trigger("valid.rule",[f,s.msg])}else a.isValid=!1,e(u).trigger("invalid.rule",[f,s.msg]);l.debug&&W[c?"info":"warn"](n.vid+": "+f+" -> "+(s.msg||!0)),c&&n.old.value!==t&&n.old.value!==u.value?(n.vid=0,a._checkRule(u,n)):c&&n.vid<n.rules.length-1?(n.vid++,a._checkRule(u,n)):(n.vid=0,e(u).trigger("validated.field",[n,s]))},_checkRule:function(i,n){var r,s=this,a=n.key,l=n.rules[n.vid],u=l.method,d=l.params;if(!s.submiting||!s.deferred[a])if(n.rid=u,n.old.value=i.value,r=(o(i,u)||s.rules[u]||function(){return!0}).call(s,i,d,n),H(r)&&E(r.then)){var f=function(e){return I(e)||H(e)&&("error"in e||"ok"in e)?e:t};s.deferred[a]=r,!s.checkOnly&&s.showMsg(i,{type:"loading",msg:s.options.loadingMsg},n),r.then(function(r,s,a){var l,u=a.responseText;""===u?u=!0:"{"===u.charAt(0)&&(u=e.parseJSON(u)||{},l=f(u),l===t&&(l=f(u.data)),u=l||!0),e(i).trigger("validated.rule",[n,u])},function(t,r){e(i).trigger("validated.rule",[n,r])}),n.isValid=t}else null!==r&&e(i).trigger("validated.rule",[n,r])},_validate:function(i,n,r){if(!i.disabled&&null===P(i,A)){n.rules||this._parse(i);var s,a,l=this,u=l.options,o=e(i),d={},f=n.group,g="tip"===P(i,$),h=n.isValid=!0;if(s=n.old=n.old||{},r=r||n.must,f&&(e.extend(d,f),a=f.call(l),a!==!0?(I(a)&&(a={error:a}),n.vid=0,n.rid="group",h=!1):(a=t,l.hideMsg(i,d))),!h||n.required||n.must||""!==i.value){if(!r&&s&&s.ret!==t&&s.value===i.value){if(s.ret.valid||(l.isValid=!1),g)return;if(""!==i.value)return d=s.ret,o.trigger("validated.field",[n,d]),t}}else{if(g)return;if(l._focus({target:i}),s.value="",!c(i))return o.trigger("validated.field",[n,{valid:!0}]),t}u.debug&&W.log(n.key),a!==t?o.trigger("validated.rule",[n,a,d]):n.rule&&l._checkRule(i,n)}},_getMsgOpt:function(t){return e.extend({},this.msgOpt,I(t)?{msg:t}:t)},getField:function(e){var t,i=this;return t=e.id&&"#"+e.id in i.fields||!e.name?"#"+e.id:e.name,P(e,M)&&i._parse(e),i.fields[t]},test:function(i,n){var r,s,a,l=this,u=V.exec(n);return u?(u[3]&&(u[2]=u[3]),s=u[1],a=u[2]?e.trim(u[2]).split(", "):t,s in l.rules&&(r=l.rules[s].call(l,i,a)),r===!0||r===t||!1):!0},getRangeMsg:function(e,t,i,n){if(t){var r=this,s=r.messages[i]||"",a=t[0].split("~"),l=a[0],u=a[1],o="rg",d=[""],f=+e===+e;if(2===a.length){if(l&&u){if(f&&e>=+l&&+u>=e)return!0;d=d.concat(a)}else if(l&&!u){if(f&&e>=+l)return!0;d.push(l),o="gt"}else if(!l&&u){if(f&&+u>=e)return!0;d.push(u),o="lt"}}else{if(e===+l)return!0;d.push(l),o="eq"}return s&&(n&&s[o+n]&&(o+=n),d[0]=s[o]),r.renderMsg.apply(null,d)}},renderMsg:function(){var e=arguments,t=e[0],i=e.length;if(t){for(;--i;)t=t.replace("{"+i+"}",e[i]);return t}},_getMsgDOM:function(t,i){var n,r,s,a=e(t);if(a.is(":input")?(s=i.target||P(t,x),s&&(s=this.$el.find(s),s.length&&(s.is(":input")?t=s.get(0):n=s)),n||(r=!c(t)&&t.id?t.id:t.name,n=this.$el.find(this.options.msgWrapper+"."+_+'[for="'+r+'"]'))):n=a,!n.length)if(a=this.$el.find(s||t),n=e("<"+this.options.msgWrapper+">").attr({"class":_+(i.cls?" "+i.cls:""),style:i.style||"","for":r}),c(t)){var l=a.parent();n.appendTo(l.is("label")?l.parent():l)}else n[i.pos&&"right"!==i.pos?"insertBefore":"insertAfter"](a);return n},showMsg:function(t,i,n){if(i=this._getMsgOpt(i),i.msg||i.showOk){t=e(t).get(0),e(t).is(":verifiable")&&(P(t,$,i.type),n=n||this.getField(t));var r=this._getMsgDOM(t,i),s=r[0].className;!C.test(s)&&r.addClass(i.cls),L&&"bottom"===i.pos&&(r[0].style.marginTop=e(t).outerHeight()+"px"),r.html(((n||{}).msgMaker||this.options.msgMaker).call(this,i)),r[0].style.display="",E(i.show)&&i.show.call(this,r,i.type)}},hideMsg:function(t,i){t=e(t).get(0),i=this._getMsgOpt(i);var n=this._getMsgDOM(t,i);n.length&&(E(i.hide)?i.hide.call(this,n,i.type):n[0].style.display="none")},mapMsg:function(t){var i=this;e.each(t,function(e,t){var n=i.elements[e]||i.$el.find(':input[name="'+e+'"]')[0];i.showMsg(n,t)})},setMsg:function(e){new r(e,this.messages)},setRule:function(t){new n(t,this.rules),e.map(this.fields,function(e){e.old={}})},setField:function(i,n){var r=this,s={};if(I(i)){if(null===n)return e.map(i.split(" "),function(e){e&&r.fields[e]&&(r.fields[e]=null)}),t;n&&(s[i]=n)}else H(i)&&(s=i);r.options.fields?e.extend(r.options.fields,s):r.options.fields=s,r._init()},holdSubmit:function(e){e===t&&(e=!0),this.submiting=e},destroy:function(){this._reset(!0),this.$el.off("."+h).removeData(h)}},e(document).on("focusin",":input["+M+"]",function(){u(this)}).on("click","input,button",function(){if(this.form)if("submit"===this.type&&null!==P(this,A))P(this.form,"novalidateonce",!0);else if(this.name&&c(this)){var t=this.form.elements[this.name][0];P(t,M)&&(u(t),e(t).trigger("validate"))}}).on("submit","form",function(t){if(null===P(this,A)){var i,n=e(this);n.data(h)||(i=n[h]().data(h),e.isEmptyObject(i.fields)?(P(this,A,!0),n.removeData(h)):"submit"===t.type&&i._submit(t))}}),new n({required:function(t,i){var n=e.trim(t.value),r=!0;if(i)if(1===i.length){if(!n&&!this.test(t,i[0]))return"tip"!==P(t,$)&&this.hideMsg(t),null}else"not"===i[0]&&e.map(i.slice(1),function(t){n===e.trim(t)&&(r=!1)});return r&&!!n},integer:function(e,t){var i,n="0|",r="[1-9]\\d*",s=t?t[0]:"*";switch(s){case"+":i=r;break;case"-":i="-"+r;break;case"+0":i=n+r;break;case"-0":i=n+"-"+r;break;default:i=n+"-?"+r}return i="^(?:"+i+")$",RegExp(i).test(e.value)||this.messages.integer[s]},match:function(t,i,n){var r,s,a,l,u,o,d,f="eq";if(i&&(1===i.length?a=i[0]:(f=i[0],a=i[1]),u="#"===a.charAt(0)?a:':input[name="'+a+'"]',o=this.$el.find(u)[0])){if(d=this.getField(o),r=t.value,s=o.value,n.init_match||(this.$el.on("valid.field."+h,u,function(){!n.isValid&&t.value&&e(t).trigger("validate")}),n.init_match=1),!n.required&&""===r&&""===s)return"error"===P(t,$)&&this.hideMsg(t),null;if(i[2]&&("date"===i[2]?(r=g(r),s=g(s)):"time"===i[2]&&(r=+r.replace(":",""),s=+s.replace(":",""))),"eq"!==f&&!isNaN(+r)&&isNaN(+s))return!0;switch(l=this.messages.match[f].replace("{1}",d.display||a),f){case"lt":return+s>+r||l;case"lte":return+s>=+r||l;case"gte":return+r>=+s||l;case"gt":return+r>+s||l;case"neq":return r!==s||l;default:return r===s||l}}},range:function(e,t){return this.getRangeMsg(+e.value,t,"range")},checked:function(t,i,n){if(!c(t))return!0;var r,s;return s=this.$el.find('input[name="'+t.name+'"]').filter(function(){return!r&&c(this)&&(r=this),!this.disabled&&this.checked&&e(this).is(":visible")}).length,i?this.getRangeMsg(s,i,"checked"):!!s||d(r,n,"checked")||this.messages.required},length:function(e,t){var i=e.value,n=(t[1]?i.replace(j,"xx"):i).length;return t&&"~"===t[0].charAt(0)&&(t[0]="0"+t[0]),this.getRangeMsg(n,t,"length",t[1]?"_2":"")},remote:function(t,i){var n,r=this,s={};return i?(n=T.exec(i[0]),s[t.name]=t.value,i[1]&&e.map(i.slice(1),function(e){s[e]=r.$el.find(':input[name="'+e+'"]').val()}),e.ajax({url:n[2],async:!0,type:n[1]||"POST",data:s,cache:!1})):!0},filter:function(e,t){var i=t?RegExp("["+t[0]+"]","g"):q;return e.value=e.value.replace(i,""),!0}}),i.config=function(t){e.each(t,function(e,t){"rules"===e?new n(t):"messages"===e?new r(t):U[e]=t})},i.setTheme=function(t,i){H(t)?e.each(t,function(e,t){X[e]=t}):I(t)&&H(i)&&(X[t]=i)},e[h]=i}(jQuery);
