let query = "";
let filters = [];
let sort = "relevance";


$(function () {
    $('.filter-btn').on('click', function () {
        $(this).toggleClass('active');
        const activeFilters = $('.filter-btn.active')
            .map(function () { return $(this).data('filter'); })
            .get();
        categories = activeFilters;
        updateData()
        console.log('Aktive Filter:', activeFilters);
    });

    $("#sortSelect").on('change', function () {
        const selectedValue = $(this).val();
        sort = selectedValue;
        updateData();
    });

    $("#searchinput").on('change', function () {
        const selectedValue = $(this).val();
        query = selectedValue;
        updateData();
    });
    updateData();


});


function updateData() {
    $.ajax({
        url: backendDomain + `/api/front?${(isTokenValid() ? "token=" + getToken() + "&" : "")}q=${query}&categories=${filters.toString()}&sort=${sort}&dir=DESC`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            const $container = $('#treebox');
            data.treelist.forEach(tree => {
                const cardHtml = `
                    <div class="col-12 col-md-6 col-lg-4">
                        <a href="data/tree.html?id=${tree.id}" target="_blank" class="text-decoration-none">
                            <div class="card h-100 shadow-sm hover-shadow">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${tree.title}</h5>
                                    <p class="card-text text-muted">Click to view</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;

                $container.append(cardHtml);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

}