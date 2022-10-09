var customers = [];
$("#save_btn").click(function () {

    let cusId = $("#cusId").val();
    let cusName = $("#cusName").val();
    let cusAddress = $("#cusAddress").val();
    let cusSalary = $("#cusSalary").val();

    saveCustomer(cusId, cusName, cusAddress, cusSalary);

});

function loadAllCustomers() {
    //remove all the table body content before adding data
    $("#tblCustomer").empty();


    // get all customer records from the array
    for (var customer of customers) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblCustomer").append(row);
    }
}

$("#btnCusSearch").click(function () {
    let customer = searchCustomer($("#txtCustomerSearch").val());
    if (customer != null) {
        searchMethod($("#txtCustomerSearch").val());
        $("#addCustomer").click();
    } else {
        alert("There is no customer available for that " + $("#txtCustomerSearch").val());
        setTextfieldValues("", "", "", "");
        $("#txtCustomerSearch").val("");
    }


});


$("#get").click(function () {
    for (var i of customers) {
        console.log(customers[i].name);
    }
});


function bindRowClickEvent() {
    $("#tblCustomer>tr").click(function () {

        //how to get the row we click at the moment
        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let salary = $(this).children(':eq(3)').text();

        $("#cusId").val(id);
        $("#cusName").val(name);
        $("#cusAddress").val(address);
        $("#cusSalary").val(salary);

        $("#addCustomer").click();

    });

}
$("#tblCustomer>tr").click('dblClick', function () {
    $(this).remove();
});



$("#updateCus").click(function () {
    let response = updateCustomer($("#cusId").val());
    if (response) {
        alert("Update Customer Success!");
        setTextfieldValues("", "", "", "");
    } else {
        alert("Update Customer failed!");
    }
});

$("#deleteCus").click(function () {
    let deleteID = $("#cusId").val();

    let option = confirm("Do you really want to delete " + deleteID);
    if (option) {
        if (deleteCustomer(deleteID)) {
            alert("Customer Successfully Deleted..");
            setTextfieldValues("", "", "", "");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }

});

$("#cusId,#cusName,#cusAddress,#cusSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#cusId").on('keydown', function (event) {
    let pattern = /^(C)[0-9]{2}$/;
    let x = validation($("#cusId").val(), pattern, "#cusId", "#txtIdWar");

    let customer1 = searchCustomer($("#cusId").val());
    if (event.key == "Enter") {

        let pattern = /^(C)[0-9]{3}$/;
        let x = validation($("#cusId").val(), pattern, "#cusId", "#txtIdWar");
        if (x) {
            $("#cusName").focus();
        } else {
            event.preventDefault();
        }

    }


});

$("#cusName").on('keydown', function (event) {

    let pattern = /^[A-z ]{5,20}$/;
    let x = validation($("#cusName").val(), pattern, "#cusName", "#txtNameWar");

    if (event.key == "Enter") {
        let x = validation($("#cusName").val(), pattern, "#cusName", "#txtNameWar");

        if (x) {
            $("#cusAddress").focus();
        } else {
            event.preventDefault();
        }
    }

});
$("#cusAddress").on('keydown', function (event) {

    let pattern = /^[A-z0-9 .,/]{5,30}$/;
    let x = validation($("#cusAddress").val(), pattern, "#cusAddress", "#txtAddressWar");

    if (event.key == "Enter") {
        if (x) {
            $("#cusSalary").focus();
        } else {
            event.preventDefault();
        }
    }

});
$("#cusSalary").on('keydown', function (event) {

    let pattern = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
    let x = validation($("#cusSalary").val(), pattern, "#cusSalary", "#txtSalaryWar");

    if (event.key == "Enter") {
        if (x) {
            confirm("are u sure ??");
            $("#save_btn").click();
            $("#cusId").focus();
        } else {
            event.preventDefault();
        }
    }

});
/*  $("#cusId").on('keydown', function (event) {
    var id = /^(C)[0-9]{2}$/;
    var result = id.test($("#cusId").val());
    if(result){
      $("#cusId").css('border-color' ,'green') ;
    }else {
      $("#cusId").css('border-color' ,'red') ;
    }
  });*/

/*function---------------------------------------------------------------------------------------*/

function saveCustomer(cusId, cusName, cusAddress, cusSalary) {

    var customer = {
        "id": cusId,  //key : value
        "name": cusName,
        "address": cusAddress,
        "salary": cusSalary,

    }
    customers.push(customer);
    loadAllCustomers();
    bindRowClickEvent();
    loadAllCustomersForOption();
    setTextfieldValues("", "", "", "");

}

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function updateCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.id = $("#cusId").val();
        customer.name = $("#cusName").val();
        customer.address = $("#cusAddress").val();
        customer.salary = $("#cusSalary").val();
        loadAllCustomers()
        return true;
    } else {
        return false
    }
}


function searchMethod(id) {
    let typedId = id;
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setTextfieldValues(customer.id, customer.name, customer.address, customer.salary);
    } else {
        alert("There is no cusotmer available for that " + typedId);
        setTextfieldValues("", "", "", "");
    }
}

function setTextfieldValues(id, name, address, salary) {
    $("#cusId").val(id);
    $("#cusName").val(name);
    $("#cusAddress").val(address);
    $("#cusSalary").val(salary);
}


function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

function validation(input, pattern, txt, war) {
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

