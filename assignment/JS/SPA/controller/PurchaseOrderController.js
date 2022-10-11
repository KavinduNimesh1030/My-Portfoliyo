var placeOrder = [];
var purchaseOrder = [];
var x = 0;

$(document).ready(function () {
    displayOrderId();

});

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
    let id = $("#selectCusID").val();
    console.log("cus id " + id);
    for (let customer of customers) {
        if (customer.id == id) {
            $("#txtOrderCusId").val(customer.id);
            $("#txtOrderCusName").val(customer.name);
            $("#txtOrderCusAddress").val(customer.address);
            $("#txtOrderCusSalary").val(customer.salary);
        }
    }

});
$("#btnAddToCart").click(function () {
    let itemCode = $("#txtOrderItemId").val();
    let itemName = $("#txtOrderItemName").val();
    let itemPrice = $("#txtOrderItemPrice").val();
    let itemQty = $("#txtOrderQty").val();
    let itemTotal = $("#txtOrderItemPrice").val() * $("#txtOrderQty").val();
    addItem(itemCode, itemName, itemPrice, itemQty, parseFloat(itemTotal));
});

function loadAllCartItems() {
    $("#tblOrderCart").empty();
    for (var order of placeOrder) {
        var row = `<tr><td>${order.itemCode}</td><td>${order.itemName}</td><td>${order.itemPrice}</td><td>${order.quantity}</td><td>${order.total}</td></tr>`;
        /*var row= "<tr><td>"+order.itemCode+"</td><td>"+order.itemName+"</td><td>"+order.quantity+"</td><td>"+order.quantity+"</td></tr>";*/
        $("#tblOrderCart").append(row);


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
    let currentQty = parseInt($("#txtOrderItemQty").val())-parseInt($("#txtOrderQty").val());
    for (let item of items) {
        if (item.code == $("#txtOrderItemId").val()) {
          item.quantity = currentQty;
          $("#txtOrderItemQty").val(currentQty);
        }
    }

    console.log(currentQty);
    loadAllCartItems();
    let currentVal = $("#lblTotalAmount").text() != "0.00" ? $("#lblTotalAmount").text() : "0";
    console.log("lblValue " + $("#lblTotalAmount").text())
    console.log("currentValue " + currentVal)
    /* if(currentVal!= ""){
         currentVal = $("#txtBalance").val();
         console.log("000");
     }else {
         console.log("1111");
         currentVal = "0";
     }*/

    var three = parseFloat(currentVal) + parseFloat(total);
    $("#lblTotalAmount").text(three);
    $("#lblSubTotalAmount").text(three);
    bindOrderRowClickEvent();

    // setItemTextfeildValues("", "", "", "");

}

$("#txtCash").on('keyup', function (event) {
    findBalance();
});
$("#txtDiscount").on('keyup', function (event) {
    let discount = $("#txtDiscount").val();
    let total = $("#lblTotalAmount").text();
    let balance = parseFloat(total) - (parseFloat(total) * parseFloat(discount) / 100);
    $("#lblSubTotalAmount").text(balance);
    findBalance();

})

function findBalance() {
    let amount = $("#txtCash").val();
    let total = $("#lblSubTotalAmount").text();
    let balance = parseFloat(amount) - parseFloat(total)
    $("#txtBalance").val(balance);
}


function generateOrderId() {

    let rst = $("#txtOrderId").val();
    let a = 0;
    let newVersion;
    /*let y = x++;*/
    let version = String(x);

    let i = (parseInt(version.substring(1, version.big())) + 1);

    if (i >= 10) {
        newVersion = "D0" + i;
    } else {
        newVersion = "D00" + i;
    }
    console.log(newVersion);
    return newVersion;


}

function displayOrderId() {
    // $("#txtOrderId").val("D003");
    console.log(generateOrderId());
    $("#txtOrderId").val(generateOrderId());

}

function clearDetail() {
    $("#txtOrderItemId").val("");
    $("#txtOrderItemName").val("");
    $("#txtOrderItemPrice").val("");
    $("#txtOrderItemQty").val("");

    $("#txtOrderCusId").val("");
    $("#txtOrderCusName").val("");
    $("#txtOrderCusAddress").val("");
    $("#txtOrderCusSalary").val("");

    $("#txtOrderDate").val("");
    $("#txtOrderItemId").val("");
    $("#txtOrderCusId").val("");
    $("#txtOrderQty").val("");


    $("#txtDiscount").val("");
    $("#txtCash").val("");
    $("#txtBalance").val("");
    $("#lblSubTotalAmount").text("0.00");
    $("#lblTotalAmount").text("0.00");

}
$("#btnPurchaseOrder").click(function () {
    let z = x++;
    displayOrderId();
    let balance = $("#txtBalance").val();
    if (parseInt(balance)<0) {
        alert("insufficient credits ,Check Cash !!");
    } else {
        if($("#txtOrderCusId").val()!= ""){
            purchaseOrderMethod();
        }else {
            alert("Add Customer Before the place Order !!") ;
        }

    }

});

function purchaseOrderMethod() {
    let orderId = $("#txtOrderId").val();
    let orderDate = $("#txtOrderDate").val();
    let itemCode = $("#txtOrderItemId").val();
    let cusId = $("#txtOrderCusId").val();

    var OrderDetail = {
        'orderId': orderId,
        'orderDate': orderDate,
        'itemCode': itemCode,
        'cusId': cusId,
    }
    purchaseOrder.push(OrderDetail);
    clearDetail();
}





