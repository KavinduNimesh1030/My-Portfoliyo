$(document).ready(function () {
    $("#txtDbTotCus").text("Total Customers : " + customers.length);
    $("#txtDbTotOrders").text("Total Order : " +orderDetail.length);
    $("#txtDbTotItem").text("Total Item : " +items.length);

});

function setOrders(){
    $("#txtDbTotOrders").text("Total Orders : " + purchaseOrder.length);
}
function setCus(){
    $("#txtDbTotCus").text("Total Customers : " + customers.length);
}
function setItems(){
    $("#txtDbTotItem").text("Total Items : " + items.length);
}
    $("#customerMain").hide()
    $("#ItemMain").hide()
    $("#placeOrderMain").hide()

    $("#customer").click(function(){
    $("#customerMain").show()
    $("#ItemMain").hide()
    $("#placeOrderMain").hide()
    $("#dashboardMain").hide()

});
    $("#item").click(function(){
    $("#customerMain").hide()
    $("#ItemMain").show()
    $("#placeOrderMain").hide()
    $("#dashboardMain").hide()

});
    $("#Home").click(function(){
    $("#customerMain").hide()
    $("#ItemMain").hide()
    $("#placeOrderMain").hide()
    $("#dashboardMain").show()

});
    $("#order").click(function(){
    $("#customerMain").hide()
    $("#ItemMain").hide()
    $("#placeOrderMain").show()
    $("#dashboardMain").hide()


});

