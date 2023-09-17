
let globData

const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();

  const categoryContainer = document.getElementById("category-container");
  const categories = data.data;
  

  categories.forEach((category) => {
  

    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="handleLoadNews('${category.category_id}')" id="all-data" class="btn btn-active btn-ghost focus:bg-red-600 focus:text-white ">${category.category}</button>
        `;
       
    categoryContainer.appendChild(div);


     div.addEventListener('click',function(){
      
      const data2 = category.category_id
      globData = data2 
     
    })
   
  });


};


const handleLoadNews = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
 
 
  
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  data.data.forEach((element) => {
    
    const div = document.createElement("div");
    const seconds = element.others.posted_date;
    const hours = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);

    div.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
            <figure><img src="${
              element.thumbnail
            }" alt="thumbnail" class="h-48 w-full relative"/></figure>
            <div class="bg-slate-900 rounded-lg text-white absolute bottom-1/2 left-40 px-2">${
              element.others?.posted_date ? `${hours}hrs ${min} min ago` : ""
            }</div>
            <div class="card-body h-44">
                <div class="flex">
                    <div class="avatar">
                        <div class="w-14 h-14 rounded-full mr-3">
                            <img src="${element.authors[0].profile_picture}"/>
                        </div>
                    </div>
                    <div>
                    <h2 class="card-title">${element.title}</h2>
                    <div class="flex my-1">
                    <p>${element.authors[0].profile_name}</p>
                    <p>${
                      element.authors[0].verified
                        ? `<img src="image/png.png"/>`
                        : ""
                    } </p>
                    </div>
                    <div class="">
                    <p>${element.others.views}</p>
                  </div>
                    </div>
                </div>
                
          </div>
       </div>     
        `;

    cardContainer.appendChild(div);
  });
  const missingData = document.getElementById("missing-data");
  if (data.data.length === 0) {
    missingData.classList.remove("hidden");
  } else {
    missingData.classList.add("hidden");
  }
};


// data sort function

const handleShort = async (categoryData) => {
  
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryData}`
  );
  const data = await response.json();
 
  
  data.data.sort((data1, data2) => {
    data1 = parseFloat(data1.others.views);
    data2 = parseFloat(data2.others.views);
    if (data1 < data2) {
      return 1;
    }
    if (data1 > data2) {
      return -1;
    }
    return 0;
  });


  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  data.data.forEach((element) => {
    const div = document.createElement("div");

    const seconds = element.others.posted_date;
    const hours = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);

    div.innerHTML = `
          <div class="card w-full bg-base-100 shadow-xl">
              <figure><img src="${
                element.thumbnail
              }" alt="thumbnail" class="h-48 w-full relative"/></figure>
              <div class="bg-slate-900 rounded-lg text-white absolute bottom-1/2 left-40 px-2">${
                element.others?.posted_date ? `${hours}hrs ${min} min ago` : ""
              }</div>
              <div class="card-body h-44">
                  <div class="flex">
                      <div class="avatar">
                          <div class="w-14 h-14 rounded-full mr-3">
                              <img src="${element.authors[0].profile_picture}"/>
                          </div>
                      </div>
                      <div>
                      <h2 class="card-title">${element.title}</h2>
                      <div class="flex my-1">
                      <p>${element.authors[0].profile_name}</p>
                      <p>${
                        element.authors[0].verified
                          ? `<img src="image/png.png"/>`
                          : ""
                      } </p>
                      </div>
                      <div class="">
                      <p>${element.others.views}</p>
                    </div>
                      </div>
                  </div>
                  
            </div>
         </div>     
          `;

    cardContainer.appendChild(div);
  });

  const missingData = document.getElementById("missing-data");
  if (data.data.length === 0) {
    missingData.classList.remove("hidden");
  } else {
    missingData.classList.add("hidden");
  }

  
};

handleCategory()
handleLoadNews("1000");

