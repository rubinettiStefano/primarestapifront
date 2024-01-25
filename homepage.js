let people = [];

function insertPerson()
{
    //sto "trasformando" la form in un oggetto anonimo
    let toInsert = 
    {
        name:document.getElementById("inName").value,
        surname:document.getElementById("inSurname").value,
        job:document.getElementById("inJob").value,
        dob:document.getElementById("inDob").value
    };

    let jsonizzato = JSON.stringify(toInsert);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: jsonizzato
    };

    fetch("http://localhost:8080/people", requestOptions)
    .then(response => response.text())
    .then
    (
        body =>{
                    let personaAppenaInserita = JSON.parse(body);
                    people.push(personaAppenaInserita);
                    init();
        }
        
    )
}

let init = function()
{
    let divPeople = document.getElementById("peoplelist");

    let content = people.map(p=>`
                                <div class="w3-col m4 l4 w3-padding">
                                    <div class="w3-card-4">

                                        <header class="w3-container w3-blue">
                                            <h1>${p.name} ${p.surname}</h1>
                                        </header>
                                        
                                        <div class="w3-container">
                                            <p>Born in ${p.dob}</p>
                                            <p>Work as a ${p.job}</p>
                                        </div>
                                    </div>
                                </div>
                            `);

    divPeople.innerHTML = content.join("");
}

let requestOptions = 
{
    method: 'GET'
};
  //   URL DELLA REQUEST                CONFIGURAZIONE
fetch("http://localhost:8080/people", requestOptions)//fai una request GET all'URLhttp://localhost:8080/people
.then(response => response.text())//prende la response e della response prende solo il BODY
.then
(
    body => {
                people = JSON.parse(body);
                init();
            }
)// il body della response
                                             //con JSON.parse convertiamo un json in un vettore di oggetti JAVASCRIPT

//INIZIALIZZAZIONE
