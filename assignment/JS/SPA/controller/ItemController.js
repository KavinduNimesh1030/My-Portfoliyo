var items = [];

function validationItem(input, pattern, txt, war) {
    var id = pattern;
    var result = id.test(input);
    if (result) {
        $(txt).css('border-color', 'green');
        $(war).css('display', 'none')
        return true;
    } else {
        $(txt).css('border-color', 'red');
        $(war).css('display', 'block');
        return false;
    }
}
/*--------------------------------------------Validation-------------------------------------------*/
$("#txtItemCode").on('keydown', function (event) {

    let pattern = /^(I)[0-9]{2}$/;
    let x = validationItem($("#txtItemCode").val(), pattern, "#txtItemCode", "#txtItemCodeWar");

    //let customer1 = searchCustomer($("#cusId").val());
    if (event.key == "Enter") {

        let pattern = /^(I)[0-9]{3}$/;
        let x = validationItem($("#txtItemCode").val(), pattern, "#txtItemCode", "#txtItemCodeWar");
        if (x) {
            $("#txtItemName").focus();
        } else {
            event.preventDefault();
        }

    }


});

$("#txtItemName").on('keydown', function (event) {

    let pattern = /^[A-z ]{5,20}$/;
    let x = validationItem($("#txtItemName").val(), pattern, "#txtItemName", "#txtItemNameWar");

    if (event.key == "Enter") {
        let x = validationItem($("#txtItemName").val(), pattern, "#txtItemName", "#txtItemNameWar");

        if (x) {
            $("#txtItemQty").focus();
        } else {
            event.preventDefault();
        }
    }

});
$("#txtItemQty").on('keydown', function (event) {

    let pattern = /^[A-z 0-9]{2,10}$/;
    let x = validationItem($("#txtItemQty").val(), pattern, "#txtItemQty", "#txtItemQtyWar");

    if (event.key == "Enter") {
        if (x) {
            $("#txtItemPrice").focus();
        } else {
            event.preventDefault();
        }
    }

});
$("#txtItemPrice").on('keydown', function (event) {

    let pattern = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
    let x = validationItem($("#txtItemPrice").val(), pattern, "#txtItemPrice", "#txtItemPriceWar");

    if (event.key == "Enter") {
        if (x) {
            confirm("are u sure ??");
            $("#btnSaveItem").click();
            $("#txtItemCode").focus();
        } else {
            event.preventDefault();
        }
    }

});
/*-------------------------------------------------------------------------------------*/
$("#btnSaveItem").click(function (){

    let code = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let qty = $("#txtItemQty").val();
    let price = $("#txtItemPrice").val();

    saveItem(code,itemName,qty ,price);
    setItems();
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
    loadAllItemsForOption();
    setItems();

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
        let response  = updateItem($("#txtItemCode").val());
        if (response) {
            alert("Update Item Success!");
            setItemTextfeildValues("", "", "", "");
        } else if(response){
            alert("Update Item failed!");
        }
    });


    $("#btnDeleteItems").click(function () {
        /*let deleteCode = $("#txtItemCode").val();
        let option = confirm("Do you really want to delete " + deleteCode);
        console.log("1st round")
        if (option) {
            if (deleteItem(deleteCode)) {
                setItemTextfeildValues("", "", "", "");
                alert("Item Successfully Deleted..");
                console.log("if condition")
                return false;
            } else {
                alert("No such Item to delete. please check the id");
            }

        }*/
        let deleteCode = $("#txtItemCode").val();
        if (deleteItem(deleteCode)) {
            setItemTextfeildValues("", "", "", "");
            alert("Item Successfully Deleted..");
            console.log("if condition")
            setItems();
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