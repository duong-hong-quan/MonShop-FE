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




export { formatDate, formatPrice }