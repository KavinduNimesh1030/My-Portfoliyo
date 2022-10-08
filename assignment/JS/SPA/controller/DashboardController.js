
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

