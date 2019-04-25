const e = React.createElement;
let file = './data.json';
let req = new XMLHttpRequest();

function getComponents(){
  let objs = null;
  req.open('GET', file, false);
  req.send(null);
  objs = JSON.parse(req.responseText);
  return objs;
}

function  makeLink(data){
  let fontStyle =  {
    fontSize: parseInt(data["volume"]) %40 +10,
    opacity:  parseFloat(parseInt(data["volume"]) %40 +10)/100. + 0.3
  };
    return e('a', {href: "tagData.html?Id="+data["id"], className: "tag", style: fontStyle},data['label']);
  }

class TagsJsonRenderer extends React.Component
{
  render(){
    let objs = getComponents();
    let retVal = new Array(objs.length);
    objs.forEach(function(element) {
      retVal.push(makeLink(element));
    });
    console.log(retVal);
    return retVal;
    }
}



ReactDOM.render(<TagsJsonRenderer/>, document.getElementById('cloudTagParagraph'));
