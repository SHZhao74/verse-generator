$(document).ready(() => {
    $('#search').click(() => {
        const txt = $('#txt').val();
        if(txt)
        fetch(`/api/search?txt=${txt}`)
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