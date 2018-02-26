/*  Auteur: Samuel Dubé
    Date de création: 2018/01/03
    Date de dernière: ******
    Description: Fichier javascript/jquery principal pour l'interface
*/

Main();

function Main() {
    CategoryTheme();
}

function CategoryTheme() {
    var articleCat = document.querySelectorAll(".article-cat");
    var articleContainer = document.querySelectorAll(".article-container");
    for (var i = 0; i < articleCat.length; i++) {
        if (articleCat[i].textContent.trim() == "Guide") {
            articleCat[i].classList.add("orange");
            articleContainer[i].style.border = "2px solid #f26201";
        }
        else if (articleCat[i].textContent.trim() == "Recipe") {
            articleCat[i].classList.add("blue");
            articleContainer[i].style.border = "2px solid #1578c2";
        }
        else if (articleCat[i].textContent.trim() == "Kitchen equipement") {
            articleCat[i].classList.add("green");
            articleContainer[i].style.border = "2px solid #15ab39";
        }
    }
}
