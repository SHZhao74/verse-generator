$(document).ready(() => {
  $("#search").click(() => {
    fetch(`/api/addWord`, {
      method: "post",
      body: JSON.stringify({ txt: $("#txt").val() }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.text())
      .then(text => $("#result").html(text))
      .catch(e => console.error(e));
  });
});
