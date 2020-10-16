var vol_slider = document.getElementById("volslider"), cur_vol = -1, standby_status = -1, timerFormInitiated = -1; function getNoUISliderValue(e, t) { e.noUiSlider.on("update", function () { var t = e.noUiSlider.get(); t = parseInt(t), $("#volumevalue").find("span.curvolume").text(t + "%"), -1 != cur_vol && $.ajax("web/vol?set=set" + t), cur_vol = t }) } function initJsTranslationAddon(e) { tstr_timer = e.timer, tstr_loading = e.loading, tstr_add_timer = e.add_timer, tstr_cancel = e.cancel, tstr_close = e.close, tstr_weekday = e.at_filter_weekday, tstr_weekend = e.at_filter_weekend, tstr_at_del = e.at_del, tstr_at_filter_title = e.at_filter_title, tstr_at_filter_short_desc = e.at_filter_short_desc, tstr_at_filter_desc = e.at_filter_desc, tstr_at_filter_day = e.at_filter_day, tstr_at_filter_include = e.at_filter_include, tstr_at_filter_exclude = e.at_filter_exclude, tstrings_no_cancel = e.no_cancel, tstrings_yes_delete = e.yes_delete, tstrings_yes = e.yes, tstrings_deleted = e.deleted, tstrings_cancelled = e.cancelled, tstrings_need_input = e.need_input, tstrings_install_package = e.install_package, tstrings_remove_package = e.remove_package, tstrings_update_package = e.update_package, tstrings_upload_package = e.upload_package, tstrings_upload_error = e.upload_error } function toggleFullRemote() { $("#symbolRemoteView").toggle(), $("#fullRemoteView").toggle() } function SetSpinner() { loadspinner = " \t<div class='page-loader-wrapper'> \t\t<div class='loader'> \t\t\t<div class='preloader'> \t\t\t\t<div class='spinner-layer pl-red'> \t\t\t\t\t<div class='circle-clipper left'> \t\t\t\t\t\t<div class='circle'></div> \t\t\t\t\t</div> \t\t\t\t\t<div class='circle-clipper right'> \t\t\t\t\t\t<div class='circle'></div> \t\t\t\t\t</div> \t\t\t\t</div> \t\t\t</div> \t\t\t<p>" + tstr_loading + "...</p> \t\t</div> \t</div>" } function listTimers() { $("#timerdlgcont").html(loadspinner).load("ajax/timers #timers") } function set_epg_modal_content(e) { $("#editTimerForm").load("ajax/edittimer"), $("#epgmodalcontent").html($(e).find("#epgcards").html()) } function open_epg_dialog(e, t) { $("#epgmodalcontent").html(loadspinner); var a = "ajax/epgdialog?sref=" + escape(e); $.get(a, set_epg_modal_content) } function load_channelsepg(e) { return $("#channel_epg_container").load(e), !1 } function load_subcontent(e) { return $("[id^=sub_content_container]").load(e), !1 } function loadtvcontent(e) { return $("[id^=tvcontent]").load(e), !1 } function load_maincontent(e) { return (lastcontenturl != e || e.indexOf("screenshot") > -1 || e.indexOf("boxinfo") > -1) && ($("#content_container").load(e), lastcontenturl = e), !1 } function load_maincontent_spin_force(e) { var t = '<div id="content_main">' + loadspinner + "</div>"; return $("#content_container").html(t).load(e), lastcontenturl = e, !1 } function testPipStatus() { $.ajax({ url: "api/pipinfo", dataType: "json", cache: !1, success: function (e) { e.pip != pip && (pip = e.pip, buttonsSwitcher(e.pip)) } }) } $(function () { noUiSlider.create(vol_slider, { start: [30], connect: "lower", step: 5, range: { min: [0], max: [100] } }), getNoUISliderValue(vol_slider, !0), timeredit_initialized || $("#editTimerForm").load("ajax/edittimer"), $("#navbar-collapse").on("show.bs.modal", function (e) { $("#navbar-collapse").removeAttr("style") }), $("#navbar-collapse").on("hide.bs.modal", function (e) { $("#navbar-collapse").addAttr("style", "width:100%") }), $("#TimerModal").on("show.bs.modal", function (e) { if (!$("#TimerModal").data("bs.modal").isShown) { 1 !== timerFormInitiated && initTimerEditForm(); var t = $(e.relatedTarget).attr("data-evid"), a = $(e.relatedTarget).attr("data-ref"), i = $(e.relatedTarget).attr("data-begin"), n = $(e.relatedTarget).attr("data-end"); "" !== a && void 0 !== a && "" !== t && void 0 !== t ? addEditTimerEvent(a, t) : "" !== a && void 0 !== a && "" !== i && void 0 !== i && "" !== n && void 0 !== n ? editTimer(a, i, n) : addTimer() } }), $("#TimerModal").on("hidden.bs.modal", function (e) { }), autosize($("textarea.auto-growth")), $.VTiTools.epgsearch.activate(), $.VTiTools.moviesearch.activate(), $(document).keydown(function (e) { (e.ctrlKey || e.cmdKey) && 70 === e.keyCode && (e.preventDefault(), $.VTiTools.epgsearch.showSearchBar()), (e.ctrlKey || e.cmdKey) && 69 === e.keyCode && (e.preventDefault(), $.VTiTools.epgsearch.showSearchBar()), (e.ctrlKey || e.cmdKey) && 77 === e.keyCode && (e.preventDefault(), $.VTiTools.moviesearch.showSearchBarMovie()) }), skinChanger(), activateNotificationAndTasksScroll(), setSkinListHeightAndScroll(!0), setSettingListHeightAndScroll(!0), $(window).resize(function () { setSkinListHeightAndScroll(!1), setSettingListHeightAndScroll(!1) }), initSkin(), VTiWebConfig() }); var SSHelperObj = function () { var e; return { setup: function () { e = this, clearInterval(e.screenshotInterval), e.ssr_i = parseInt(GetLSValue("ssr_i", "30")), $("#dropdown").click(function () { testPipStatus() }), $("#screenshotbutton0").click(function () { testPipStatus(), grabScreenshot("all") }), $("#screenshotbutton1").click(function () { testPipStatus(), grabScreenshot("video") }), $("#screenshotbutton2").click(function () { testPipStatus(), grabScreenshot("osd") }), $("#screenshotbutton3").click(function () { testPipStatus(), grabScreenshot("pip") }), $("#screenshotbutton4").click(function () { testPipStatus(), grabScreenshot("lcd") }), $("button").click(function () { testPipStatus() }), $("#ssr_i").val(e.ssr_i), $("#ssr_s").prop("checked", GetLSValue("ssr_s", !1)), $("#ssr_hd").prop("checked", GetLSValue("ssr_hd", !1)), $("#screenshotspinner").addClass(GetLSValue("spinner", "fa-spinner")), $("#ssr_hd").change(function () { testPipStatus(), SetLSValue("ssr_hd", $("#ssr_hd").is(":checked")), grabScreenshot("auto") }), $("#ssr_i").change(function () { testPipStatus(); var t = $("#ssr_i").val(); SetLSValue("ssr_i", t), e.ssr_i = parseInt(t), $("#ssr_s").is(":checked") && (clearInterval(e.screenshotInterval), e.setSInterval()) }), $("#ssr_s").change(function () { testPipStatus(); var t = $("#ssr_s").is(":checked"); t ? e.setSInterval() : clearInterval(e.screenshotInterval), SetLSValue("ssr_s", t) }), screenshotMode = "all", grabScreenshot(screenshotMode), GetLSValue("ssr_s", !1) && e.setSInterval() }, setSInterval: function () { e.screenshotInterval = setInterval(function () { testPipStatus(), grabScreenshot("auto") }, 1e3 * (e.ssr_i + 1)) } } }, SSHelper = new SSHelperObj; function load_reboot_dialog(e, t) { var a = loadspinner.replace("<p>" + tstr_loading + "...</p>", "<p>" + tstr_loading + "...</p><p>" + t + "</p>"); $("#responsivespinner").html(a) } function toggleLeftSideBar() { var e = $("body"), t = e.height(), a = $("#fullmaincontent"); $("body").hasClass("ls-closed-manual") ? (a.addClass("content"), a.removeClass("contentfull"), e.removeClass("ls-closed-manual"), $("#epgcard").height($("#leftsidemenu").height() - 30 + "px"), $("#topmenuheader,#mainfooter").show(), $("#togglefullscreen").html("fullscreen"), setTimeout(function () { load_tvcontent("ajax/multiepg?epgmode=tv") }, 500)) : (e.addClass("ls-closed-manual"), a.removeClass("content"), a.addClass("contentfull"), $("#epgcard").height(t + "px"), $("#topmenuheader,#mainfooter").hide(), $("#togglefullscreen").html("fullscreen_exit"), setTimeout(function () { load_tvcontent("ajax/multiepg?epgmode=tv") }, 500)) } function grabScreenshot(e) { $("#screenshotimage").load(function () { $("#responsivespinnerscreenshot").hide() }), "auto" != e ? screenshotMode = e : e = screenshotMode, timestamp = (new Date).getTime(), $("#ssr_hd").is(":checked") ? $("#screenshotimage").attr("src", "/grab?format=jpg&mode=" + e + "&t=" + timestamp) : $("#screenshotimage").attr("src", "/grab?format=jpg&r=720&mode=" + e + "&t=" + timestamp), $("#screenshotimage").attr("style", "max-height:60vh;"), "lcd" == e ? $("#screenshotimage").attr("class", "img-responsive center-block") : $("#screenshotimage").attr("class", "img-responsive img-rounded center-block") } function getStatusInfo() { $.ajax({ url: "/api/statusinfo", dataType: "json", cache: !1, success: function (e) { -1 === cur_vol ? vol_slider.noUiSlider.set(e.volume) : cur_vol != e.volume && (cur_vol = -1, vol_slider.noUiSlider.set(e.volume)); var t = ""; 1 == e.muted ? (mutestatus = 1, t = "<a href='#' onClick='toggleMute(); return false;'><i class='material-icons'>volume_off</i></a>") : (mutestatus = 0, t = "<a href='#'  onClick='toggleMute(); return false;'><i class='material-icons'>volume_up</i></a>"), $("#responsive_mute_status").html(t), setOSD(e); var a = "", i = ""; if ("true" == e.isRecording) { var n = e.Recording_list.split("\n"), r = 0, s = ""; for (var o in n) "" != n[o] && (r += 1, s += "<li> <a href='#' data-dismiss='modal' onClick='load_maincontent(\"ajax/timers\"); return false;'>" + n[o] + "</a></li><hr />"); $("#recmodalcontent").html(s), a = "<a href='javascript:void(0);' class='dropdown-toggle' data-toggle='modal' data-target='#RecModal' role='button'><i class='material-icons'>videocam</i><span class='label-count'>" + r + "</span></a>" } if ("true" == e.isStreaming) { var c = e.Streaming_list.split("\n"), l = 0; s = ""; for (var d in c) "" != c[d] && (l += 1, s += "<li>" + c[d] + "</li><hr/>"); $("#streammodalcontent").html(s), i = "<a href='javascript:void(0);' data-toggle='modal' data-target='#StreamModal' class='dropdown-toggle' role='button'><i class='material-icons'>wifi_tethering</i><span class='label-count'>" + l + "</span></a>" } var m = "power_settings_new"; "true" == e.inStandby ? (m = "lightbulb_outline", 0 !== standby_status && -1 !== standby_status || $(".osd-toggle").hide(), standby_status = 1) : (1 !== standby_status && -1 !== standby_status || $(".osd-toggle").show(), standby_status = 0); var u = " \t\t\t<a href='#' onClick='toggleStandby();return false'> \t\t\t\t<i class='material-icons'>" + m + "</i> \t\t\t</a>"; $("#osd_power_status").html(u), $("#responsive_rec_info").html(a), $("#responsive_stream_info").html(i) } }) } function setOSD(e) { var t = current_ref = e.currservice_serviceref, a = current_name = e.currservice_station, i = tstr_stream + ": " + a + "'><i class='material-icons'>tv</i></a>", n = tstr_stream + " (" + tstr_transcoded + "): " + a + "'><i class='material-icons'>phone_android</i></a>", r = e.currservice_begin + " - " + e.currservice_end, s = "", o = "", c = "", l = ""; a && (-1 !== t.indexOf("1:0:1") || -1 !== t.indexOf("1:134:1") || -1 !== t.indexOf("1:0:2") || -1 !== t.indexOf("1:134:2") ? (!e.transcoding || -1 === t.indexOf("1:0:1") && -1 === t.indexOf("1:134:1") || (s = "<a href='#' onclick=\"jumper8002('" + t + "', '" + a + "')\"; title='" + n), -1 !== t.indexOf("1:0:2") || -1 !== t.indexOf("1:134:2") ? (i = tstr_stream + ": " + a + "'><i class='material-icons'>radio</i></a>", c = "<a href='#' onClick='load_maincontent(\"ajax/radio\");return false;'><b>" + a + "&nbsp;&nbsp;</b>" + r + "</a>") : (i = tstr_stream + ": " + a + "'><i class='material-icons'>tv</i></a>", c = "<a href='#' onClick='load_maincontent(\"ajax/tv\");return false;'><b>" + a + "&nbsp;&nbsp;</b>" + r + "</a>"), o = "<a target='_blank' href='/web/stream.m3u?ref=" + t + "&name=" + a + "' title='" + i, l = '<a href="#" onclick="open_epg_dialog(\'' + t + "', '" + a + '\')" data-toggle="modal" data-target="#EPGModal" title=\'' + e.currservice_fulldescription + "'><b>" + e.currservice_name + "</b></a>") : -1 === t.indexOf("4097:0:0") && -1 === t.indexOf("1:0:0") || ("" === e.currservice_filename ? o = "<a href='#' title='" + (i = tstr_stream + ": " + a + "'>" + a + "</a>") : (i = tstr_stream + ": " + a + "'><i class='material-icons'>movie</i></a>", o = "<a target='_blank' href='/web/ts.m3u?file=" + e.currservice_filename + "' title='" + i, c = "<a href='#' onClick='load_maincontent(\"ajax/movies\");return false;'><b>" + a + "&nbsp;&nbsp;</b></a>", e.transcoding && (s = "<a href='#' onclick=\"jumper8003('" + e.currservice_filename + "')\"; title='" + n)))), $("#responsive_osd_transcoding").html(s), $("#responsive_osd_stream").html(o), $("#responsive_osd_current").html(c), $("#responsive_osd_cur_event").html(l); try { $(".channel-list__channel").removeClass("channel--active"), $("#sref-" + t.replace(/:/g, "_")).addClass("channel--active") } catch (e) { } } function loadeventepg(e, t, a) { void 0 !== a ? channelpicon = a : delete channelpicon; var i = "ajax/event?idev=" + e + "&sRef=" + escape(t); $("#eventdescriptionII").load(i) } function loadtimeredit(e, t) { var a = "ajax/event?idev=" + e + "&sRef=" + escape(t); $("#eventdescriptionII").load(a) } function initTimerEdit(e, t) { initTimerBQ(e, function () { for (var e in $("#dirname").find("option").remove().end(), $("#dirname").append($("<option></option>").attr("value", "None").text("Default")), _locations) { var a = _locations[e]; $("#dirname").append($("<option></option>").attr("value", a).text(a)) } for (var e in $("#dirname").selectpicker("refresh"), $("#tagsnew").html(""), _tags) { var i = _tags[e]; $("#tagsnew").append("<input type='checkbox' name='" + i + "' value='" + i + "' id='tag_" + i + "'/><label for='tag_" + i + "'>" + i + "</label>") } $("#tagsnew > input").checkboxradio({ icon: !1 }), timeredit_initialized = !0, t() }) } function initTimerEditBegin() { $("#timerbegin").datetimepicker({ format: "dd.mm.yy hh:ii", autoclose: !0, todayHighlight: !0, todayBtn: "linked", minuteStep: 2, language: "de" }), $("#timerbegin").datetimepicker().on("changeDate", function (e, t) { "" != $("#timerend").val() && $(this).datetimepicker("getDate") > $("#timerend").datetimepicker("getDate") && showErrorMain(tstr_start_after_end) }) } function TimerConflict(e, t, a, i) { var n = ""; e.forEach(function (e) { n += "<div class='row clearfix'><div class='col-xs-12'> \t\t\t<div class='card'> \t\t\t\t<div class='header'> \t\t\t\t\t<div class='row clearfix'> \t\t\t\t\t\t<div class='col-xs-12 col-sm-6'> \t\t\t\t\t\t\t<h2><i class='material-icons material-icons-centered'>alarm</i>" + e.name + "</h2> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t</div> \t\t\t\t<div class='body'> \t\t\t\t\t\t<div class='row clearfix'> \t\t\t\t\t\t\t<div class='col-xs-12'> \t\t\t\t\t\t\t\t<p>" + e.servicename + "</p> \t\t\t\t\t\t\t\t<p>" + e.realbegin + " - " + e.realend + "</p> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t</div> \t\t\t</div> \t\t</div></div> \t\t" }), $(".modal").modal("hide"), $("#timerconflictmodal").html(n), $("#TimerConflictModal").modal("show") } function cbAddTimerEvent(e) { e.state && ($(".event[data-id=" + e.eventId + '][data-ref="' + e.sRef + '"] .timer').remove(), $(".event[data-id=" + e.eventId + '][data-ref="' + e.sRef + '"] div:first').append('<div class="timer">' + tstr_timer + "</div>"), showErrorMain(tstr_timer_added, !0)) } function addTimerEvent(e, t, a, i) { var n = "/api/timeraddbyeventid?sRef=" + e + "&eventid=" + t; a && (n += "&eit=0&disabled=0&justplay=1&afterevent=3"), webapi_execute_result(n, function (n, r, s) { !n && s ? TimerConflict(s, e, t, a) : void 0 !== i ? i({ sRef: e, eventId: t, justplay: a, state: n, txt: r }) : showErrorMain(n ? tstr_timer_added : r, !0) }) } function addTimer(e, t, a, i) { current_serviceref = "", current_begin = -1, current_end = -1, servicename = ""; var n = -1, r = -1, s = "", o = "", c = "", l = 0, d = 0; void 0 !== e && "" != e && (n = e.begin, r = e.begin + e.duration, s = e.sref, servicename = e.channel, o = e.title, c = e.shortdesc, l = e.recording_margin_before, d = e.recording_margin_after); var m = $("#bouquet_select > optgroup").length, u = !1; void 0 !== t && (u = "1:0:2:" == t.substring(0, 6)), $("#cbtv").prop("checked", !u), $("#cbradio").prop("checked", u); var h = function () { void 0 !== t && void 0 !== a && (s = t, o = a, "undefined" === $("#bouquet_select").val(t) && $("#bouquet_select").append($("<option></option>").attr("value", s).text(a))), $("#timername").val(o), $("#description").val(c), $("#dirname").val("None"), $("#enabled").prop("checked", !0), $("#allow_duplicate").prop("checked", !0), $("#autoadjust").prop("checked", !1), $("#justplay").prop("checked", !1), $("#afterevent").val(3); for (var e = 0; e < 7; e++)$("#day" + e).prop("checked", !1); $("#tagsnew > input").prop("checked", !1).checkboxradio("refresh"); var i = -1 !== n ? new Date(1e3 * (Math.round(n) - 60 * l)) : new Date; $("#timerbegin").datetimepicker("setDate", i); var m = -1 !== r ? new Date(1e3 * (Math.round(r) + 60 * d)) : new Date(i.getTime() + 36e5); $("#timerend").datetimepicker("setDate", m), $("#bouquet_select").val(s), $("#bouquet_select").trigger("chosen:updated"), setTimerEditFormTitle(tstr_add_timer) }; if (!timeredit_initialized || m < 2) initTimerEdit(u, h); else { var p = $("#bouquet_select option:last").val(); u && "1:0:2:" !== p.substring(0, 6) ? initTimerEdit(u, h) : u || "1:0:2:" != p.substring(0, 6) ? h() : initTimerEdit(u, h) } } function editTimer(e, t, a) { e = decodeURI(e), current_serviceref = e, current_begin = t, current_end = a; var i = !1; void 0 !== e && (i = "1:0:2:" == e.substring(0, 6)), $("#cbtv").prop("checked", !i), $("#cbradio").prop("checked", i); var n = function () { timeredit_begindestroy && (initTimerEditBegin(), timeredit_begindestroy = !1), $.ajax({ url: "/api/timerlist", dataType: "json", success: function (i) { if (i.result) for (var n in i.timers) if (timer = i.timers[n], timer.serviceref == e && Math.round(timer.begin) == Math.round(t) && Math.round(timer.end) == Math.round(a)) { $("#timername").val(timer.name), $("#description").val(timer.description), $("#bouquet_select").val(timer.serviceref), $("#bouquet_select").trigger("chosen:updated"), timer.serviceref !== $("#bouquet_select").val() && ($("#bouquet_select").append($("<option></option>").attr("value", timer.serviceref).text(timer.servicename)), $("#bouquet_select").val(timer.serviceref)), $("#dirname").val(timer.dirname), timer.dirname !== $("#dirname").val() && (current_location = "<option value='" + timer.dirname + "'>" + timer.dirname + "</option>", $("#dirname").append(current_location), $("#dirname").val(timer.dirname)), $("#enabled").prop("checked", 0 == timer.disabled), $("#allow_duplicate").prop("checked", timer.allow_duplicate), $("#autoadjust").prop("checked", timer.autoadjust), $("#justplay").prop("checked", timer.justplay), $("#afterevent").val(timer.afterevent); for (var r = timer.repeated, s = 0; s < 7; s++)$("#day" + s).prop("checked", 1 == (1 & r)), r >>= 1; $("#tagsnew > input").prop("checked", !1); for (var o = timer.tags.split(" "), c = 0; c < o.length; c++) { var l = o[c].replace(/\(/g, "_").replace(/\)/g, "_").replace(/\'/g, "_"); l.length > 0 && ($("#tag_" + l).length ? $("#tag_" + l).prop("checked", !0).checkboxradio("refresh") : $("#tagsnew").append("<input type='checkbox' checked='checked' name='" + l + "' value='" + l + "' id='tag_" + l + "'/><label for='tag_" + l + "'>" + l + "</label>")) } $("#tagsnew > input").checkboxradio({ icon: !1 }), $("#timerbegin").datetimepicker("setDate", new Date(1e3 * Math.round(timer.begin))), $("#timerend").datetimepicker("setDate", new Date(1e3 * Math.round(timer.end))); var d = 2 === timer.state; d ? ($("#timerbegin").datetimepicker("destroy"), timeredit_begindestroy = !0, $("#timerbegin").addClass("ui-state-disabled"), $("#timername").addClass("ui-state-disabled"), $("#dirname option").not(":selected").attr("disabled", "disabled"), $("#bouquet_select option").not(":selected").attr("disabled", "disabled")) : ($("#timername").removeClass("ui-state-disabled"), $("#timerbegin").removeClass("ui-state-disabled"), $("#dirname option").removeAttr("disabled"), $("#bouquet_select option").removeAttr("disabled")), $("#timerbegin").prop("readonly", d), $("#timername").prop("readonly", d), void 0 !== timer.vpsplugin_enabled && (timer.vpsplugin_enabled, 0) ? (console.debug(timer.vpsplugin_enabled), $("#vpsplugin_enabled").prop("checked", timer.vpsplugin_enabled), $("#vpsplugin_safemode").prop("checked", !timer.vpsplugin_overwrite), $("#has_vpsplugin1").show(), checkVPS()) : $("#has_vpsplugin1").hide(), void 0 !== timer.always_zap ? ($("#always_zap1").show(), $("#always_zap").prop("checked", 1 == timer.always_zap), $("#justplay").prop("disabled", 1 == timer.always_zap)) : $("#always_zap1").hide(), setTimerEditFormTitle(tstr_edit_timer + " - " + timer.name); break } } }) }; if (timeredit_initialized) { var r = $("#bouquet_select option:last").val(); i && "1:0:2:" !== r.substring(0, 6) ? initTimerEdit(i, n) : i || "1:0:2:" != r.substring(0, 6) ? n() : initTimerEdit(i, n) } else initTimerEdit(i, n) } function changeMoviesort(e) { MLHelper.SortMovies(e), MLHelper.ChangeSort(e), MLHelper.ReadMovies(), lastcontenturl = "", load_maincontent_spin("ajax/movies") } function changeMoviesortSearch(e) { MLHelper.SortMovies(e), MLHelper.ChangeSort(e), MLHelper.ReadMovies(), load_maincontent_spin_force(lastcontenturl) } function initTimerEditForm() { 1 !== timerFormInitiated && (timerFormInitiated = 1, addTimer(), element = document.getElementById("editTimerForm"), $("#timereditmodal").html(element)) } function setTimerEditFormTitle(e) { $("#timerEditTitle").html(e) } function toggleMute() { $.ajax("web/vol?set=mute"), getStatusInfo() } function CallEPGResponsive(e) { load_tvcontent_spin(e) } function CallEPG() { $("#myepgbtn2").click(function () { $("#tvcontent").load("ajax/multiepg?epgmode=radio") }), $("#myepgbtn3").click(function () { $("#tvcontent").load("ajax/multiepg?epgmode=tv") }), $("#tvbutton").buttonset(), $("#tvcontent").load("ajax/multiepg?epgmode=tv") } function myEPGSearch() { var e = $("#epgSearchTVRadio").val(), t = $("#myepgbtn0").is(":checked") ? "&full=1" : "", a = $("#myepgbtn1").is(":checked") ? "&bouquetsonly=1" : "", i = "ajax/epgdialog?sstr=" + encodeURIComponent(e) + t + a, n = $(window).width() - 100, r = $(window).height() - 100, s = {}; s[tstr_close] = function () { $(this).dialog("close") }, s[tstr_open_in_new_window] = function () { $(this).dialog("close"), open_epg_search_pop(e, t) }, load_dm_spinner(i, tstr_epgsearch, n, r, s) } $.VTiTools = {}; var $searchBar = $(".search-bar-epg"), $searchBarMovie = $(".search-bar-movie"); function gotEPGSearch() { var e = $("#epgsearchtext").val(), t = $("#myepgbtn0").is(":checked") ? "&full=1" : "", a = $("#myepgbtn1").is(":checked") ? "&bouquetsonly=1" : "", i = "ajax/epgdialog?sstr=" + encodeURIComponent(e) + t + a; $("#epgSearch").val(""), load_maincontent(i), lastcontenturl = "" } function gotMovieSearch() { var e = $("#moviesearchtext").val(), t = $("#mymoviesearchbtn0").is(":checked") ? "&short=1" : "", a = $("#mymoviesearchbtn1").is(":checked") ? "&extended=1" : "", i = "ajax/moviesearch?find=" + encodeURIComponent(e) + t + a; $("#epgSearch").val(""), load_maincontent_spin_force(i) } function closeMessageModal() { $("#messageSentResponse").html("") } function sendModalMessage() { var e = $("#messageText").val(), t = $("#messageType").val(), a = $("#messageTimeout").val(); $.ajax({ url: "/api/message?text=" + e + "&type=" + t + "&timeout=" + a, dataType: "json", cache: !1, success: function (e) { $("#messageSentResponse").html('<div class="alert alert-info">' + e.message + "</div>"), 0 == t && (MessageAnswerCounter = a, setTimeout(countdowngetMessage, 1e3)) } }), $("#messageText").val(""), $("#messageType").val(1), $("#messageType").selectpicker("refresh"), $("#messageTimeout").val("30"), $("#messageTimeout").removeClass("active"), $("#messageText").addClass("active") } function btn_saveTimer() { var e = moment($("#timerend").val(), "DD.MM.YYYY hh:mm").unix(), t = 0; $('[name="repeated"]:checked').each(function () { t += parseInt($(this).val()) }); var a = ""; $('[name="tagsnew"]:checked').each(function () { "" != a && (a += " "), a += $(this).val() }); var i = { sRef: $("#bouquet_select").val(), end: e, name: $("#timername").val(), description: $("#description").val(), disabled: $("#enabled").is(":checked") ? "0" : "1", allow_duplicate: $("#allow_duplicate").is(":checked") ? "1" : "0", autoadjust: $("#autoadjust").is(":checked") ? "1" : "0", afterevent: $("#afterevent").val(), tags: a, repeated: t }; if ($("#always_zap").is(":checked") ? (i.always_zap = "1", i.justplay = "0") : i.justplay = $("#justplay").is(":checked") ? "1" : "0", "None" != $("#dirname").val() && (i.dirname = $("#dirname").val()), $("#has_vpsplugin1").is(":hidden") || (i.vpsplugin_enabled = $("#vpsplugin_enabled").is(":checked") ? "1" : "0", i.vpsplugin_overwrite = $("#vpsplugin_safemode").is(":checked") ? "0" : "1"), timeredit_begindestroy) i.begin = Math.round(current_begin); else { var n = moment($("#timerbegin").val(), "DD.MM.YYYY hh:mm").unix(); i.begin = n } var r = !1; "" == current_serviceref ? $.ajax({ async: !1, dataType: "json", cache: !1, url: "/api/timeradd?", data: i, success: function (e) { if (e.result) r = !0; else if (e.conflicts) { var t = "Timer Conflicts:<br>"; e.conflicts.forEach(function (e) { t += e.name + " / " + e.servicename + " / " + e.realbegin + " - " + e.realend + "<br>" }), showErrorMain(t) } else showErrorMain(e.message) } }) : (i.channelOld = current_serviceref, i.beginOld = Math.round(current_begin), i.endOld = Math.round(current_end), $.ajax({ async: !1, dataType: "json", cache: !1, url: "api/timerchange?", data: i, success: function (e) { if (e.result) r = !0; else if (e.conflicts) { var t = "Timer Conflicts:<br>"; e.conflicts.forEach(function (e) { t += e.name + " / " + e.servicename + " / " + e.realbegin + " - " + e.realend + "<br>" }), $("#error").text(t) } else $("#error").text(e.message) } })), r && reloadTimers && lastcontenturl.startsWith("ajax/timers") && (lastcontenturl = "", setTimeout(function () { load_maincontent("ajax/timers") }, 500)) } function skinChanger() { $(".right-sidebar .demo-choose-skin li").on("click", function () { var e = $("body"), t = $(this); $.data(e, "skincolor"); $(".right-sidebar .demo-choose-skin li.active").data("theme"), $(".right-sidebar .demo-choose-skin li").removeClass("active"), e.removeClass(function (e, t) { return (t.match(/(^|\s)theme-\S+/g) || []).join(" ") }), t.addClass("active"), console.log(t.data("theme")), $.data(e, "skincolor", t.data("theme"), t.data("theme")), e.addClass("theme-" + $.data(e, "skincolor")), $(".progress-bar, #moviedirbtn, .atbtn, .responsivebtn, .vti-colored-card").removeClass(function (e, t) { return (t.match(/(^|\s)bg-\S+/g) || []).join(" ") }), $(".progress-bar, #moviedirbtn, .atbtn, .responsivebtn, .vti-colored-card").addClass("bg-" + t.data("theme")), $(".lever").removeClass(function (e, t) { return (t.match(/(^|\s)switch-col-\S+/g) || []).join(" ") }), $(".lever").addClass("switch-col-" + t.data("theme")), $(".radio-vti").removeClass(function (e, t) { return (t.match(/(^|\s)radio-col-\S+/g) || []).join(" ") }), $(".radio-vti").addClass("radio-col-" + t.data("theme")), $(".theme-link-color").removeClass(function (e, t) { return (t.match(/(^|\s)theme-link-col-\S+/g) || []).join(" ") }), $(".theme-link-color").addClass("theme-link-col-" + t.data("theme")), $(".nav-tabs").removeClass(function (e, t) { return (t.match(/(^|\s)tab-col-\S+/g) || []).join(" ") }), $(".nav-tabs").addClass("tab-col-" + t.data("theme")), $(".navtab-active").css("border-bottom", "2px solid " + t.data("theme")), $(":checkbox").removeClass(function (e, t) { return (t.match(/(^|\s)chk-col-\S+/g) || []).join(" ") }), $(":checkbox").addClass("chk-col-" + t.data("theme")), $.get("api/setskincolor?skincolor=" + t.data("theme")), $("a").addClass("link-col-black") }) } function VTiWebConfig() { $("#mymoviesearchbtn0").change(function () { var e = $("#mymoviesearchbtn0").is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?moviesearchshort=" + e) }), $("#mymoviesearchbtn1").change(function () { var e = $("#mymoviesearchbtn1").is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?moviesearchextended=" + e) }), $("#myepgbtn0").change(function () { var e = $("#myepgbtn0").is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?fullsearch=" + e) }), $("#myepgbtn1").change(function () { var e = $("#myepgbtn1").is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?bqonly=" + e) }), $("#remotegrabscreen1").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?rcugrabscreen=" + e) }), $("#remotecontrolview").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?remotecontrolview=" + e), toggleFullRemote() }), $("#minmovielist").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?minmovielist=" + e), lastcontenturl.startsWith("ajax/movies") && load_maincontent_spin_force(lastcontenturl) }), $("#mintimerlist").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?mintimerlist=" + e), "ajax/timers" === lastcontenturl && (lastcontenturl = "", load_maincontent("ajax/timers")) }), $("#minepglist").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?minepglist=" + e) }), $("#showpicons").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?showpicons=" + e), $("#showpiconbackground").prop("disabled", !e) }), $("#showpiconbackground").change(function () { var e = $(this).is(":checked") ? "1" : "0"; $.get("api/setvtiwebconfig?showpiconbackground=" + e) }), $("#thememodebtn").change(function () { var e = $(this).is(":checked") ? $(this).val() : "supabright"; $("body").removeClass(function (e, t) { return (t.match(/(^|\s)themed--\S+/g) || []).join(" ") }), $(this).is(":checked") ? $("body").addClass("themed--" + e) : $("body").addClass("themed--supabright"), $.get("api/setthememode?themeMode=" + e) }) } function setSkinListHeightAndScroll(e) { var t = $(window).height() - ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight()), a = $(".demo-choose-skin"); e || (a.slimScroll({ destroy: !0 }).height("auto"), a.parent().find(".slimScrollBar, .slimScrollRail").remove()), a.slimscroll({ height: t + "px", color: "rgba(0,0,0,0.5)", size: "6px", alwaysVisible: !1, borderRadius: "0", railBorderRadius: "0" }) } function initSkin() { } function setSettingListHeightAndScroll(e) { var t = $(window).height() - ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight()), a = $(".right-sidebar .demo-settings"); e || (a.slimScroll({ destroy: !0 }).height("auto"), a.parent().find(".slimScrollBar, .slimScrollRail").remove()), a.slimscroll({ height: t + "px", color: "rgba(0,0,0,0.5)", size: "6px", alwaysVisible: !1, borderRadius: "0", railBorderRadius: "0" }) } function activateNotificationAndTasksScroll() { $(".navbar-right .dropdown-menu .body .menu").slimscroll({ height: "254px", color: "rgba(0,0,0,0.5)", size: "4px", alwaysVisible: !1, borderRadius: "0", railBorderRadius: "0" }) } function showErrorMain(e, t) { var a = "error"; !0 !== (t = void 0 !== t ? t : "False") && "True" !== t && "true" !== t || (a = "success"), "" !== e ? swal("", e, a) : $("#statuscont").hide() } function deleteTimer(e, t, a, i) { var n = decodeURIComponent(i); swal({ title: tstr_del_timer, text: n, type: "warning", showCancelButton: !0, confirmButtonColor: "#DD6B55", confirmButtonText: tstrings_yes_delete + " !", cancelButtonText: tstrings_no_cancel + " !", closeOnConfirm: !1, closeOnCancel: !1 }, function (i) { i ? (webapi_execute("/api/timerdelete?sRef=" + e + "&begin=" + t + "&end=" + a, function () { $("#" + t + "-" + a).remove() }), swal(tstrings_deleted, n, "success")) : swal(tstrings_cancelled, n, "error") }) } function deleteMovie(e, t, a) { swal({ title: tstr_del_recording, text: a, type: "warning", showCancelButton: !0, confirmButtonColor: "#DD6B55", confirmButtonText: tstrings_yes_delete + " !", cancelButtonText: tstrings_no_cancel + " !", closeOnConfirm: !1, closeOnCancel: !1 }, function (i) { i ? webapi_execute_movie("/api/moviedelete?sRef=" + e, function (e) { e && (swal(tstrings_deleted, a, "success"), $("#" + t).remove()) }) : swal(tstrings_cancelled, a, "error") }) } function renameMovie(e, t) { swal({ title: tstr_ren_recording, text: t, type: "input", showCancelButton: !0, closeOnConfirm: !1, animation: "slide-from-top", inputPlaceholder: t, inputValue: t, input: "text" }, function (a) { return !1 !== a && a !== t && ("" === a ? (swal.showInputError(tstrings_need_input), !1) : (webapi_execute_movie("/api/movierename?sRef=" + e + "&newname=" + a), void showErrorMain(a, !0))) }) } function closeSideBar() { var e = $("body"); if (e.width() < $.AdminBSB.options.leftSideBar.breakpointWidth) { var t = $(".navbar .navbar-header .bars"); e.addClass("ls-closed"), t.fadeIn() } else e.removeClass("ls-closed") } $.VTiTools.epgsearch = { activate: function () { var e = this; $(".js-search-epg").on("click", function () { e.showSearchBar() }), $searchBar.find(".close-search").on("click", function () { e.hideSearchBar() }), $searchBar.find(".start-search").on("click", function () { e.startSearch() }), $searchBar.find('input[type="text"]').on("keyup", function (t) { 27 == t.keyCode ? e.hideSearchBar() : 13 == t.keyCode && e.startSearch() }) }, showSearchBar: function () { $.VTiTools.moviesearch.hideSearchBarMovie(), $searchBar.addClass("open"), $searchBar.find('input[type="text"]').focus() }, hideSearchBar: function () { $searchBar.removeClass("open"), $searchBar.find('input[type="text"]').val("") }, startSearch: function () { $("body").hasClass("ls-closed-manual") && toggleLeftSideBar(), gotEPGSearch(), this.hideSearchBar() } }, $.VTiTools.moviesearch = { activate: function () { var e = this; $(".js-search-movie").on("click", function () { console.debug("xlkj"), e.showSearchBarMovie() }), $searchBarMovie.find(".close-search").on("click", function () { e.hideSearchBarMovie() }), $searchBarMovie.find(".start-search").on("click", function () { e.startSearchMovie() }), $searchBarMovie.find('input[type="text"]').on("keyup", function (t) { 27 == t.keyCode ? e.hideSearchBarMovie() : 13 == t.keyCode && e.startSearchMovie() }) }, showSearchBarMovie: function () { $.VTiTools.epgsearch.hideSearchBar(), $searchBarMovie.addClass("open"), $searchBarMovie.find('input[type="text"]').focus() }, hideSearchBarMovie: function () { $searchBarMovie.removeClass("open"), $searchBarMovie.find('input[type="text"]').val("") }, startSearchMovie: function () { $("body").hasClass("ls-closed-manual") && toggleLeftSideBar(), gotMovieSearch(), this.hideSearchBarMovie() } };