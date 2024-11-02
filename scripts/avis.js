export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
        const id = event.target.dataset.id;
        console.log(id)
        const response = await fetch("http://localhost:8081/pieces/" + id + "/avis")
        const avis = await response.json()
        
        const avisPourPiece =  avis.filter(a => a.pieceId == id)
        console.log(avisPourPiece)
        
        const avisElement = document.createElement("p");
        for (let i = 0; i < avisPourPiece.length; i++) {
            avisElement.innerHTML = `${avisPourPiece[i].utilisateur}: ${avisPourPiece[i].commentaire} <br>`;
            
            }
        })
    }
}