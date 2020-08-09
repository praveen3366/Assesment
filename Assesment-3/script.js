var apiKey = `pqiWEDtWRSel2sbZpjoGfGA95tlGZ2aq`
var nytimes = () => {
    var ElementsinnerHtml = `<div class="container">
    <div class="row">
        <div class="col">
            <div class="list" id="list">
            </div>
            </div>
        </div>
    </div>`
    document.body.innerHTML = ElementsinnerHtml;
}
nytimes();
var timesData = () => {
    var innerHTML = '';

    var arr = ['Food','Sports','Arts','Movies','Science','Technology','World',];

    arr.forEach(element => {
        var innerAccordionHtml = ` <div class="card" style="height:100%">
        <div class="card-header" id="${element}">
            <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#${element}Collapse" aria-expanded="true" aria-controls="${element}Collapse" onclick="getNewsData('${element}');">
                ${element}
          </button>
            </h2>
        </div>
    
        <div id="${element}Collapse" class="collapse row show" aria-labelledby="${element}" data-parent="#list">
        
        </div>
        </div>
        `;

        innerHTML += innerAccordionHtml;
    })

    document.getElementById('list').innerHTML = innerHTML;

}

timesData();


var getNewsData = async(sectionName) => {
    try {

        var url = `https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${apiKey}`;
        
        var response = await fetch(url);

        var data = await response.json();

        var Content = '';

        if (data.results.length > 0) {
            var cardInfo = data.results;
            console.log(cardInfo);

            for (var i = 0; i < cardInfo.length; i++) {
                var imgSrc = '';
                var newsUrl = cardInfo[i].short_url;

                if (newsUrl == "" || newsUrl == undefined || newsUrl == null || newsUrl.length == 0) {
                    newsUrl = cardInfo[i].url;
                }

                if (cardInfo[i].hasOwnProperty('multimedia') && cardInfo[i]['multimedia'] != null) {
                  
                    imgSrc = cardInfo[i].multimedia[1].url;
                }

                var CollapseData = `    <div class="col-8 offset-2 offset-lg-0 col-lg-6 mt-4">
                    <div class="card mb-3">
                    ${sectionName} - ${cardInfo[i].item_type}
                        <div class="row no-gutters">
                            
                            <div class="col-md-4 order-md-1">
                                <img src="${imgSrc}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${cardInfo[i].title}</h5>
                                    <p class="card-text"><small class="text-muted">${new Date(cardInfo[i].created_date).toDateString()}</small></p>
                                    <p class="card-text">${cardInfo[i].abstract}</p> 
                                    <a href="${newsUrl}" class="card-link"> Read More Info</a>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>`;
                Content += CollapseData;

            }

            document.getElementById(`${sectionName}Collapse`).innerHTML = Content;

        }

    } catch (error) {
        var errorElement = document.createElement('div');
        errorElement.className = `alert alert-warning alert-dismissible fade show`;
        errorElement.Role = `alert`;
        errorElement.tabIndex = 10;
        errorElement.innerHTML = `<strong>Error!</strong> ${error}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>`
        document.getElementById(`${sectionName}Collapse`).appendChild(errorElement);
    }
}
var timeData = async(sectionName = '') => {
    try {

        var url = `https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${apiKey}`;

        var response = await fetch(url);

        var data = await response.json();
        var accordionCollapseContent = '';

        if (data.results.length > 0) {
            var cardInfo = data.results;
            console.log(cardInfo);
            for (var i = 0; i < cardInfo.length; i++) {
                var imgSrc = '';
                var newsUrl = cardInfo[i].short_url;

                if (newsUrl == "" || newsUrl == undefined || newsUrl == null || newsUrl.length == 0) {
                    newsUrl = cardInfo[i].url;
                }

                if (cardInfo[i].hasOwnProperty('multimedia') && cardInfo[i]['multimedia'] != null) {
                 
                    imgSrc = cardInfo[i].multimedia[1].url;
                }
                var currentCollapseData = `    <div class="col-8 offset-2 offset-lg-0 col-lg-6 mt-4">
                    <div class="card mb-3">
                    ${sectionName} - ${cardInfo[i].item_type}
                        <div class="row no-gutters">
                            
                            <div class="col-md-4 order-md-1">
                                <img src="${imgSrc}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${cardInfo[i].title}</h5>
                                    <p class="card-text"><small class="text-muted">${new Date(cardInfo[i].created_date).toDateString()}</small></p>
                                    <p class="card-text">${cardInfo[i].abstract}</p>
                                    
                                    <a href="${newsUrl}" class="card-link">Continue Reading</a>
                                </div>
    
                                <div class="card-footer">
                                    ${cardInfo[i].byline}
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>`;
                accordionCollapseContent += currentCollapseData;
            }
            document.getElementById(`${sectionName}Collapse`).innerHTML = accordionCollapseContent;
        }
    } catch (error) {
        var errorElement = document.createElement('div');
        errorElement.className = `alert alert-warning alert-dismissible fade show`;
        errorElement.Role = `alert`;
        errorElement.tabIndex = 10;
        errorElement.innerHTML = `<strong>Error!</strong> ${error}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>`
        document.getElementById(`${sectionName}Collapse`).appendChild(errorElement);
    }
}
timeData();