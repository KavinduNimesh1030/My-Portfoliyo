function loadAllCustomersForOption() {
    $("#selectCusID").empty();
    for (let customer of customers) {
        console.log(customer.id);
        $("#selectCusID").append(`<option>${customer.id}</option>`);

    }


}

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

