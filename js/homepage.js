let query = "";
let filters = [];
let sort = "relevance";


$(function () {
    $('.filter-btn').on('click', function () {
        $(this).toggleClass('active');
        const activeFilters = $('.filter-btn.active')
            .map(function () { return $(this).data('filter'); })
            .get();
        filters = activeFilters;
        updateData()
        console.log('Aktive Filter:', activeFilters);
    });

    $('.dropdown-item').click(function(e) {
        e.preventDefault();
        const selectedText = $(this).html(); // HTML inklusive Icon
        const selectedValue = $(this).data('value'); // Wert aus data-value

        // Button-Text anpassen
        $('#sortDropdown').html(selectedText);

        // Optional: Wert weiterverwenden
        console.log('Selected value:', selectedValue);
        sort = selectedValue;
        updateData();
    });

    $("#searchinput").on('input', function () {
        const selectedValue = $(this).val();
        query = selectedValue;
        updateData();
    });
    updateData();


    $("#newslettersubmit").on('click', function () {
        const email = $('#email').val();
        if(!email || email == '') return;

        $.ajax({
            url: backendDomain + '/api/newsletter',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ email: email }),
            success: function (data) {
                alert("Signed up for newsletter.");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });
});


function updateData() {
    $.ajax({
        url: backendDomain + `/api/front?q=${query}&categories=${filters.toString()}&sort=${sort}&dir=DESC&${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#treebox');
            $container.empty();
            data.treelist.forEach(tree => {   
                $container.append(getTreeCard(tree, ""));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

}