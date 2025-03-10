const $results = document.querySelector(".results");
const $searchInput = document.querySelector(".search-input");
const $filter = document.querySelector(".select-input");
const $options = document.querySelectorAll(".option");

let countries;

function createCountryCard(countries) {
  countries.forEach((country) => {
    const $newCountryCard = document.createElement("div");
    $newCountryCard.classList.add("country-card");
    $newCountryCard.setAttribute("data-region", country.region);

    const $newCountryFlag = document.createElement("img");
    $newCountryFlag.classList.add("country-flag");
    $newCountryFlag.setAttribute("src", country.flags.svg);
    $newCountryFlag.setAttribute("alt", country.name.common + " Flag");

    const $newCountryDetail = document.createElement("div");
    $newCountryDetail.classList.add("country-details");

    const $newCountryName = document.createElement("h2");
    $newCountryName.textContent = country.name.common;

    const $newCountryDetailList = document.createElement("ul");

    const $newCountryPopulation = document.createElement("li");

    const $newCountryPopulationFirst = document.createElement("span");
    $newCountryPopulationFirst.textContent = "Population: ";

    const $newCountryPopulationLast = document.createTextNode(
      country.population.toLocaleString()
    );

    const $newCountryRegion = document.createElement("li");

    const $newCountryRegionFirst = document.createElement("span");
    $newCountryRegionFirst.textContent = "Region: ";

    const $newCountryRegionLast = document.createTextNode(country.region);

    const $newCountryCapital = document.createElement("li");

    const $newCountryCapitalFirst = document.createElement("span");
    $newCountryCapitalFirst.textContent = "Capital: ";

    const $newCountryCapitalLast = document.createTextNode(country.capital);

    $newCountryCard.appendChild($newCountryFlag);
    $newCountryCard.appendChild($newCountryDetail);
    $newCountryDetail.appendChild($newCountryName);
    $newCountryDetail.appendChild($newCountryDetailList);
    $newCountryDetailList.appendChild($newCountryPopulation);
    $newCountryPopulation.appendChild($newCountryPopulationFirst);
    $newCountryPopulation.appendChild($newCountryPopulationLast);
    $newCountryDetailList.appendChild($newCountryRegion);
    $newCountryRegion.appendChild($newCountryRegionFirst);
    $newCountryRegion.appendChild($newCountryRegionLast);
    $newCountryDetailList.appendChild($newCountryCapital);
    $newCountryCapital.appendChild($newCountryCapitalFirst);
    $newCountryCapital.appendChild($newCountryCapitalLast);
    $results.appendChild($newCountryCard);
  });
}

function searchCountry(countries) {

}

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    countries = data;

    createCountryCard(countries);
    // Filter
    $filter.addEventListener("change", () => {
      if ($filter.value === $options[0].value) {
        document.querySelectorAll(".country-card").forEach((e) => {
          e.classList.remove("hidden");
        });
      } else {
        document.querySelectorAll(".country-card").forEach((e) => {
          e.classList.remove("hidden");
          if (e.getAttribute("data-region") !== $filter.value) {
            e.classList.add("hidden");
          }
        });
      }
    });

    $searchInput.addEventListener("input", () => {
        searchCountry(countries)
    });
  })
  .catch((err) => console.log("Une erreure est survenue", err));
