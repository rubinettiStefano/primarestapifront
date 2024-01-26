let people = [];

let fillPage = (htmlContent)=>
{
    let page = document.getElementById("page");
    page.innerHTML = htmlContent;
}

let renderAllPeople = () =>
{
    let requestOptions = {method: 'GET'};
    fetch("http://localhost:8080/people", requestOptions)
    .then(response => response.text())
    .then
    (json =>
        {
            people = JSON.parse(json);
            let htmlContent = people.map(p=>renderOnePerson(p)).join("");
            fillPage(htmlContent);
        }
    );

    clearSearch();
}

let renderFiltered = () =>
{
    let searchValue = document.getElementById("searchValue").value;
    // let peopleFiltered = [];
    // for(let p of people)
    //     if(p.name.toLowerCase().includes(searchValue) || p.surname.toLowerCase().includes(searchValue) )
    //         peopleFiltered.push(p);
    let peopleFiltered = people.filter(p=>p.name.toLowerCase().includes(searchValue) || p.surname.toLowerCase().includes(searchValue));
    let htmlContent = peopleFiltered.map(p=>renderOnePerson(p)).join("");
    fillPage(htmlContent);
}

let clearSearch = ()=>
{
    document.getElementById("searchValue").value = "";
}

let deletePerson = (id)=>
{
    let requestOptions = {method: 'DELETE'};
    fetch("http://localhost:8080/people/"+id, requestOptions)
    .then(response => renderAllPeople());//rigrafica la pagina solo quando arriva la response, quando la persona è stata cancellata dal db
    
}

function insertPerson()
{
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
    .then(response => renderAllPeople());
   
}

let renderOnePerson = (person)=>
{

    return  `
                <div class="w3-col m4 l4 w3-padding">
                    <div class="w3-card-4">

                        <header class="w3-container w3-orange">
                            <h1>${person.name} ${person.surname} <button class="w3-pink w3-right" onclick="deletePerson(${person.id})">X</button></h1>
                        </header>
                        
                        <div class="w3-container">
                            <p>Born in ${person.dob}</p>
                            <p>Work as a ${person.job}</p>
                        </div>
                    </div>
                </div>
            `;
}

let renderForm = () =>
{
    let htmlContent = `
                        <div class="w3-container w3-card w3-padding w3-center w3-half w3-orange" style="margin-left: 25%;margin-top: 50px;">
                                <h1 class="w3-pink">Create Person</h1>
                                <input class="w3-input" type="text" id="inName" placeholder="Insert name" />
                                <input class="w3-input" type="text" id="inSurname" placeholder="Insert surname" />
                                <input class="w3-input" type="text" id="inJob" placeholder="Insert job" />
                                <input class="w3-input" type="date" id="inDob" placeholder="Insert dob" />
                                <input class="w3-button w3-pink w3-margin" type="button" value="Insert" onclick="insertPerson()" />
                        </div>
                      `;
    fillPage(htmlContent);
    clearSearch();
}