'use strict';

/** ********************************************** **
	@Ajax Portfolio
	@Last Update	Wensday, May 20, 2016
*************************************************** **/
jQuery(window).ready(function () {
    _serviceAjaxOpen()
});


/** Global Search Ajax Data **/
var rtc_content = '';

function getSearchAjaxData(scenario_id) {
    var _href = "/scenario/" + scenario_id;
	console.log(_href);
    return jQuery.ajax({
        url: _href,
        data: {
            ajax: "true",
            count: "1000"
        },
        type: 'POST',
        dataType: "json"
    });
}

/** Ajax Service Open **/
function _serviceAjaxOpen() {
    jQuery("a.portfolio-ajax-page").on("click", function (e) {
        e.preventDefault();

        var scenario_id = jQuery(this).closest('[data-unic]').data('unic');
		console.log(scenario_id);
        var rtc_id = jQuery(this).attr('data-href');
		console.log(rtc_id);

        if (!rtc_content) {
            getSearchAjaxData(scenario_id).done(function (response) {
                rtc_content = response.content;
                showServiceItem(rtc_content, rtc_id);
            });
            return;
        }
        showServiceItem(rtc_content, rtc_id);
    });
}

/** Show Services Content **/
function showServiceItem(citem, id) {
    if (!citem) return;

    var citem = citem.find(function (item) {
        return item.id === id;
    });
	console.log(citem);

    var content = `
        <div id="portfolio-ajax-page">
            <div class="portfolio-ajax-page">
                <header class="page-header">
                    <h2 class="portfolio-ajax-title">${citem.title1}</h2>
                    <ul class="list-inline">
                        <li>
                            <a class="portfolio-ajax-close glyphicon glyphicon-remove" href="#">
                                <!-- close -->
                            </a>
                        </li>
                    </ul>
                </header>
                <div class="row">
                    <div class="">
                        ${citem.text}
                    </div>
                </div>
            </div>
        </div>
	`;

	jQuery("#portfolio_ajax_container").slideUp(500);

	jQuery("#portfolio_ajax_container").html(content);

	jQuery("#portfolio_ajax_container").slideDown(500, function () {
		Init(true);
		_serviceAjaxClose();
	});
}

/** Ajax Services Close **/
function _serviceAjaxClose() {
    jQuery("a.portfolio-ajax-close").on("click", function (e) {
        e.preventDefault();

        jQuery("#portfolio_ajax_container").slideUp(500).empty();
        jQuery("a.portfolio-ajax-close").off();
    });
}