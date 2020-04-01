'use strict';

$(document).ready(function () {
    function Gallery(horn) {
        this.image_url = horn.image_url;
        this.title = horn.title;
        this.description = horn.description;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        Gallery.all.push(this);
    }
    Gallery.all = [];

    Gallery.prototype.render = function () {
        let $hornClone = $('#photo-template').html();
        let theRender = Mustache.render($hornClone, this);
        $('main').append(theRender);
    }

    const readJson1 = () => {
        $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
            data.forEach(items => {
                let horn = new Gallery(items);
                horn.render();
            });
        }).then(() => selectOption());
    };
    readJson1();

    const readJson2 = () => {
        $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' }).then(data => {
            data.forEach(items => {
                let horn = new Gallery(items);
                horn.render();
            });
        }).then(() => selectOption());
    };
    readJson2();

    $('#page1').on('click', function () {
        $('section').hide();
        readJson1();
    });

    $('#page2').on('click', function () {
        $('section').hide();
        readJson2();
    });

    let $hornSelect = $('select');
    const selectOption = function () {
        Gallery.all.forEach(picByKeyword => {
            let $option = `<option value="${picByKeyword.keyword}">${picByKeyword.keyword}<option>`;
            $hornSelect.append($option);
        });
    }

    $hornSelect.on('change', function () {
        let $theSelect = $(this).val();
        $('section').hide();
        $(`.${$theSelect}`).show();
    });

    const $liSort1 = $('#sort li:first');
    const $liSort2 = $('#sort li:last');

    $liSort1.on('click', function () {
        Gallery.all.sort((pic1,pic2) => pic1.title.toLowerCase() > pic2.title.toLowerCase());
        console.log('sort1');
        
    });

    $liSort2.on('click', function () {
        console.log('sort2');
        Gallery.all.sort((pic1,pic2) => pic1.horns - pic2.horns);
    });
});