let store = {
    rovers: new Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roverSelected: ''
}

// add our markup to the page
const root = document.getElementById('root')
//update changes
const updateStore = (newState,rover) => {
    if(store.roverSelected!=''){
        document.getElementById(`${store.roverSelected}`).className='nav-item';
    }
    store =Object.assign(store,newState);
    store.roverSelected=rover;
    document.getElementById(`${store.roverSelected}`).className+=' active';
    render(root, store)
    updateHead();
    //photoLink=store.images
    //photoURL=photoLink.photos.map(p=>p.img_src);
    roverTile(photoLink,dataUpdate)
    imageTiles(photoURL,imgUpdate)
    console.log("DATA LOADED")
}

const render = async (root, state) => {
    root.innerHTML = App(state)
    updateHead()
}

function photoLink(){
    return store.images;
} 
function photoURL(){
    return store.images.photos.map(p=>p.img_src);
}

//rover info(higher order function 1)
const roverTile=(photo,Update)=>{
    const link=photo();   
    return Update(link.photos[0].rover,link.photos[0].earth_date);
}
//displays rover selected data
function dataUpdate(data,eDate){
    const photoDate = eDate
    const { name, launch_date, landing_date, status } = data
    console.log(store)
    document.getElementById('Details').innerHTML=`
    <ul class="info-container">
            <li>NAME: ${name}</li>
            <li>LAUNCHING DATE: ${launch_date}</li>
            <li>LANDED ON: ${landing_date}</li>
            <li>CURRENT STATUS: ${status}</li>
            <li>CAPTURE DATE: ${photoDate}</li>
    </ul>
    `}

//image tile layout and data
const imageTiles=(url,update)=>{
    img=url()
    return update(img)
}

//displays selected rover images
function imgUpdate(img){
    document.getElementById('Pics').innerHTML=`
    ${img.map(x => `<img class="photo" src="${x}" alt="Photo taken on Mars by 
    ${store.selectedRover}"/>`).join('')}
    `
    }

    //dynamic Component Asks to select rover if not selected any else diplays the selected one
function updateHead(){
    if(store.roverSelected)
    document.getElementById('Head').innerHTML=`
    <h2>${store.roverSelected.toUpperCase()}</h2>`
    else
    document.getElementById('Head').innerHTML=`
    <h2>Select A Rover</h2>`

} 

// Page Layout
const App = (state) => {
    return `
        <header><h1>MARS DASHBOARD</h1></header>
        <div class="nav">
            <a id="curiosity" class="nav-item" href="#" onclick="roverData('curiosity')">Curiosity</a>
            <a id="opportunity" class="nav-item" href="#" onclick="roverData('opportunity')">Opportunity</a>
            <a id="spirit" class="nav-item" href="#"onclick="roverData('spirit')">Spirit</a>
        </div>
        <section>
            <div id="Head">
            </div>
            <div id="Details">
            </div>
            <div id="Pics">
            </div>
        </section>
        <footer>
        <p>Project 2 for Udacity ND</p>
        </footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})


const roverData = async function (rover){
    const res = await fetch(`http://localhost:3000/${rover}`)
    let data = await res.json();
    updateStore(data,rover);
    }
