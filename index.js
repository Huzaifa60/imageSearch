const accesskey = "JZhO-LX9DIqSKk9glxS2YKrwHdXMac-pMzVEAFOEwmE";
const form = document.querySelector("form");
const input = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more");


let inputData = "";
page = 1;

const searchImages = async () => {
   inputData = input.value;
   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

   const response = await fetch(url);
   const data = await response.json();
   const results = data.results;
   console.log(results);

   if (page === 1) {
      searchResults.innerHTML = "";
   }
   results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);

   });
   console.log(results);


   page++;

   if (page > 1) {
      showMore.style.display = "block";
   }

}

form.addEventListener("submit", (event) => {
   event.preventDefault();
   page = 1;
   searchImages();
});
showMore.addEventListener("click", () => {
   searchImages();
});
