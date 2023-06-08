chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const site = "https://www.pinterest.com";
        const webhhook_url = "https://hook.us1.make.com/2xypxifgsckh8esutmct849d3u21so8q";
        if (request?.action === 'scrap') {
            console.log("here");
            var list = $(".vbI").children();
            var result = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var sub_top = $(item).children().children().children().children();
                var fir_data = $(sub_top).children()[0];
                var external_url = site + $(fir_data).find("a").attr("href");
                var image_link = $(fir_data).find("img").attr("src");
                var name;
                var vendor = "";
                if (i === 0) {
                    var vendor_div = $(fir_data).find("a");
                    var vendor_a_len = vendor_div.length;
                    var ven_div = $(vendor_div)[vendor_a_len - 1];
                    var vendors = $(ven_div).children()[0];
                    vendor = $(vendors).text();
                    var name_div = $(ven_div).parent().parent().children()[0];
                    name = $(name_div).text();
                } else {
                    var name_div = $(fir_data).find("a");
                    var name_len = name_div.length;
                    var name_d = name_div[name_len - 2];
                    name = $(name_d).text();
                }
                var myObject = {
                    name: name,
                    external_url: external_url,
                    image_link: image_link,
                    vendor: vendor
                };
                result.push(myObject);
            }
            const jsonResult = JSON.stringify(result);
            console.log(result);
            $.post(webhhook_url, { data: result }, function (res) {
                    console.log(res);
                }
            );
            setTimeout(() => {
                sendResponse({ data: result });
            }, 1000);
            return true;
        }
    }
);