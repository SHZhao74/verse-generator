$(document).ready(() => {
    $('#search').click(() => {
        const txt = $('#txt').val();
        if(txt)
        fetch(`/api/search?txt=${txt}`)
            .then(res => res.text()).then(text => $('#result').html(text))
        .catch(e => console.error(e))
    })
})