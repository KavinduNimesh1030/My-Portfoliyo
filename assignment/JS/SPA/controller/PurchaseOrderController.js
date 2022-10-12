var placeOrder = [];
var purchaseOrder = [];
var orderDetail = [];
var cartItemsId = [];
var duplicatePlaceOrder = [];
var x = 0;
var t = 0;

$(document).ready(function () {
    displayOrderId();
    a();
});

function a(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    $('#txtOrderDate').attr('min',today);
}


/*$("#txtOrderDate").dataset({ minDate: 0});*/

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
    let orderId = $("#txtOrderId").val();
    let qty = $("#txtOrderItemQty").val();
    if(parseInt(qty)<parseInt(itemQty)){
        alert("please enter amount lower than "+parseInt(itemQty));
    }else {

        let x = 0;
        if (placeOrder.length != 0) {

            for (let cart of placeOrder) {
                console.log("1st");
                if (cart.itemCode == $("#txtOrderItemId").val()) {
                    let newQty = parseInt(cart.quantity) + parseInt($("#txtOrderQty").val());
                    let newTot = parseInt(cart.itemPrice)*parseInt(newQty);
                    cart.total = newTot;
                    cart.quantity = newQty;
                    $("#tblOrderCart").empty();
                    loadAllCartItems();
                    updateItemQty();
                    /*--------------------------------------------------------*/
                    if(x == 0){
                        getTot()
                    }else {
                        getTot()
                    }

                    /*--------------------------------------------------------*/
                    console.log("aaa");
                    newQty =0;
                    return false;
                }
                x++;
            }
            for (let cart1 of placeOrder){
                if(cart1.itemCode != $("#txtOrderItemId").val()) {
                    console.log("no");
                    addItem(itemCode, itemName, itemPrice, $("#txtOrderQty").val(), parseFloat(itemTotal));
                    getTot();
                    return false;
                }
            }

        } else {
            console.log("else")
            addItem(itemCode, itemName, itemPrice, itemQty, parseFloat(itemTotal));
        }


    }


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
function calTotal(){
    let currentVal = $("#lblTotalAmount").text() != "0.00" ? $("#lblTotalAmount").text() : "0";
    let tot ;
    for (let x of placeOrder) {
        tot =+ parseInt(x.total);
        $("#lblTotalAmount").text((parseInt(tot)+parseInt(currentVal))-parseInt(x.itemPrice));
        $("#lblTotalAmount").text((parseInt(tot)+parseInt(currentVal))-parseInt(x.itemPrice));

    }


}
function getTot(){
    let y ;
    v =[];
    for (let j = 0; j < placeOrder.length; j++) {
        /* let amount = placeOrder[j].total+placeOrder[j+1].total;*/
        x = placeOrder[j].total
        console.log(x);
        v[j]=x;

    }
    var total = 0;
    for (var i = 0; i < v.length; i++) {
        total += v[i] << 0;
    }
    console.log(total);
    $("#lblTotalAmount").text(total);
    $("#lblSubTotalAmount").text(total);


}
function updateItemQty(){
    let currentQty = parseInt($("#txtOrderItemQty").val()) - parseInt($("#txtOrderQty").val());
    for (let item of items) {
        if (item.code == $("#txtOrderItemId").val()) {
            item.quantity = currentQty;
            $("#txtOrderItemQty").val(currentQty);
        }
    }
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
    //updateItemQty();
    let currentQty = parseInt($("#txtOrderItemQty").val()) - parseInt($("#txtOrderQty").val());
    for (let item of items) {
        if (item.code == $("#txtOrderItemId").val()) {
            item.quantity = currentQty;
            $("#txtOrderItemQty").val(currentQty);
        }
    }

    console.log(currentQty);
    loadAllCartItems();
    cartItemsId.push($("#txtOrderItemId").val());
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
    let version = String(t);

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
    $("#tblOrderCart").empty();

}

$("#txtOrderSearch").on('keydown', function (event) {
    var row;
    if (event.key == "Enter") {
        $("#tblOrderCart").empty();
        console.log("out");
        let searchId = $("#txtOrderSearch").val();
        let i = 0;
        for (let order of orderDetail) {
            if (orderDetail[i].orderDetailID == searchId) {
                console.log("in");
                for (let pOrder of duplicatePlaceOrder) {
                    if (pOrder.itemCode == order.ODItemCode)
                        row = `<tr><td>${order.ODItemCode}</td><td>${pOrder.itemName}</td><td>${pOrder.itemPrice}</td><td>${order.qty}</td><td>${pOrder.total}</td></tr>`;

                }
                $("#tblOrderCart").append(row);

            }
            i++;
        }

    }
});
$("#btnAddNewOrder").click(function () {
    $("#tblOrderCart").empty();
});

function saveOrderDetail() {
    let i = 0;
    for (let order of placeOrder) {
        let orderDetailOB = {
            "orderDetailID": $("#txtOrderId").val(),
            "ODItemCode": placeOrder[i].itemCode,
            "qty": placeOrder[i].quantity,
        }
        i++;
        orderDetail.push(orderDetailOB);
        setOrders();

    }


}

$("#btnPurchaseOrder").click(function () {
    saveOrderDetail();
    let z = t++;
    displayOrderId();
    let balance = $("#txtBalance").val();
    if (parseInt(balance) < 0) {
        alert("insufficient credits ,Check Cash !!");
    } else {
        if ($("#txtOrderCusId").val() != "") {
            purchaseOrderMethod();
        } else {
            alert("Add Customer Before the place Order !!");
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
    duplicatePlaceOrder = placeOrder;
    placeOrder = [];
    setOrders();
    clearDetail();
    alert("Order Placed!!");
}





