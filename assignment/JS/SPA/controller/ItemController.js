var items = [];
$("#btnSaveItem").click(function (){

    let code = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let qty = $("#txtItemQty").val();
    let price = $("#txtItemPrice").val();

    saveItem(code,itemName,qty ,price);
})

function setItemTextfeildValues(code,itemName,qty,price) {
    $("#txtItemCode").val(code);
    $("#txtItemName").val(itemName);
    $("#txtItemQty").val(qty);
    $("#txtItemPrice").val(price);

}


function saveItem(code, itemName, qty, price) {

    var item = {
        "code": code,
        "itemName": itemName,
        "quantity": qty,
        "price": price,

    }
    console.log(items)
    items.push(item);
    loadAllItems();
    bindItemRowClickEvent();
    setItemTextfeildValues("", "", "", "");

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

    $("#btnItemSearch").click(function (){
        let typedCode = $("#txtItemSearch").val();
        let item = searchItems(typedCode);
        if (item != null) {
            setItemTextfeildValues(item.code, item.itemName, item.quantity, item.price);
            $("#addItem").click();
        } else {
            alert("There is no Item available for that " + typedCode);
            setItemTextfeildValues("", "", "", "");
        }

    });

    $("#btnUpdateItem").click(function () {
        let response = updateItem($("#txtItemCode").val());
        if (response) {
            alert("Update Item Success!");
            setItemTextfeildValues("", "", "", "");
        } else {
            alert("Update Item failed!");
        }
    });


    $("#btnDeleteItem").click(function (){
        let deleteCode = $("#txtItemCode").val();

        let option = confirm("Do you really want to delete " + deleteCode);
        if (option) {
            if (deleteItem(deleteCode)) {
                alert("Item Successfully Deleted..");
                setItemTextfeildValues("", "", "", "");
            } else  {
                alert("No such Item to delete. please check the id");
            }
        }
    });

    function deleteItem(itemCode) {
        let item = searchItems(itemCode);
        if (item != null) {
            let indexNumber = items.indexOf(item);
            items.splice(indexNumber, 1);
            loadAllItems();
            return true;
        } else {
            return false;
        }
    }
    function updateItem(code) {
        let item = searchItems(code);
        if (item != null) {
            item.code = $("#txtItemCode").val();
            item.itemName = $("#txtItemName").val();
            item.quantity = $("#txtItemQty").val();
            item.price = $("#txtItemPrice").val();
            loadAllItems();
            return true;
        } else {
            return false
        }
    }


    function searchItems(code) {
        for (let item of items) {
            if (item.code == code) {
                return item;
            }
        }
        return null;
    }

}