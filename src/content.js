chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const site = "https://www.pinterest.com";
        const webhhook_url = "https://hook.us1.make.com/2xypxifgsckh8esutmct849d3u21so8q";
        if (request?.action === 'scrap') {
            console.log("here");
            var list = $(".vbI").children();
            var result = [];
            for (var j = 0; j < list.length; j++) {
                var item = list[j];
                var sub_top = $(item).children().children().children().children();
                var fir_data = $(sub_top).children()[0];
                $(fir_data).find("img").addClass("attachclass" + j);
                var element = document.querySelector('.attachclass' + j);
                // CREATING AN EVENT FOR HOVER
                var event = new MouseEvent('mouseover', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });

                // DISPATCHING THE EVENT, i.e., ACTUALLY HOVERING
                element.dispatchEvent(event);
            }
            setTimeout(async function () {
                for (var i = 0; i < list.length; i++) {
                    var largest_img = "";
                    var highest_image = "";
                    var item = list[i];
                    var sub_top = $(item).children().children().children().children();
                    var fir_data = $(sub_top).children()[0];
                    var external_link = "";
                    var img = $(fir_data).find("img");
                    var image_link = img.attr("src");
                    largest_img = image_link;
                    var largest = largest_img.replace("https://i.pinimg.com/", "");
                    var parsePattern = largest.split("/")[0];
                    highest_image = largest_img.replace(parsePattern, "originals");
                    var confirmExist = await confirmExistImage(highest_image);
                    if (confirmExist.msg=="no-exist") {
                        highest_image = highest_image.replace("originals", "736x");
                        var confirmExist2 = await confirmExistImage(highest_image);
                        if (confirmExist2.msg=="no-exist") {
                            highest_image = highest_image.replace("736x", "564x");
                            var confirmExist3 = await confirmExistImage(highest_image);
                            if (confirmExist3.msg=="no-exist") {
                                highest_image = image_link;
                            }
                        }
                    }
                    var name;
                    var vendor = "";
                    if (i === 0) {
                        var vendor_div = $(fir_data).find("a");
                        var vendor_a_len = vendor_div.length;
                        var ven_div = $(vendor_div)[vendor_a_len - 1];
                        var e_link = $(vendor_div)[vendor_a_len - 3];
                        external_link = $(e_link).attr("href");
                        var vendors = $(ven_div).children()[0];
                        vendor = $(vendors).text();
                        var name_div = $(ven_div).parent().parent().children()[0];
                        name = $(name_div).text();
                    } else {
                        var name_div = $(fir_data).find("a");
                        var name_len = name_div.length;
                        var name_d = name_div[name_len - 2];
                        var e_link = name_div[name_len - 3];
                        external_link = $(e_link).attr("href");
                        name = $(name_d).text();
                    }
                    var myObject = {
                        name: name,
                        external_url: external_link,
                        image_link: image_link,
                        vendor: vendor,
                        highest_image: highest_image
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
                    sendResponse({ data: "success" });
                }, 1000);
            }, 1500);
            return true;
        }
    }
);
function confirmExistImage(image_link) {
    return new Promise((resolve, reject) => {
        const imgObj = new Image();
        imgObj.src = image_link;
        imgObj.onload = function () {
            console.log('Image exists', image_link);
            resolve({ msg: "exist" });
        };
        imgObj.onerror = function () {
            // console.log('Image no exists', image_link);
            resolve({ msg: "no-exist" });
        };
    });
}
