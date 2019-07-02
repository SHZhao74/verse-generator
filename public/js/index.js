$(document).ready(() => {
    $('#search').click(() => {
        fetch(`/api/search?txt=${$('#txt').val()}`)
            // .then(res => res.json()).then(json => {
            //     const cards = json.map(j => {
            //         const keys = Object.keys(j);
            //         const values = Object.values(j); 
            //         const card = $(`<div class="card">
            //         <dic class="card-body">
            //             <ul>
            //                 ${for (key of j) {
                                
            //                 }}
            //             </ul>
                        
            //         </dic></div>`)
            //         return card;
            //     })
            //     $('#result').html(cards);
            // })
            .then(res => res.text()).then(text => $('#result').html(text))
        .catch(e => console.error(e))
    })
})