'use strict';
function useXhr() {
    const xhr = new XMLHttpRequest();
    // Add listener
    xhr.addEventListener('readystatechange', evt => {
        if (xhr.readyState === xhr.DONE) {
            // when server answered convert to object
            // if u not sure in answer, use try/catch
            try {
                $('.json_data').text(xhr.responseText);
                console.log('Result', JSON.parse(xhr.responseText));
            } catch (xhrDataErr) {
                console.log('Error', xhr.status);
            }
        }
    }, false);
    xhr.open('GET', 'http://api.fixer.io/latest?symbols=RUB', true);
    // send quest
    xhr.send();
}

// use fetch
function useFetch() {
    const xhr = fetch('http://api.fixer.io/latest?symbols=USD', {
        method: 'GET'
    });
    xhr
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            console.log('Result', data)
            $('.json_data').text(data);
        })
        .catch(function (err) {
            console.log('Error', err);
        });
}

function getJsonp() {
    let script = document.createElement('script');
    script.src = 'http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-2.json';
    document.head.appendChild(script);
    window.jsonCallback = (data) => {
        $('.json_data').text(JSON.stringify(data));
    };
}

function get() {
    let ajax = $.get({
        url: 'http://api.fixer.io/latest',
        data: {
            symbols: 'RUB'
        },
        success: function (response) {
            console.log('response', response)
        },
        error: function (err) {
            console.log('err', err)
        }
    });
    ajax.done(function (data) {
        $('.json_data').text(JSON.stringify(data));
    });
}

function post() {
    let ajax = $.post({
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: {'hop': 'hey'},
        success: function (response) {
            console.log('response', response)
        },
        error: function (err) {
            console.log('err', err)
        }
    });
    ajax.done(function (data) {
        $('.json_data').text(JSON.stringify(data));
    });
}

function init() {
    $('.link-xhr').click(evt => {
        useXhr();
    });
    $('.link-fetch').click(evt => {
        useFetch();
    });
    $('.link-jsonp').click(evt => {
        getJsonp();
    });
    $('.link-get').click(evt => {
        get();
    });
    $('.link-post').click(evt => {
        post();
    });
    let jsonData = $('.json_data')
    jsonData.empty();
}
init()

