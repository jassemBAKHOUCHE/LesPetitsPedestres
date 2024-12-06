var content
fetch('dataOcean.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse la réponse JSON
  })
  .then(data => {
    content = data
    display_content_h()
    display_content_o()
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });


var content_hbody = document.querySelector("#humain_content img")
content_hbody.id = "hearth_c"
var content_ocean = document.querySelector("#ocean_content img")
content_ocean.id = "Gulf_stream"
var selected_h = document.getElementById("cerveau")
var selected_o = document.getElementById("silence")

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

// document.getElementById("obs").addEventListener("click", changeSelect)
// document.getElementById("healTools_cont").addEventListener("click", changeSelect)
// document.getElementById("killTools_cont").addEventListener("click", changeSelect)

function display_content_h() {
    var reponse = content[content_hbody.getAttribute("data_1")]
    var dest = document.getElementById("humain_text")
    dest.innerHTML = "<h2>"+ reponse["titre"] +"</h2>" + reponse["contenu"]
}

function display_content_o() {
    var reponse = content[content_ocean.getAttribute("data_1")]
    var dest = document.getElementById("ocean_text")
    dest.innerHTML = "<h2>"+ reponse["titre"] +"</h2>" + reponse["contenu"]
}

function changeOrgan(e) {
    if (e.target.tagName == "IMG") {

        if (e.target.getAttribute("data_i")=="1") {
            selected_h.className = ""
            selected_o.className = ""
            
            selected_h = e.target
            selected_o = document.getElementById(e.target.getAttribute("data_id"))
            e.target.className = "selected"
            
            document.getElementById(e.target.getAttribute("data_id")).className = "selected"
            e.target.className = "selected"
            
            document.getElementById(e.target.getAttribute("data_id")).className = "selected"
            content_hbody.alt = e.target.alt
            content_hbody.src = e.target.src
            content_hbody.setAttribute("data_1", e.target.id)
            content_ocean.alt = e.target.getAttribute("data_alt")
            content_ocean.src = e.target.getAttribute("data_src")
            content_ocean.setAttribute("data_1", e.target.getAttribute("data_id"))
            display_content_h(e.target.id)
            display_content_o(e.target.getAttribute("data_id"))
        }
        else if (content_ocean.getAttribute("data_src") != e.target.src && !(content_hbody.src == e.target.src)) {
            selected_h.className = ""
            selected_o.className = ""
            selected_h = e.target
            selected_o = document.getElementById(e.target.getAttribute("data_id"))
            e.target.className = "selected"
            document.getElementById(e.target.getAttribute("data_id")).className = "selected"
            e.target.className = "selected"
            content_hbody.alt = e.target.getAttribute("data_alt")
            content_hbody.src = e.target.getAttribute("data_src")
            content_hbody.setAttribute("data_1", e.target.getAttribute("data_id"))

            content_ocean.alt = e.target.alt
            content_ocean.src = e.target.src
            content_ocean.setAttribute("data_1", e.target.id)
            display_content_h(e.target.id)
            display_content_o(e.target.getAttribute("data_id"))
        }
    }
}

// HUMAIN
var coeur = document.getElementById("heart")
coeur.addEventListener("click", changeOrgan)

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
GCM.addEventListener("click", changeOrgan)

var phytoplancton = document.getElementById("phytoplancton")
phytoplancton.addEventListener("click", changeOrgan)

var surexploitation = document.getElementById("surexploitation")
surexploitation.addEventListener("click", changeOrgan)

var silence = document.getElementById("silence")
silence.addEventListener("click", changeOrgan)

var icebergs = document.getElementById("icebergs")
icebergs.addEventListener("click", changeOrgan)

var corrail = document.getElementById("corrail")
corrail.addEventListener("click", changeOrgan)
