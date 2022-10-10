var placeOrder = [] ;
function loadAllCustomersForOption() {
    $("#selectCusID").empty();
    for (let customer of customers) {
        console.log(customer.id);
        $("#selectCusID").append(`<option>${customer.id}</option>`);

    }


}
function loadAllItemsForOption() {
    $("#selectedItemId").empty();
    for (let item of items) {
        console.log(item.code);
        $("#selectedItemId").append(`<option>${item.code}</option>`);

    }


}
$("#selectedItemId").change(function () {
    let code = $("#selectedItemId").val();
    console.log("ItemCode " + code);
    for (let item of items) {
        if (item.code == code) {
            $("#txtOrderItemId").val(item.code);
            $("#txtOrderItemName").val(item.itemName);
            $("#txtOrderItemPrice").val(item.price);
            $("#txtOrderItemQty").val(item.quantity);
        }
    }
});

$("#selectCusID").change(function () {
    let id  =$("#selectCusID").val();
    console.log("cus id "+id);
    for (let customer of customers) {
        if (customer.id == id) {
            $("#txtOrderCusId").val(customer.id);
            $("#txtOrderCusName").val(customer.name);
            $("#txtOrderCusAddress").val(customer.address);
            $("#txtOrderCusSalary").val(customer.salary);
        }
    }

});
$("#btnAddToCart").click(function (){
    let itemCode =  $("#txtOrderItemId").val();
    let itemName =$("#txtOrderItemName").val();
    let itemPrice =$("#txtOrderItemPrice").val();
    let itemQty =$("#txtOrderQty").val();
    let itemTotal =$("#txtOrderItemPrice").val()*$("#txtOrderQty").val();
     addItem(itemCode,itemName,itemPrice,itemQty,itemTotal);
});

function loadAllCartItems() {
    let balance;
    $("#tblOrderCart").empty();
        for (var order of placeOrder) {
            var row = `<tr><td>${order.itemCode}</td><td>${order.itemName}</td><td>${order.itemPrice}</td><td>${order.quantity}</td><td>${order.total}</td></tr>`;
            /*var row= "<tr><td>"+order.itemCode+"</td><td>"+order.itemName+"</td><td>"+order.quantity+"</td><td>"+order.quantity+"</td></tr>";*/
            $("#tblOrderCart").append(row);
             balance = order.total;

        }

}

function bindOrderRowClickEvent() {

}

function addItem(itemCode, itemName, price, qty, total) {

    var order = {
        "itemCode": itemCode,
        "itemName": itemName,
        "itemPrice": price,
        "quantity": qty,
        "total": total,

    }
    placeOrder.push(order);
    loadAllCartItems();
     /*let currentVal = $("#lblTotal").innerText!="0.00"?$("#txtBalance").val():"0";*/
    /* if(currentVal!= ""){
         currentVal = $("#txtBalance").val();
         console.log("000");
     }else {
         console.log("1111");
         currentVal = "0";
     }*/

    var three =+ parseInt(total);
    $("#txtBalance").val(three);
    $("#lblTotal").text(three);
    bindOrderRowClickEvent();
   // setItemTextfeildValues("", "", "", "");

}

