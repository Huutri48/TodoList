export default class Validation {
    kiemTraRong = function (input, divId, mess) {
        if (input.trim() === "") {
            document.getElementById(divId).style.display = "block";
            document.getElementById(divId).innerHTML = mess;
            document.getElementById(divId).className = "alert alert-danger";
            return false;
        } else {
            document.getElementById(divId).innerHTML = "";
            document.getElementById(divId).className = "";
            return true;
        }
    };
    kiemTraTaiKhoanTrung = function (input, divId, mess, arr) {
        var status = true;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].task === input) {
                status = false;
                break;
            }
        }

        if (status) {
            document.getElementById(divId).innerHTML = "";
            document.getElementById(divId).className = "";
            return true;
        }
        document.getElementById(divId).style.display = "block";
        document.getElementById(divId).innerHTML = mess;
        document.getElementById(divId).className = "alert alert-danger";
        return false;
    };
}