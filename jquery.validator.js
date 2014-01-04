/*! nice Validator 0.7.0
 * (c) 2012-2013 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function(e,t){"use strict";function i(r,s){var n=this;return!n instanceof i?new i(r,s):(n.$el=e(r),n._init(r,s),t)}function r(e,t){var i=t?t===!0?this:t:r.prototype;if(W(e))for(var s in e)i[s]=n(e[s])}function s(e,t){var i=t?t===!0?this:t:s.prototype;if(W(e))for(var r in e){if(!e[r])return;i[r]=e[r]}}function n(t){switch(e.type(t)){case"function":return t;case"array":return function(e){return t[0].test(e.value)||t[1]||!1};case"regexp":return function(e){return t.test(e.value)}}}function a(t){var i="";return e.map(t.split(" "),function(e){i+=","+("#"===e.charAt(0)?e:'[name="'+e+'"]')}),i.substring(1)}function l(t){var i;if(t&&t.tagName){switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":case"BUTTON":case"FIELDSET":i=t.form||e(t).closest(".n-"+h);break;case"FORM":i=t;break;default:i=e(t).closest(".n-"+h)}return e(i).data(h)||e(i)[h]().data(h)}}function u(t,i){if(t.form&&null===B(t.form,F)){var r=l(t);r?(r._parse(t),e(t).trigger(i)):B(t,x,null)}}function o(i,r){var s=e.trim(B(i,x+"-"+r));if(s)return s=Function("return "+s)(),s?n(s):t}function d(e,t,i){var r=t.msg;return W(r)&&i&&(r=r[i]),P(r)||(r=B(e,"data-msg-"+i)||B(e,"data-msg")||""),r}function f(e){var t;return e&&(t=N.exec(e)),t?t[1]:""}function c(e){return"INPUT"===e.tagName&&"checkbox"===e.type||"radio"===e.type}function g(e){return Date.parse(e.replace(/\.|\-/g,"/"))}var p,h="validator",m="n-ok",v="n-error",y="n-tip",b="n-loading",k="n-valid",_="n-invalid",w="msg-box",M="aria-required",O="aria-invalid",x="data-rule",$="data-target",A="data-tip",T="data-inputstatus",F="novalidate",V=":verifiable",C=/(!?)\s?(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\||&)?/g,S=/(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,R=/(?:([^:;\(\[]*):)?(.*)/,E=/[^\x00-\xff]/g,N=/^.*(top|right|bottom|left).*$/,q=/(?:(post|get):)?(.+)/i,j=/<|>/g,D=e.noop,I=e.proxy,L=e.isFunction,U=e.isArray,P=function(e){return"string"==typeof e},W=function(e){return e&&"[object Object]"===Object.prototype.toString.call(e)},H=!window.XMLHttpRequest,B=function(e,i,r){return r===t?e.getAttribute(i):(null===r?e.removeAttribute(i):e.setAttribute(i,""+r),t)},X=window.console||{log:D,info:D},J={debug:0,timely:1,theme:"default",ignore:"",focusInvalid:!0,msgWrapper:"span",msgMaker:function(e){var t,i={error:v,ok:m,tip:y,loading:b}[e.type];return t='<span class="msg-wrap '+i+'" role="alert">',t+=(e.arrow||"")+(e.icon||"")+'<span class="n-msg">'+e.msg+"</span>",t+="</span>"},msgIcon:'<span class="n-icon"></span>',msgArrow:"",msgClass:"",defaultMsg:"{0} is not valid.",loadingMsg:"Validating..."},Q={"default":{formClass:"n-default",msgClass:"n-right",showOk:""}};e.fn[h]=function(t){var r=this,s=arguments;return r.is(":input")?r:(!r.is("form")&&(r=this.find("form")),!r.length&&(r=this),r.each(function(){var r=e(this).data(h);if(r)if(P(t)){if("_"===t.charAt(0))return;r[t].apply(r,Array.prototype.slice.call(s,1))}else t&&(r._reset(!0),r._init(this,t));else new i(this,t)}),this)},e.fn.isValid=function(e,i){var r,s,n=l(this[0]);return n?(i===t&&(i=!0),n.checkOnly=i,r=this.is(":input")?this:this.find(V),s=n._multiValidate(r,function(t){L(e)&&e.call(null,t),n.checkOnly=!1}),L(e)?this:s):!0},e.expr[":"].verifiable=function(e){var t=e.nodeName.toLowerCase();return("input"===t&&"submit"!==e.type&&"button"!==e.type&&"reset"!==e.type||"select"===t||"textarea"===t)&&e.disabled===!1&&null===B(e,F)},i.prototype={_init:function(i,n){var l,u,o,d=this;if(L(n)&&(n={valid:n}),n=n||{},o=B(i,"data-"+h+"-option"),o=o&&"{"===o.charAt(0)?Function("return "+o)():{},u=Q[n.theme||o.theme||J.theme],l=d.options=e.extend({},J,u,o,this.options,n),d.rules=new r(l.rules,!0),d.messages=new s(l.messages,!0),d.elements=d.elements||{},d.deferred={},d.errors={},d.fields={},d._initFields(l.fields),U(l.groups)&&e.map(l.groups,function(i){return P(i.fields)&&L(i.callback)?(i.$elems=d.$el.find(a(i.fields)),e.map(i.fields.split(" "),function(e){d.fields[e]=d.fields[e]||{},d.fields[e].group=i}),t):null}),d.msgOpt={type:"error",pos:f(l.msgClass),wrapper:l.msgWrapper,cls:l.msgClass,style:l.msgStyle,icon:l.msgIcon,arrow:l.msgArrow,show:l.msgShow,hide:l.msgHide},d.isAjaxSubmit=!1,l.valid||null===B(i,"action"))d.isAjaxSubmit=!0;else{var c=e[e._data?"_data":"data"](i,"events");c&&c.valid&&e.map(c.valid,function(e){return-1!==e.namespace.indexOf("form")?1:null}).length&&(d.isAjaxSubmit=!0)}d.$el.data(h)||(d.$el.data(h,d).addClass("n-"+h+" "+l.formClass).on("submit."+h+" validate."+h,I(d,"_submit")).on("reset."+h,I(d,"_reset")).on("showtip."+h,I(d,"_showTip")).on("validated.field."+h,V,I(d,"_validatedField")).on("validated.rule."+h,V,I(d,"_validatedRule")).on("focusin."+h+" click."+h+" showtip."+h,V,I(d,"_focus")).on("focusout."+h+" validate."+h,V,I(d,"_blur")).on("click."+h,"input:radio,input:checkbox",I(d,"_click")),l.timely>=2&&d.$el.on("keyup."+h+" paste."+h,V,I(d,"_blur")).on("change."+h,"select",I(d,"_click")),d.NOVALIDATE=B(i,F),B(i,F,F))},_initFields:function(t){var i=this;W(t)&&e.each(t,function(e,t){var r=i.elements[e];!t&&r&&i._resetElement(r,!0),i.fields[e]=P(t)?{rule:t}:t}),i.$el.find(V).each(function(){i._parse(this)})},_multiValidate:function(i,r){var s=this,n=s.options;return s.isValid=!0,s.deferred={},n.ignore&&(i=i.not(n.ignore)),i.each(function(e,i){var r=s.getField(i);if(r)return s._validate(i,r),!s.isValid&&n.stopOnError?!1:t}),e.when.apply(null,e.map(s.deferred,function(e){return e})).done(function(){r.call(s,s.isValid)}),e.isEmptyObject(s.deferred)?s.isValid:t},_submit:function(i,r){var s=this,n=s.options,a=i.target;if(p)return p=!1,t;if("only"!==r&&("validate"!==i.type||s.$el[0]===a))return i.preventDefault(),s.submiting?(L(s.submiting)&&s.submiting.call(s),t):(L(n.beforeSubmit)&&n.beforeSubmit.call(s,a)===!1||(s._reset(),s.submiting=!0,s.autoSubmit="submit"===i.type,n.debug&&X.log("\n"+i.type+" form"),s._multiValidate(s.$el.find(V),function(t){var i,r,l="focus.field",u=t||2===n.debug?"valid":"invalid";t||(n.focusInvalid&&(i=s.$el.find(":input["+O+'="true"]:first').trigger(l),H&&i.trigger(l)),r=e.map(s.errors,function(e){return e})),s.submiting=!1,L(n[u])&&n[u].call(s,a,r),s.$el.trigger(u+".form",[a,r]),t&&!s.isAjaxSubmit&&s.autoSubmit&&(p=!0,a.submit())})),t)},_reset:function(e){var t=this;t.errors={},e&&t.$el.find(V).each(function(e,i){t._resetElement(i)})},_resetElement:function(t,i){e(t).removeClass(k+" "+_),this.hideMsg(t),i&&B(t,M,null)},_focus:function(t){var i,r=this,s=t.target;if("showtip"!==t.type){if(t.isTrigger||r.submiting)return;if(""!==s.value&&"tip"===B(s,T))return;r.options.focusCleanup&&"error"===B(s,T)&&(e(s).removeClass(_),r.hideMsg(s))}i=B(s,A),i&&r.showMsg(s,{msg:i,type:"tip"})},_blur:function(t,i){var r,s,n=this,a=n.options,l=t.target,u=t.type,o=150;if(!i&&"paste"!==u){if("validate"===u)s=!0,o=0;else{if(B(l,"notimely"))return;if(a.timely>=2&&"keyup"!==u)return}if(a.ignore&&e(l).is(a.ignore))return;if("keyup"===u){var d=t.keyCode,f={8:1,9:1,16:1,32:1,46:1};if(9===d&&!l.value)return;if(48>d&&!f[d])return;o=a.timely>=100?a.timely:500}}r=n.getField(l),r&&(o?(r.timeout&&clearTimeout(r.timeout),r.timeout=setTimeout(function(){n._validate(l,r,s)},o)):n._validate(l,r,s))},_click:function(e){this._blur(e,!0)},_showTip:function(e){var t=this;t.$el[0]===e.target&&t.$el.find(V+"["+A+"]").each(function(){t.showMsg(this,{msg:B(this,A),type:"tip"})})},_parse:function(e){var t,i=this,r=e.name,s=B(e,x);s&&B(e,x,null),(e.id&&"#"+e.id in i.fields||!e.name)&&(r="#"+e.id),r&&(t=i.fields[r]||{},t.key=r,t.old={},null!==i.fields[r]&&(t.rule=t.rule||s||""),t.rule&&(t.rule.match(/match|checked/)&&(t.must=!0),-1!==t.rule.indexOf("required")&&(t.required=!0,B(e,M,!0)),("timely"in t&&!t.timely||!i.options.timely)&&B(e,"notimely",!0),P(t.target)&&B(e,$,t.target),P(t.tip)&&B(e,A,t.tip),i.fields[r]=i._parseRule(t)))},_parseRule:function(e){var i=R.exec(e.rule);if(i)return e.vid=0,e.display=i[1],i[2]&&(e.rules=[],i[2].replace(C,function(){var i=arguments;i[3]=i[3]||i[4],e.rules.push({not:"!"===i[1],method:i[2],params:i[3]?i[3].split(", "):t,or:"|"===i[5]})})),e},_validatedField:function(t,i,r){var s=this,n=s.options,a=t.target,l=r.isValid=i.isValid=!!r.isValid,u=l?"valid":"invalid";r.key=i.key,r.rule=i.rid,l?r.type="ok":(s.submiting&&(s.errors[i.key]=r.msg),s.isValid=!1),i.old.value=a.value,i.old.id=a.id,s.elements[i.key]=a,s.checkOnly||(L(i[u])&&i[u].call(s,a,r),e(a).attr(O,l?null:!0).removeClass(l?_:k).addClass(r.skip?"":l?k:_).trigger(u+".field",[r,s]),(i.msgMaker||n.msgMaker)&&(!r.showOk&&r.msg||r.showOk&&n.showOk!==!1?s.showMsg(a,r,i):s.hideMsg(a,r,i)))},_validatedRule:function(i,r,s,n){var a,l,u,o=this,f=o.options,c=i.target,g="",p=!1,h=!1;if(n=n||{},r=r||o.getField(c),l=r.rid,null===s)return e(c).trigger("validated.field",[r,{isValid:!0,skip:!0}]),t;if(s===!0||s===t?p=!0:(g=d(c,r,l),g||(P(s)?(g=s,s={error:g}):W(s)&&(s.error?g=s.error:(p=!0,s.ok&&P(s.ok)&&(h=!0),g=s.ok))),n.msg=(p?g:g||o.messages[l]||J.defaultMsg).replace("{0}",r.display||"")),r.rules&&(a=r.rules[r.vid],a.not&&(p="required"===l||!p),a.or))if(p)for(;r.rules[r.vid++].or&&r.vid!==r.rules.length;);else u=!0;if(f.debug&&X.log("   "+r.vid+": "+l+" => "+(n.msg||!0)),!u)if(p){if(n.isValid=!0,!h){var m=r.ok||B(c,"data-ok");m?(h=!0,n.msg=m):P(f.showOk)&&(h=!0,n.msg=f.showOk)}n.showOk=h,e(c).trigger("valid.rule",[l,n.msg])}else e(c).trigger("invalid.rule",[l,n.msg]);u||p&&r.vid<r.rules.length-1?(r.vid++,o._checkRule(c,r)):(r.vid=0,e(c).trigger("validated.field",[r,n]))},_checkRule:function(i,r){var s,n,a=this,l=r.key,u=r.rules[r.vid],f=u.method,c=u.params;if(!a.submiting||!a.deferred[l]){if(n=r.old,r.rid=f,!r.must&&n.ret!==t&&n.rule===u&&n.id===i.id&&i.value&&n.value===i.value)s=n.ret;else{var g=o(i,f)||a.rules[f];s=g?g.call(a,i,c,r):d(i,r,f)||a.messages[f]}if(W(s)&&L(s.then)){var p=function(e){return P(e)||W(e)&&("error"in e||"ok"in e)?e:t};a.deferred[l]=s,!a.checkOnly&&a.showMsg(i,{type:"loading",msg:a.options.loadingMsg},r),s.then(function(s,l,o){var d,f=o.responseText,c=r.dataFilter||a.options.dataFilter;"json"===this.dataType?f=s:"{"===f.charAt(0)&&(f=e.parseJSON(f)||{}),L(c)?f=c(f):""===f?f=!0:(d=p(f),d===t&&(d=p(f.data)),f=d||!0),n.rule=u,n.ret=f,e(i).trigger("validated.rule",[r,f])},function(t,s){e(i).trigger("validated.rule",[r,s])}),r.isValid=t}else e(i).trigger("validated.rule",[r,s])}},_validate:function(i,r){if(!i.disabled&&null===B(i,F)){r.rules||this._parse(i);var s,n=this,a=n.options,l=e(i),u={},o=r.group,d=r.isValid=!0;if(a.debug&&X.info(r.key),o&&(s=o.callback.call(n,o.$elems),s===!0&&(s=t),s!==t&&(P(s)&&(s={error:s}),r.vid=0,r.rid="group",d=!1,n.hideMsg(i,{},r),e.extend(u,o))),d&&!r.required&&!r.must&&!i.value){if("tip"===B(i,T))return;if(!c(i))return l.trigger("validated.field",[r,{isValid:!0}]),t}s!==t?l.trigger("validated.rule",[r,s,u]):r.rule&&n._checkRule(i,r)}},_getMsgOpt:function(t){return e.extend({},this.msgOpt,P(t)?{msg:t}:t)},getField:function(e){var t,i=this;return t=e.id&&"#"+e.id in i.fields||!e.name?"#"+e.id:e.name,B(e,x)&&i._parse(e),i.fields[t]},test:function(e,i){var r,s,n,a=this,l=S.exec(i);return l&&(s=l[1],s in a.rules&&(n=l[2]||l[3],n=n?n.split(", "):t,r=a.rules[s].call(a,e,n))),r===!0||r===t||null===r||!1},getRangeMsg:function(e,t,i,r){if(t){var s=this,n=s.messages[i]||"",a=t[0].split("~"),l=a[0],u=a[1],o="rg",d=[""],f=+e===+e;if(2===a.length){if(l&&u){if(f&&e>=+l&&+u>=e)return!0;d=d.concat(a)}else if(l&&!u){if(f&&e>=+l)return!0;d.push(l),o="gt"}else if(!l&&u){if(f&&+u>=e)return!0;d.push(u),o="lt"}}else{if(e===+l)return!0;d.push(l),o="eq"}return n&&(r&&n[o+r]&&(o+=r),d[0]=n[o]),s.renderMsg.apply(null,d)}},renderMsg:function(){var e=arguments,t=e[0],i=e.length;if(t){for(;--i;)t=t.replace("{"+i+"}",e[i]);return t}},_getMsgDOM:function(t,i){var r,s,n,a=e(t);if(a.is(":input")?(n=i.target||B(t,$),n&&(n=this.$el.find(n),n.length&&(n.is(":input")?t=n.get(0):r=n)),r||(s=!c(t)&&t.id?t.id:t.name,r=this.$el.find(i.wrapper+"."+w+'[for="'+s+'"]'))):r=a,!r.length)if(a=this.$el.find(n||t),r=e("<"+i.wrapper+">").attr({"class":w+(i.cls?" "+i.cls:""),style:i.style||"","for":s}),c(t)){var l=a.parent();r.appendTo(l.is("label")?l.parent():l)}else r[i.pos&&"right"!==i.pos?"insertBefore":"insertAfter"](a);return r},showMsg:function(t,i,r){if(i=this._getMsgOpt(i),i.msg||i.showOk){t=e(t).get(0),e(t).is(V)&&(B(t,T,i.type),r=r||this.getField(t),r&&(i.style=r.msgStyle||i.style,i.cls=r.msgClass||i.cls,i.wrapper=r.msgWrapper||i.wrapper));var s=this._getMsgDOM(t,i),n=s[0].className;!N.test(n)&&s.addClass(i.cls),H&&"bottom"===i.pos&&(s[0].style.marginTop=e(t).outerHeight()+"px"),s.html(((r||{}).msgMaker||this.options.msgMaker).call(this,i)),s[0].style.display="",L(i.show)&&i.show.call(this,s,i.type)}},hideMsg:function(t,i,r){t=e(t).get(0),i=this._getMsgOpt(i),e(t).is(V)&&(B(t,T,null),B(t,O,null),r=r||this.getField(t),r&&(i.wrapper=r.msgWrapper||i.wrapper));var s=this._getMsgDOM(t,i);s.length&&(L(i.hide)?i.hide.call(this,s,i.type):s[0].style.display="none")},mapMsg:function(t){var i=this;e.each(t,function(e,t){var r=i.elements[e]||i.$el.find(':input[name="'+e+'"]')[0];i.showMsg(r,t)})},setMsg:function(e){new s(e,this.messages)},setRule:function(t){new r(t,this.rules),e.map(this.fields,function(e){e.old={}})},setField:function(e,t){var i={};P(e)?i[e]=t:W(e)&&(i=e),this._initFields(i)},holdSubmit:function(e){e===t&&(e=!0),this.submiting=e},cleanUp:function(){this._reset(1)},destroy:function(){this._reset(1),this.$el.off("."+h).removeData(h),B(this.$el[0],F,this.NOVALIDATE)}},e(document).on("focusin",":input["+x+"]",function(){u(this,"focusin")}).on("click","input,button",function(){if(this.form)if("submit"===this.type)null!==B(this,F)&&(p=!0);else if(this.name&&c(this)){var e=this.form.elements[this.name];e.length&&(e=e[0]),B(e,x)&&u(e,"validate")}}).on("submit validate","form",function(t){if(null===B(this,F)){var i,r=e(this);r.data(h)||(i=r[h]().data(h),e.isEmptyObject(i.fields)?(B(this,F,F),r.off("."+h).removeData(h)):i._submit(t))}}),new r({required:function(t,i){var r=e.trim(t.value),s=!0;if(i)if(1===i.length){if(!r&&!this.test(t,i[0]))return B(t,M,null),null;B(t,M,!0)}else"not"===i[0]&&e.map(i.slice(1),function(t){r===e.trim(t)&&(s=!1)});return s&&!!r},integer:function(e,t){var i,r="0|",s="[1-9]\\d*",n=t?t[0]:"*";switch(n){case"+":i=s;break;case"-":i="-"+s;break;case"+0":i=r+s;break;case"-0":i=r+"-"+s;break;default:i=r+"-?"+s}return i="^(?:"+i+")$",RegExp(i).test(e.value)||this.messages.integer[n]},match:function(t,i,r){if(i){var s,n,a,l,u,o,d,f="eq";if(1===i.length?a=i[0]:(f=i[0],a=i[1]),u="#"===a.charAt(0)?a:':input[name="'+a+'"]',o=this.$el.find(u)[0]){if(d=this.getField(o),s=t.value,n=o.value,r.init_match||(this.$el.on("valid.field."+h,u,function(){e(t).trigger("validate")}),r.init_match=d.init_match=1),!r.required&&""===s&&""===n)return null;if(i[2]&&("date"===i[2]?(s=g(s),n=g(n)):"time"===i[2]&&(s=+s.replace(":",""),n=+n.replace(":",""))),"eq"!==f&&!isNaN(+s)&&isNaN(+n))return!0;switch(l=this.messages.match[f].replace("{1}",d.display||a),f){case"lt":return+n>+s||l;case"lte":return+n>=+s||l;case"gte":return+s>=+n||l;case"gt":return+s>+n||l;case"neq":return s!==n||l;default:return s===n||l}}}},range:function(e,t){return this.getRangeMsg(+e.value,t,"range")},checked:function(t,i,r){if(c(t)){var s,n;return n=this.$el.find('input[name="'+t.name+'"]').filter(function(){return!s&&c(this)&&(s=this),!this.disabled&&this.checked&&e(this).is(":visible")}).length,i?this.getRangeMsg(n,i,"checked"):!!n||d(s,r,"checked")||this.messages.required}},length:function(e,t){var i=e.value,r=(t[1]?i.replace(E,"xx"):i).length;return t&&"~"===t[0].charAt(0)&&(t[0]="0"+t[0]),this.getRangeMsg(r,t,"length",t[1]?"_2":"")},remote:function(t,i){if(i){var r,s=this,n=q.exec(i[0]),a=n[2],l=(n[1]||"POST").toUpperCase(),u={};return u[t.name]=t.value,i[1]&&e.map(i.slice(1),function(t){u[e.trim(t)]=s.$el.find(':input[name="'+t+'"]').val()}),u=e.param(u),"POST"===l&&(r=a.indexOf("?"),-1!==r&&(u+="&"+a.substring(r+1,a.length),a=a.substring(0,r))),e.ajax({url:a,type:l,data:u,async:!0,cache:!1})}},filter:function(e,t){e.value=e.value.replace(t?RegExp("["+t[0]+"]","g"):j,"")}}),i.config=function(t){e.each(t,function(e,t){"rules"===e?new r(t):"messages"===e?new s(t):J[e]=t})},i.setTheme=function(t,i){W(t)?e.each(t,function(e,t){Q[e]=t}):P(t)&&W(i)&&(Q[t]=i)},e[h]=i}(jQuery);
