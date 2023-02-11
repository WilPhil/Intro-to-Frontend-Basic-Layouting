const API_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_BY_NAME = "search.php?";

class Search {
    constructor(form) {
        this.form = form;
        this.results = document.querySelector(".search-results");
    }

    initialize() {
        console.log(this.form);
        this.search();
    }

    search() {
        const searchField = this.form.querySelector("input[type=text]");
        if (searchField) {
            this.form.addEventListener("submit", (event) => {
                event.preventDefault();
                fetch(`${API_URL}${SEARCH_BY_NAME}` + 
                    new URLSearchParams({
                        s: searchField.value.replace(/\s+/g, ""),
                    }),
                    {
                        method: "GET",
                    }
                )
                .then((response) => {
                    response.json().then((data) => {
                        if (data.meals) {
                            this.displaySearchResults(data.meals);
                        } else {
                            this.results.innerHTML = "No results";
                        }
                    });
                })
                .catch((error) => {
                    console.log("error", error);
                });
            });
        }
    }

    displaySearchResults(meals) {
        this.results.innerHTML = "";
        meals.forEach((meal) => {
            const mealElement = document.createElement("div");
            mealElement.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            `;
            this.results.appendChild(mealElement);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const search = new Search(form);

    search.initialize();
});
