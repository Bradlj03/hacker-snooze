const body = $("body");
const content = $("#content");


const hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/";
const hackerNewTopStories =
	"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";



async function httpRequest(url) {
	const httpResponse = await fetch(url);
	const data = await httpResponse.json();

	return data;
}

async function gethackerNewTopStoriesData() {
	const data = await httpRequest(hackerNewTopStories);
	console.log("start");

	for (let i = 0; i < 100; i++) {
		const dataItem = data[i];
		const idURL = `${hackerNewsUrl}/item/${data[i]}.json?print=pretty`;
		const idData = await httpRequest(idURL);

		const newDiv = $(`
        <div id="${dataItem}" class="topStories">
            <a href="${idData.url}">
                ${idData.title}
            </a>
            <div id="idInfo"> 
            	<div> Score: ${idData.score}  | </div>
        		<div> Comments: ${idData.descendants} | </div>
				<div> Author: ${idData.by} </div>  
            </div>
			<button id="displayCommentsBtn" type="button" class="btn btn-secondary">Display Comments</button>
        </div>`);

		content.append(newDiv);
	}
	console.log("finished");
}

gethackerNewTopStoriesData();
