/*
    通用表单验证方法
    Validform version 5.2.1
	By sean during April 7, 2010 - December 3, 2012
	For more information, please visit http://validform.rjboy.cn
	Validform is available under the terms of the MIT license.
 */

(function(d, f, b) {
	var g = null, j = null, i = true;
	var e = {
		tit : "提示信息",
		w : "请输入正确信息！",
		r : "通过信息验证！",
		c : "正在检测信息…",
		s : "请填入信息！",
		v : "所填信息没有经过验证，请稍后…",
		p : "正在提交数据…",
		err : "出错了！请检查提交地址或返回数据格式是否正确！",
		abort : "Ajax操作被取消！"
	};
	d.Tipmsg = e;
	var a = function(l, n, k) {
		var n = d.extend({}, a.defaults, n);
		n.datatype && d.extend(a.util.dataType, n.datatype);
		var m = this;
		m.tipmsg = {};
		m.settings = n;
		m.forms = l;
		m.objects = [];
		if (k === true) {
			return false
		}
		l.each(function(p) {
			if (this.validform_inited == "inited") {
				return true
			}
			this.validform_inited = "inited";
			var o = d(this);
			this.validform_status = "normal";
			o.data("tipmsg", m.tipmsg);
			o.find("[datatype]").live("blur", function() {
				var q = arguments[1];
				a.util.check.call(this, o, m, q)
			});
			a.util.enhance.call(o);
			if (n.usePlugin) {
				a.util.usePlugin.call(o, n.usePlugin, n.tiptype, n.tipSweep, p)
			}
			n.btnSubmit && o.find(n.btnSubmit).bind("click", function() {
				var q = a.util.submitForm.call(o, n);
				q === b && (q = true);
				if (q === true) {
					o[0].submit()
				}
			});
			o.submit(function() {
				var q = a.util.submitForm.call(o, n);
				q === b && (q = true);
				return q
			});
			o.find("[type='reset']").add(o.find(n.btnReset)).bind("click",
					function() {
						a.util.resetForm.call(o)
					})
		});
		if (n.tiptype == 1 || (n.tiptype == 2 || n.tiptype == 3) && n.ajaxPost) {
			c()
		}
	};
	a.defaults = {
		tiptype : 1,
		tipSweep : false,
		showAllError : false,
		postonce : false,
		ajaxPost : false
	};
	a.util = {
		dataType : {
			match : /^(.+?)(\d+)-(\d+)$/,
			"*" : /[\w\W]+/,
			"*6-16" : /^[\w\W]{6,16}$/,
			n : /^\d+$/,
			"n6-16" : /^\d{6,16}$/,
			s : /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
			"s6-18" : /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
			p : /^[0-9]{6}$/,
			m : /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
			e : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			url : /^(\w+:\/\/)?\w+(\.\w+)+.*$/
		},
		toString : Object.prototype.toString,
		getValue : function(m) {
			var l, k = this;
			if (m.is(":radio")) {
				l = k.find(":radio[name='" + m.attr("name") + "']:checked")
						.val();
				l = l === b ? "" : l
			} else {
				if (m.is(":checkbox")) {
					l = k.find(
							":checkbox[name='" + m.attr("name") + "']:checked")
							.val();
					l = l === b ? "" : l
				} else {
					l = m.val()
				}
			}
			return d.trim(l)
		},
		isEmpty : function(k) {
			return k === "" || k === d.trim(this.attr("tip"))
		},
		enhance : function() {
			var k = this;
			k.find("input[recheck]").each(
					function() {
						if (this.validform_inited == "inited") {
							return true
						}
						this.validform_inited = "inited";
						var m = d(this);
						var l = k.find("input[name='" + d(this).attr("recheck")
								+ "']");
						l.bind("keyup", function() {
							if (l.val() == m.val() && l.val() != "") {
								if (l.attr("tip")) {
									if (l.attr("tip") == l.val()) {
										return false
									}
								}
								m.trigger("blur")
							}
						}).bind("blur", function() {
							if (l.val() != m.val() && m.val() != "") {
								if (m.attr("tip")) {
									if (m.attr("tip") == m.val()) {
										return false
									}
								}
								m.trigger("blur")
							}
						})
					});
			k.find("[tip]").each(function() {
				if (this.validform_inited == "inited") {
					return true
				}
				this.validform_inited = "inited";
				var m = d(this).attr("tip");
				var l = d(this).attr("altercss");
				d(this).focus(function() {
					if (d(this).val() == m) {
						d(this).val("");
						if (l) {
							d(this).removeClass(l)
						}
					}
				}).blur(function() {
					if (d.trim(d(this).val()) === "") {
						d(this).val(m);
						if (l) {
							d(this).addClass(l)
						}
					}
				})
			});
			k.find(":checkbox[datatype],:radio[datatype]").each(
					function() {
						if (this.validform_inited == "inited") {
							return true
						}
						this.validform_inited = "inited";
						var m = d(this);
						var l = m.attr("name");
						k.find("[name='" + l + "']").filter(":checkbox,:radio")
								.bind("click", function() {
									setTimeout(function() {
										m.trigger("blur")
									}, 0)
								})
					})
		},
		usePlugin : function(s, l, q, o) {
			var v = this;
			if (s.swfupload && typeof (swfuploadhandler) != "undefined") {
				var p = v.find("input[plugin='swfupload']").val(""), k = {
					custom_settings : {
						form : v,
						showmsg : function(w, n) {
							a.util.showmsg.call(v, w, l, {
								obj : p,
								type : n,
								sweep : q
							})
						}
					}
				};
				k = d.extend(true, {}, s.swfupload, k);
				swfuploadhandler.init(k, o)
			}
			if (s.datepicker && d.fn.datePicker) {
				if (s.datepicker.format) {
					Date.format = s.datepicker.format;
					delete s.datepicker.format
				}
				if (s.datepicker.firstDayOfWeek) {
					Date.firstDayOfWeek = s.datepicker.firstDayOfWeek;
					delete s.datepicker.firstDayOfWeek
				}
				var r = v.find("input[plugin='datepicker']");
				s.datepicker.callback
						&& r.bind("dateSelected", function() {
							var n = new Date(d.event._dpCache[this._dpId]
									.getSelected()[0]).asString(Date.format);
							s.datepicker.callback(n, this)
						});
				r.datePicker(s.datepicker)
			}
			if (s.passwordstrength && d.fn.passwordStrength) {
				s.passwordstrength.showmsg = function(w, x, n) {
					a.util.showmsg.call(v, x, l, {
						obj : w,
						type : n,
						sweep : q
					}, "hide")
				};
				v.find("input[plugin*='passwordStrength']").passwordStrength(
						s.passwordstrength)
			}
			if (s.jqtransform && d.fn.jqTransSelect) {
				var m = function(n) {
					var w = d(".jqTransformSelectWrapper ul:visible");
					w.each(function() {
						var x = d(this).parents(
								".jqTransformSelectWrapper:first").find(
								"select").get(0);
						if (!(n && x.oLabel && x.oLabel.get(0) == n.get(0))) {
							d(this).hide()
						}
					})
				};
				var t = function(n) {
					if (d(n.target).parents(".jqTransformSelectWrapper").length === 0) {
						m(d(n.target))
					}
				};
				var u = function() {
					d(document).mousedown(t)
				};
				if (s.jqtransform.selector) {
					v.find(s.jqtransform.selector).filter(
							'input:submit, input:reset, input[type="button"]')
							.jqTransInputButton();
					v.find(s.jqtransform.selector).filter(
							"input:text, input:password").jqTransInputText();
					v.find(s.jqtransform.selector).filter("input:checkbox")
							.jqTransCheckBox();
					v.find(s.jqtransform.selector).filter("input:radio")
							.jqTransRadio();
					v.find(s.jqtransform.selector).filter("textarea")
							.jqTransTextarea();
					if (v.find(s.jqtransform.selector).filter("select").length > 0) {
						v.find(s.jqtransform.selector).filter("select")
								.jqTransSelect();
						u()
					}
				} else {
					v.jqTransform()
				}
				v.find(".jqTransformSelectWrapper").find("li a").click(
						function() {
							v.find("select").trigger("blur")
						})
			}
		},
		_regcheck : function(r, x, q, y) {
			var y = y, n = null, p = false, m = /\/.+\//g, w = 3;
			if (m.test(r)) {
				var A = r.match(m)[0].slice(1, -1);
				var o = r.replace(m, "");
				var t = RegExp(A, o);
				p = t.test(x);
				if (p == true) {
					p = true;
					w = 2;
					n = y.data("tipmsg").r || e.r
				} else {
					p = false;
					w = 3;
					n = q.attr("errormsg") || y.data("tipmsg").w || e.w
				}
				return {
					passed : p,
					type : w,
					info : n
				}
			}
			if (a.util.toString.call(a.util.dataType[r]) == "[object Function]") {
				p = a.util.dataType[r](x, q, y, a.util.dataType);
				if (p === true || p === b) {
					p = true;
					w = 2;
					n = y.data("tipmsg").r || e.r;
					if (q.attr("recheck")) {
						var l = y.find("input[name='" + q.attr("recheck")
								+ "']:first");
						if (x != l.val()) {
							p = false;
							w = 3;
							n = q.attr("errormsg") || y.data("tipmsg").w || e.w
						}
					}
				} else {
					n = p || q.attr("errormsg") || y.data("tipmsg").w || e.w;
					p = false;
					if (x === "") {
						return {
							passed : false,
							type : 3,
							info : q.attr("nullmsg") || y.data("tipmsg").s
									|| e.s
						}
					}
				}
				return {
					passed : p,
					type : w,
					info : n
				}
			}
			if (!(r in a.util.dataType)) {
				var u = r.match(a.util.dataType.match), z;
				if (!u) {
					return false
				}
				for ( var k in a.util.dataType) {
					z = k.match(a.util.dataType.match);
					if (!z) {
						continue
					}
					if (u[1] === z[1]) {
						var v = a.util.dataType[k].toString(), o = v
								.match(/\/[mgi]*/g)[1].replace("/", ""), s = new RegExp(
								"\\{" + z[2] + "," + z[3] + "\\}", "g");
						v = v.replace(/\/[mgi]*/g, "/").replace(s,
								"{" + u[2] + "," + u[3] + "}").replace(/^\//,
								"").replace(/\/$/, "");
						a.util.dataType[r] = new RegExp(v, o);
						break
					}
				}
			}
			if (a.util.toString.call(a.util.dataType[r]) == "[object RegExp]") {
				p = a.util.dataType[r].test(x);
				if (p) {
					w = 2;
					n = y.data("tipmsg").r || e.r;
					if (q.attr("recheck")) {
						var l = y.find("input[name='" + q.attr("recheck")
								+ "']:first");
						if (x != l.val()) {
							p = false;
							w = 3;
							n = q.attr("errormsg") || y.data("tipmsg").w || e.w
						}
					}
				} else {
					n = q.attr("errormsg") || y.data("tipmsg").w || e.w;
					if (x === "") {
						return {
							passed : false,
							type : 3,
							info : q.attr("nullmsg") || y.data("tipmsg").s
									|| e.s
						}
					}
				}
				return {
					passed : p,
					type : w,
					info : n
				}
			}
			return {
				passed : false,
				type : 3,
				info : y.data("tipmsg").w || e.w
			}
		},
		regcheck : function(n, s, m) {
			var t = this, k = null, l = false, r = 3;
			if (m.attr("ignore") === "ignore" && a.util.isEmpty.call(m, s)) {
				if (m.data("cked")) {
					k = ""
				}
				return {
					passed : true,
					type : 4,
					info : k
				}
			}
			m.data("cked", "cked");
			if (d.trim(m.attr("tip")) && s === d.trim(m.attr("tip"))) {
				return {
					passed : false,
					type : 3,
					info : m.attr("nullmsg") || t.data("tipmsg").s || e.s
				}
			}
			var u = a.util.parseDatatype(n);
			var q;
			for ( var p = 0; p < u.length; p++) {
				for ( var o = 0; o < u[p].length; o++) {
					q = a.util._regcheck(u[p][o], s, m, t);
					if (!q.passed) {
						break
					}
				}
				if (q.passed) {
					break
				}
			}
			return q
		},
		parseDatatype : function(r) {
			var q = /\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g, o = r.match(q), p = r
					.replace(q, "").replace(/\s*/g, "").split(""), l = [], k = 0;
			l[0] = [];
			l[0].push(o[0]);
			for ( var s = 0; s < p.length; s++) {
				if (p[s] == "|") {
					k++;
					l[k] = []
				}
				l[k].push(o[s + 1])
			}
			return l
		},
		showmsg : function(n, l, m, k) {
			if (n == b) {
				return false
			}
			d.extend(m, {
				curform : this
			});
			if (typeof l == "function") {
				if (!(m.sweep && k == "hide")) {
					l(n, m, a.util.cssctl)
				}
				return
			}
			if (l == 1 || k == "alwaysshow" && l != 4) {
				j.find(".Validform_info").html(n)
			}
			if (l == 1 && k != "hide" || k == "alwaysshow" && l != 4) {
				i = false;
				j.find(".iframe").css("height", j.outerHeight());
				j.show();
				h(j, 100)
			}
			if (l == 2 && m.obj) {
				m.obj.parent().next().find(".Validform_checktip").html(n);
				a.util.cssctl(
						m.obj.parent().next().find(".Validform_checktip"),
						m.type)
			}
			if ((l == 3 || l == 4) && m.obj) {
				m.obj.siblings(".Validform_checktip").html(n);
				a.util.cssctl(m.obj.siblings(".Validform_checktip"), m.type)
			}
		},
		cssctl : function(l, k) {
			switch (k) {
			case 1:
				l.removeClass("Validform_right Validform_wrong").addClass(
						"Validform_checktip Validform_loading");
				break;
			case 2:
				l.removeClass("Validform_wrong Validform_loading").addClass(
						"Validform_checktip Validform_right");
				break;
			case 4:
				l.removeClass(
						"Validform_right Validform_wrong Validform_loading")
						.addClass("Validform_checktip");
				break;
			default:
				l.removeClass("Validform_right Validform_loading").addClass(
						"Validform_checktip Validform_wrong")
			}
		},
		getQuery : function(k) {
			var l = k.indexOf("?");
			if (l != -1) {
				return k.substring(l + 1) + "&"
			} else {
				return ""
			}
		},
		check : function(u, p, t, m) {
			var s = u;
			var n = p.settings;
			var t = t || "";
			var k = a.util.getValue.call(s, d(this));
			if (k == this.validform_lastval && !d(this).attr("recheck")
					|| d(this).data("dataIgnore") === "dataIgnore") {
				return true
			}
			if (n.dragonfly && !d(this).data("cked")
					&& a.util.isEmpty.call(d(this), k)) {
				return false
			}
			this.validform_lastval = k;
			var r = true, q;
			g = q = d(this);
			r = a.util.regcheck.call(s, d(this).attr("datatype"), k, d(this));
			if (!r.passed) {
				a.util.abort.call(q[0]);
				if (!m) {
					q.addClass("Validform_error");
					a.util.showmsg.call(s, r.info, n.tiptype, {
						obj : d(this),
						type : r.type,
						sweep : n.tipSweep
					}, "hide")
				}
				return false
			} else {
				if (d(this).attr("ajaxurl") && !m
						&& d(this).attr("ignore") != "ignore") {
					var l = d(this);
					if (l[0].validform_valid === "posting"
							&& k == l[0].validform_ckvalue) {
						return "ajax"
					}
					l[0].validform_valid = "posting";
					l[0].validform_ckvalue = k;
					a.util.showmsg.call(s, p.tipmsg.c || e.c, n.tiptype, {
						obj : l,
						type : 1,
						sweep : n.tipSweep
					}, "hide");
					a.util.abort.call(q[0]);
					var o = l.attr("ajaxurl");
					q[0].validform_ajax = d.ajax({
						type : "POST",
						cache : false,
						url : o,
						data : a.util.getQuery.call(f, o) + "param=" + k
								+ "&name=" + d(this).attr("name"),
						dataType : "text",
						success : function(v) {
							if (d.trim(v) == "y") {
								l[0].validform_valid = "true";
								a.util.showmsg.call(s, p.tipmsg.r || e.r,
										n.tiptype, {
											obj : l,
											type : 2,
											sweep : n.tipSweep
										}, "hide");
								q.removeClass("Validform_error");
								g = null;
								if (t === "postform") {
									s.trigger("submit")
								}
							} else {
								l[0].validform_valid = v;
								q.addClass("Validform_error");
								a.util.showmsg.call(s, v, n.tiptype, {
									obj : l,
									type : 3,
									sweep : n.tipSweep
								})
							}
							q[0].validform_ajax = null
						},
						error : function(v) {
							if (v.statusText !== "abort") {
								q.addClass("Validform_error");
								a.util.showmsg.call(s, p.tipmsg.err || e.err,
										n.tiptype, {
											obj : l,
											type : 3,
											sweep : n.tipSweep
										})
							}
							l[0].validform_valid = p.tipmsg.err || e.err;
							q[0].validform_ajax = null
						}
					});
					return "ajax"
				} else {
					if (!m) {
						a.util.showmsg.call(s, r.info, n.tiptype, {
							obj : d(this),
							type : r.type,
							sweep : n.tipSweep
						}, "hide");
						q.removeClass("Validform_error")
					}
					g = null;
					return true
				}
			}
		},
		submitForm : function(m, k, o, q) {
			var s = this;
			if (s[0].validform_status === "posting") {
				return false
			}
			if (m.postonce && s[0].validform_status === "posted") {
				return false
			}
			var q = q === true ? false : true;
			var r = m.beforeCheck && m.beforeCheck(s);
			if (r === false) {
				return false
			}
			var p = true, l;
			s
					.find("[datatype]")
					.each(
							function() {
								if (k) {
									return false
								}
								if (m.ignoreHidden
										&& d(this).is(":hidden")
										|| d(this).data("dataIgnore") === "dataIgnore") {
									return true
								}
								var u = a.util.getValue.call(s, d(this)), v;
								g = v = d(this);
								l = a.util.regcheck.call(s, d(this).attr(
										"datatype"), u, d(this));
								if (!l.passed) {
									v.addClass("Validform_error");
									a.util.showmsg.call(s, l.info, m.tiptype, {
										obj : d(this),
										type : l.type,
										sweep : m.tipSweep
									});
									if (!m.showAllError) {
										v.focus();
										p = false;
										return false
									}
									p && (p = false);
									return true
								}
								if (d(this).attr("ajaxurl")
										&& d(this).attr("ignore") != "ignore") {
									if (this.validform_valid !== "true") {
										var t = d(this);
										v.addClass("Validform_error");
										a.util.showmsg.call(s,
												s.data("tipmsg").v || e.v,
												m.tiptype, {
													obj : t,
													type : 3,
													sweep : m.tipSweep
												});
										setTimeout(function() {
											t.trigger("blur", [ "postform" ])
										}, 1500);
										if (!m.showAllError) {
											p = false;
											return false
										}
										p && (p = false);
										return true
									}
								}
								a.util.showmsg.call(s, l.info, m.tiptype, {
									obj : d(this),
									type : l.type,
									sweep : m.tipSweep
								}, "hide");
								v.removeClass("Validform_error");
								g = null
							});
			if (m.showAllError) {
				s.find(".Validform_error:first").focus()
			}
			if (p) {
				var n = m.beforeSubmit && m.beforeSubmit(s);
				if (n === false) {
					return false
				}
				s[0].validform_status = "posting";
				if (m.ajaxPost || o === "ajaxPost") {
					a.util.showmsg.call(s, s.data("tipmsg").p || e.p,
							m.tiptype, {
								obj : s,
								type : 1,
								sweep : m.tipSweep
							}, "alwaysshow");
					s[0].validform_ajax = d
							.ajax({
								type : "POST",
								dataType : "json",
								async : q,
								url : s.attr("action"),
								data : s.serializeArray(),
								success : function(t) {
									if (t.status === "y") {
										s[0].validform_status = "posted";
										a.util.showmsg.call(s, t.info,
												m.tiptype, {
													obj : s,
													type : 2,
													sweep : m.tipSweep
												}, "alwaysshow")
									} else {
										s[0].validform_status = "normal";
										a.util.showmsg.call(s, t.info,
												m.tiptype, {
													obj : s,
													type : 3,
													sweep : m.tipSweep
												}, "alwaysshow")
									}
									m.callback && m.callback(t);
									s[0].validform_ajax = null
								},
								error : function(t) {
									var u = t.statusText === "abort" ? s
											.data("tipmsg").abort
											|| e.abort : s.data("tipmsg").err
											|| e.err;
									a.util.showmsg.call(s, u, m.tiptype, {
										obj : s,
										type : 3,
										sweep : m.tipSweep
									}, "alwaysshow");
									s[0].validform_status = "normal";
									s[0].validform_ajax = null
								}
							})
				} else {
					if (!m.postonce) {
						s[0].validform_status = "normal"
					}
					return m.callback && m.callback(s)
				}
			}
			return false
		},
		resetForm : function() {
			var k = this;
			k.each(function() {
				this.reset();
				this.validform_status = "normal"
			});
			k.find(".Validform_right").text("");
			k.find(".passwordStrength").children().removeClass("bgStrength");
			k.find(".Validform_checktip").removeClass(
					"Validform_wrong Validform_right Validform_loading");
			k.find(".Validform_error").removeClass("Validform_error");
			k.find("[datatype]").removeData("cked").removeData("dataIgnore");
			k.eq(0).find("input:first").focus()
		},
		abort : function() {
			if (this.validform_ajax) {
				this.validform_ajax.abort()
			}
		}
	};
	d.Datatype = a.util.dataType;
	a.prototype = {
		dataType : a.util.dataType,
		eq : function(l) {
			var k = this;
			if (l >= k.forms.length) {
				return null
			}
			if (!(l in k.objects)) {
				k.objects[l] = new a(d(k.forms[l]).get(), k.settings, true)
			}
			return k.objects[l]
		},
		resetStatus : function() {
			var k = this;
			d(k.forms).each(function() {
				this.validform_status = "normal"
			});
			return this
		},
		setStatus : function(k) {
			var l = this;
			d(l.forms).each(function() {
				this.validform_status = k || "posting"
			});
			return this
		},
		getStatus : function() {
			var l = this;
			var k = d(l.forms)[0].validform_status;
			return k
		},
		ignore : function(k) {
			var l = this;
			var k = k || "[datatype]";
			d(l.forms).find(k).each(
					function() {
						d(this).data("dataIgnore", "dataIgnore").removeClass(
								"Validform_error")
					});
			return this
		},
		unignore : function(k) {
			var l = this;
			var k = k || "[datatype]";
			d(l.forms).find(k).each(function() {
				d(this).removeData("dataIgnore")
			});
			return this
		},
		addRule : function(n) {
			var m = this;
			var n = n || [];
			for ( var l = 0; l < n.length; l++) {
				var p = d(m.forms).find(n[l].ele);
				for ( var k in n[l]) {
					k !== "ele" && p.attr(k, n[l][k])
				}
			}
			d(m.forms).each(function() {
				var o = d(this);
				a.util.enhance.call(o)
			});
			return this
		},
		ajaxPost : function(k, l) {
			var m = this;
			if (m.settings.tiptype == 1 || m.settings.tiptype == 2
					|| m.settings.tiptype == 3) {
				c()
			}
			a.util.submitForm.call(d(m.forms[0]), m.settings, k, "ajaxPost", l);
			return this
		},
		submitForm : function(k) {
			var m = this;
			var l = a.util.submitForm.call(d(m.forms[0]), m.settings, k);
			l === b && (l = true);
			if (l === true) {
				m.forms[0].submit()
			}
			return this
		},
		resetForm : function() {
			var k = this;
			a.util.resetForm.call(d(k.forms));
			return this
		},
		abort : function() {
			var k = this;
			d(k.forms).each(function() {
				a.util.abort.call(this)
			});
			return this
		},
		check : function(m, k) {
			var k = k || "[datatype]", o = this, n = d(o.forms), l = true;
			n.find(k).each(function() {
				a.util.check.call(this, n, o, "", m) || (l = false)
			});
			return l
		}
	};
	d.fn.Validform = function(k) {
		return new a(this, k)
	};
	function h(n, m) {
		var l = (d(window).width() - n.outerWidth()) / 2, k = (d(window)
				.height() - n.outerHeight()) / 2, k = (document.documentElement.scrollTop ? document.documentElement.scrollTop
				: document.body.scrollTop)
				+ (k > 0 ? k : 0);
		n.css({
			left : l
		}).animate({
			top : k
		}, {
			duration : m,
			queue : false
		})
	}
	function c() {
		if (d("#Validform_msg").length !== 0) {
			return false
		}
		j = d(
				'<div id="Validform_msg"><div class="Validform_title">'
						+ e.tit
						+ '<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>')
				.appendTo("body");
		j.find("a.Validform_close").click(function() {
			j.hide();
			i = true;
			if (g) {
				g.focus().addClass("Validform_error")
			}
			return false
		}).focus(function() {
			this.blur()
		});
		d(window).bind("scroll resize", function() {
			!i && h(j, 400)
		})
	}
	d.Showmsg = function(k) {
		c();
		a.util.showmsg.call(f, k, 1, {})
	};
	d.Hidemsg = function() {
		j.hide();
		i = true
	}
})(jQuery, window);