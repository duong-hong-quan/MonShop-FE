function formatDate(inputDateString) {
    var dateObj = new Date(inputDateString);

    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year = dateObj.getFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();

    var formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
}

function formatPrice(input) {
    return `${input?.toLocaleString("en-US")} đ`
}


function parseStringToBoolean(str) {
    if (str == 'true') {
        return true;
    } else if (str == 'false') {
        return false;
    } else {
        // Handle other cases if needed
        return undefined; // Or throw an error
    }
}

export { formatDate, formatPrice,parseStringToBoolean }