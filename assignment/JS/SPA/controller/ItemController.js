
$("#btnSaveItem").click(function (){

    let code = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let qty = $("#txtItemQty").val();
    let price = $("#txtItemPrice").val();

    saveItem(code,itemName,qty ,price);
})
function saveItem(code, itemName, qty, price) {

    var item = {
        "code": code,
        "itemName": itemName,
        "quantity": qty,
        "price": price,

    }
    items.push(item);
    loadAllItems();
    bindItemRowClickEvent();
    //setTextfieldValues("", "", "", "");
}
function loadAllItems() {
    //remove all the table body content before adding data
    $("#tblItem").empty();


    // get all customer records from the array
    for (var item of items) {
        var row = `<tr><td>${item.code}</td><td>${item.itemName}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblItem").append(row);
    }
}
function bindItemRowClickEvent() {
    $("#tblItem>tr").click(function () {

        //how to get the row we click at the moment
        let code = $(this).children(':eq(0)').text();
        let itemName = $(this).children(':eq(1)').text();
        let qty = $(this).children(':eq(2)').text();
        let price = $(this).children(':eq(3)').text();

        $("#txtItemCode").val(code);
        $("#txtItemName").val(itemName);
        $("#txtItemQty").val(qty);
        $("#txtItemPrice").val(price);

        $("#addItem").click();

    });

}