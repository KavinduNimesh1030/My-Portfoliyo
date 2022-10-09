
function loadAllCustomersForOption() {
    $("#selectCusID").empty();
    for (let customer of customers) {
        console.log(customer.id);
        $("#selectCusID").append(`<option>${customer.id}</option>`);
    }

}
