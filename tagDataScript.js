const e = React.createElement;
let file = './data.json';
let req = new XMLHttpRequest();

let itemId = findGetParameter("Id");

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function getComponents(){
  let objs = null;
  req.open('GET', file, false);
  req.send(null);
  objs = JSON.parse(req.responseText);
  return objs;
}

function  showDataPageTypes(data){
  let retVal = new Array();
  for (var key in data["pageType"]) {
    retVal.push(e('li',{}, key+": " + data["pageType"][key]));
  }
  return retVal;
}

function  showData(data){
  let total =data['volume'];
  let positive = data['sentiment']['positive'];
  let negative = data['sentiment']['negative'];
  let neutral = data['sentiment']['neutral'];
  if(total == undefined){
    total = 0;
  }
  if(positive == undefined){
    positive = 0;
  }
  if(negative == undefined){
    negative = 0;
  }
  if(neutral == undefined){
    neutral = 0;
  }
  console.log (data['volume']);
    return e('div', {},
    e('p', {}, 'Tag: "'+data['label']+'"'),
    e('p', {}, 'Total Mentions: '+total+''),
    e('p', {}, 'Positive Mentions: '+positive+''),
    e('p', {}, 'Neutral Mentions: '+neutral+''),
    e('p', {}, 'Negative Mentions: '+negative+''),
      e('p', {}, 'Page Types: '),
      e('ul',{},
      showDataPageTypes(data)
    )
    );
  }

class TagsJsonRenderer extends React.Component
{
  render(){
    let objs = getComponents();
    let retVal = new Array(objs.length);
    objs.forEach(function(element) {
      if(element["id"] === itemId)
        retVal.push(showData(element));
    });
    console.log(retVal);
    return retVal;
    }
}

ReactDOM.render(<TagsJsonRenderer/>, document.getElementById('dataParagraph'));
