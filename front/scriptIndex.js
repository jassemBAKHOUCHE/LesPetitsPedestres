var content_hbody = document.querySelector("#humain_content img")
content_hbody.id = "hearth_c"
var content_ocean = document.querySelector("#ocean_content img")
content_ocean.id = "Gulf_stream"


var killTools = document.getElementById("killTools")
var healTools = document.getElementById("healTools")


function changeSelect(e) {
    if (e.target.tagName == "P") {
        if (e.target.id == "obs") {
            killTools.id = "killTools"
            healTools.id = "healTools"
        }
        else if (e.target.id == "killTools_cont") {
            killTools.id = "killTools_show"
            healTools.id = "healTools"
        }
        else {
            killTools.id = "killTools"
            healTools.id = "healTools_show"
        }
    }
}

document.getElementById("obs").addEventListener("click", changeSelect)
document.getElementById("healTools_cont").addEventListener("click", changeSelect)
document.getElementById("killTools_cont").addEventListener("click", changeSelect)

function display_content_h(id) {

}

function display_content_o(id) {

}

function changeOrgan(e) {
    if (e.target.tagName == "IMG") {
        console.log(e.target.getAttribute("data_src"))
        //content_hbody.src != e.target.src && !(content_ocean.src == e.target.data_src)
        if (content_hbody.src != e.target.src) {
            content_hbody.alt = e.target.alt
            content_hbody.src = e.target.src
            content_ocean.alt = e.target.getAttribute("data_alt")
            content_ocean.src = e.target.getAttribute("data_src")
            display_content_h(content_hbody.id)
            display_content_o(content_ocean.id)
        }
        // else if (content_ocean.data_src != e.target.src && !(content_hbody.src == e.target.src)) {
        //     console.log("1")
        //     content_hbody.alt = e.target.data_alt
        //     content_hbody.src = e.target.data_src
        //     content_ocean.alt = e.target.alt
        //     content_ocean.src = e.target.src
        //     display_content_h(content_hbody.alt)
        //     display_content_o(content_ocean.alt)
        // }
    }
}

// HUMAIN
var coeur = document.getElementById("heart")
coeur.addEventListener("click", changeOrgan)
console.log(coeur.getAttribute("data_src"))

var poumon = document.getElementById("poumons")
poumon.addEventListener("click", changeOrgan)

var estomac = document.getElementById("estomac")
estomac.addEventListener("click", changeOrgan)

var cerveau = document.getElementById("cerveau")
cerveau.addEventListener("click", changeOrgan)

var rein = document.getElementById("rein")
rein.addEventListener("click", changeOrgan)

var foi = document.getElementById("foie")
foi.addEventListener("click", changeOrgan)


// OCEAN
var GCM = document.getElementById("gcm")
//GCM.addEventListener("click", changeOrgan)

var phytoplancton = document.getElementById("plankton")
//phytoplancton.addEventListener("click", changeOrgan)

var surexploitation = document.getElementById("surexploitation")
//surexploitation.addEventListener("click", changeOrgan)

var silence = document.getElementById("silence")
//silence.addEventListener("click", changeOrgan)

var icebergs = document.getElementById("icebergs")
//icebergs.addEventListener("click", changeOrgan)

var corrail = document.getElementById("corrail")
//corrail.addEventListener("click", changeOrgan)
