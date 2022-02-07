const getData = async () => {
    let response;
    try{
        response = await axios.get('https://swapi.dev/api/people/2')
        const species = await axios.get(response.data.species)
        const people = await axios.get(species.data.people[1])
        const films = await axios.get(people.data.films[0])
        buildData(species, people, films)     
    }
    catch(error){
        console.log(error)
    }
}

getData()

const buildData = (species, people, films) => {
    const buildSpecies = document.createElement('h3')
    buildSpecies.textContent = `Species: ${species.data.name}`
    document.body.appendChild(buildSpecies)

    const buildPeople = document.createElement('h3')
    buildPeople.textContent = `Best Friend: ${people.data.name}`
    document.body.appendChild(buildPeople)

    const buildFilm = document.createElement('h3')
    buildFilm.textContent = `First Movie R2-D2 appeared in: ${films.data.title}`
    document.body.appendChild(buildFilm)
}